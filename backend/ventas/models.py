from django.db import models
from django.core.validators import MinValueValidator, MinLengthValidator
from productos.models import Producto


class Rol(models.Model):
    nombre = models.CharField(
        max_length=50,
        unique=True,
        validators=[MinLengthValidator(3)]
    )

    def __str__(self):
        return self.nombre


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    mail = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    rol = models.ForeignKey(
        Rol,
        on_delete=models.PROTECT,
        related_name="usuarios"
    )

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Venta(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.PROTECT,
        related_name="ventas"
    )
    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )

    def __str__(self):
        return f"Venta {self.id}"


class Detalle_Venta(models.Model):
    venta = models.ForeignKey(
        Venta,
        on_delete=models.CASCADE,
        related_name="detalles"
    )
    producto = models.ForeignKey(
        Producto,
        on_delete=models.PROTECT,
        related_name="detalles_venta"
    )
    cantidad = models.PositiveIntegerField(
        validators=[MinValueValidator(1)]
    )
    precio_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )

    def __str__(self):
        return f"Detalle de venta {self.venta_id}"
