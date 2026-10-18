from rest_framework import serializers
from .models import Venta, Detalle_Venta, Usuario

class DetalleVentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detalle_Venta
        fields = "__all__"

class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True, read_only=True)

    class Meta:
        model = Venta
        fields = "__all__"

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre", "apellido", "mail", "rol"]