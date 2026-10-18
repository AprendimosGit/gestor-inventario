from rest_framework import generics
from .models import Venta, Usuario
from .serializers import VentaSerializer, UsuarioSerializer


class VentaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Venta.objects.all().order_by("-fecha")
    serializer_class = VentaSerializer


class VentaDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
    
class UsuarioListCreateAPIView(generics.ListCreateAPIView):
    queryset = Usuario.objects.select_related("rol").all()
    serializer_class = UsuarioSerializer


class UsuarioDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.select_related("rol").all()
    serializer_class = UsuarioSerializer