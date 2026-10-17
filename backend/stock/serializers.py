from django.db import transaction
from rest_framework import serializers

from productos.models import Ingrediente
from .models import Proveedor, MovimientoStock


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'


class MovimientoStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimientoStock
        fields = '__all__'

    def validate_cantidad(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                'La cantidad debe ser mayor que cero.'
            )
        return value

    @transaction.atomic
    def create(self, validated_data):
        ingrediente = Ingrediente.objects.select_for_update().get(
            pk=validated_data['ingrediente'].pk
        )

        tipo = validated_data['tipo']
        cantidad = validated_data['cantidad']

        if tipo == 'ingreso':
            ingrediente.stock_actual += cantidad

        elif tipo == 'egreso':
            if ingrediente.stock_actual < cantidad:
                raise serializers.ValidationError({
                    'cantidad': 'No hay stock suficiente para realizar el egreso.'
                })

            ingrediente.stock_actual -= cantidad

        ingrediente.save(update_fields=['stock_actual'])

        return MovimientoStock.objects.create(
            **validated_data
        )
