from django.db import models

# Create your models here.

from django.db import models
from productos.models import Ingrediente


class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre


class MovimientoStock(models.Model):
    TIPO_CHOICES = [
        ('ingreso', 'Ingreso'),
        ('egreso', 'Egreso'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    fecha = models.DateField()
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    ingrediente = models.ForeignKey(Ingrediente, on_delete=models.PROTECT)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return f"{self.tipo} - {self.ingrediente} - {self.fecha}"