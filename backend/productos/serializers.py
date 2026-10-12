from rest_framework import serializers
from .models import Producto, Ingrediente, ProductoIngrediente


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio']

class IngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingrediente
        fields = ['id', 'nombre', 'unidad_medida', 'stock_actual', 'stock_minimo']

class ProductoIngredienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoIngrediente
        fields = ['id', 'producto', 'ingrediente', 'cantidad_necesaria']        