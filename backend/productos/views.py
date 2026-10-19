from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Producto, Ingrediente, ProductoIngrediente
from .serializers import ProductoSerializer, IngredienteSerializer, ProductoIngredienteSerializer



class ProductoListView(APIView):

    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IngredienteListView(APIView):

    def get(self, request):
        ingredientes = Ingrediente.objects.all()
        serializer = IngredienteSerializer(ingredientes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = IngredienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductoIngredienteListView(APIView):

    def get(self, request):
        productoingredientes = ProductoIngrediente.objects.all()
        serializer = ProductoIngredienteSerializer(productoingredientes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductoIngredienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductoDetailView(APIView):

    def get(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductoSerializer(producto)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
        except Producto.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class IngredienteDetailView(APIView):

    def get(self, request, pk):
        try:
            ingrediente = Ingrediente.objects.get(pk=pk)
        except Ingrediente.DoesNotExist:
            return Response({'error': 'Ingrediente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = IngredienteSerializer(ingrediente)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:
            ingrediente = Ingrediente.objects.get(pk=pk)
        except Ingrediente.DoesNotExist:
            return Response({'error': 'Ingrediente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = IngredienteSerializer(ingrediente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            ingrediente = Ingrediente.objects.get(pk=pk)
        except Ingrediente.DoesNotExist:
            return Response({'error': 'Ingrediente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        ingrediente.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)