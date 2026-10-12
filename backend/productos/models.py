from django.db import models
from django.core.validators import MinValueValidator


class Producto(models.Model):
    nombre = models.CharField(max_length= 100, unique=True)
    precio = models.DecimalField(max_digits= 10, decimal_places= 2, validators=[MinValueValidator(0.01)])

    def __str__(self):
        return self.nombre

class Ingrediente(models.Model):
    UNIDADES = [
        ('kg', 'Kilogramos'),
        ('g', 'Gramos'),
        ('l', 'Litros'),
        ('ml', 'Mililitros'),
        ('unidad', 'Unidades'),
    ]

    nombre = models.CharField(max_length=50, unique=True)
    stock_actual = models.DecimalField(max_digits=10, decimal_places=3, validators=[MinValueValidator(0)])
    stock_minimo = models.DecimalField(max_digits=10, decimal_places=3, validators=[MinValueValidator(0)])
    unidad_medida = models.CharField(max_length=10, choices=UNIDADES)

    def __str__(self):
        return self.nombre

class ProductoIngrediente(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    ingrediente = models.ForeignKey(Ingrediente, on_delete=models.CASCADE)
    cantidad_necesaria = models.DecimalField(max_digits=10, decimal_places=3, validators=[MinValueValidator(0.001)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['producto', 'ingrediente'], name='receta_unica')
        ]

    def __str__(self):
        return f"{self.producto} - {self.ingrediente}"