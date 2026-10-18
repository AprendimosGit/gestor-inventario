from rest_framework import generics
from .models import Venta
from .serializers import VentaSerializer


class VentaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Venta.objects.all().order_by("-fecha")
    serializer_class = VentaSerializer


class VentaDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
