
from decimal import Decimal

from django.db import transaction
from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from .models import Venta, Detalle_Venta, Usuario, Rol
from productos.models import ProductoIngrediente
from stock.models import MovimientoStock


class DetalleVentaSerializer(serializers.ModelSerializer):
    venta = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Detalle_Venta
        fields = "__all__"


class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True)

    class Meta:
        model = Venta
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles")

        if not detalles_data:
            raise serializers.ValidationError({
                "detalles": "La venta debe incluir al menos un producto."
            })

        # Calcular los ingredientes necesarios para toda la venta.
        cantidades_necesarias = {}
        recetas_por_producto = {}

        for detalle in detalles_data:
            producto = detalle["producto"]
            cantidad_vendida = detalle["cantidad"]

            receta = list(
                ProductoIngrediente.objects.filter(
                    producto=producto
                ).select_related("ingrediente")
            )

            if not receta:
                raise serializers.ValidationError({
                    "detalles": (
                        f"El producto '{producto.nombre}' "
                        "no tiene ingredientes configurados."
                    )
                })

            recetas_por_producto.setdefault(producto.id, receta)

            for item in receta:
                ingrediente_id = item.ingrediente_id
                cantidad = item.cantidad_necesaria * cantidad_vendida

                cantidades_necesarias[ingrediente_id] = (
                    cantidades_necesarias.get(
                        ingrediente_id, Decimal("0")
                    ) + cantidad
                )

        # Bloquear los ingredientes para evitar descuentos simultáneos
        # que puedan dejar el stock en negativo.
        ingredientes = list(
            __import__("productos.models", fromlist=["Ingrediente"])
            .Ingrediente.objects
            .select_for_update()
            .filter(id__in=cantidades_necesarias.keys())
            .order_by("id")
        )

        ingredientes_por_id = {
            ingrediente.id: ingrediente
            for ingrediente in ingredientes
        }

        # Verificar TODO el stock antes de modificar nada.
        for ingrediente_id, cantidad_necesaria in (
            cantidades_necesarias.items()
        ):
            ingrediente = ingredientes_por_id[ingrediente_id]

            if ingrediente.stock_actual < cantidad_necesaria:
                raise serializers.ValidationError({
                    "stock": (
                        f"Stock insuficiente de {ingrediente.nombre}. "
                        f"Disponible: {ingrediente.stock_actual} "
                        f"{ingrediente.unidad_medida}; "
                        f"necesario: {cantidad_necesaria}."
                    )
                })

        # Crear la venta y sus detalles.
        venta = Venta.objects.create(**validated_data)

        for detalle in detalles_data:
            Detalle_Venta.objects.create(
                venta=venta,
                **detalle
            )

        # Descontar los ingredientes y registrar cada egreso.
        for ingrediente_id, cantidad_necesaria in (
            cantidades_necesarias.items()
        ):
            ingrediente = ingredientes_por_id[ingrediente_id]
            ingrediente.stock_actual -= cantidad_necesaria
            ingrediente.save(update_fields=["stock_actual"])

            MovimientoStock.objects.create(
                tipo="egreso",
                fecha=timezone.localdate(),
                cantidad=cantidad_necesaria,
                ingrediente=ingrediente,
                proveedor=None,
            )

        return venta


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Usuario
        fields = ["id", "nombre", "apellido", "mail", "password", "rol"]

    def create(self, validated_data):
        validated_data["password"] = make_password(
            validated_data["password"]
        )
        return Usuario.objects.create(**validated_data)


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ["id", "nombre"]
