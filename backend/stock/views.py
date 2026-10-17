from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Proveedor, MovimientoStock
from .serializers import ProveedorSerializer, MovimientoStockSerializer


class ProveedorListView(APIView):
    def get(self, request):
        proveedores = Proveedor.objects.all()
        serializer = ProveedorSerializer(proveedores, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProveedorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProveedorDetailView(APIView):
    def get_object(self, pk):
        try:
            return Proveedor.objects.get(pk=pk)
        except Proveedor.DoesNotExist:
            return None

    def get(self, request, pk):
        proveedor = self.get_object(pk)
        if not proveedor:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProveedorSerializer(proveedor)
        return Response(serializer.data)

    def put(self, request, pk):
        proveedor = self.get_object(pk)
        if not proveedor:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProveedorSerializer(proveedor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        proveedor = self.get_object(pk)
        if not proveedor:
            return Response(status=status.HTTP_404_NOT_FOUND)
        proveedor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MovimientoStockListView(APIView):
    def get(self, request):
        movimientos = MovimientoStock.objects.all()
        serializer = MovimientoStockSerializer(movimientos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MovimientoStockSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MovimientoStockDetailView(APIView):
    def get_object(self, pk):
        try:
            return MovimientoStock.objects.get(pk=pk)
        except MovimientoStock.DoesNotExist:
            return None

    def get(self, request, pk):
        movimiento = self.get_object(pk)
        if not movimiento:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = MovimientoStockSerializer(movimiento)
        return Response(serializer.data)

    def delete(self, request, pk):
        movimiento = self.get_object(pk)
        if not movimiento:
            return Response(status=status.HTTP_404_NOT_FOUND)
        movimiento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)