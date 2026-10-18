from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Venta, Detalle_Venta, Usuario, Rol


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
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = Usuario
        fields = ["id", "nombre", "apellido", "mail", "password", "rol"]

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return Usuario.objects.create(**validated_data)


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ["id", "nombre"]