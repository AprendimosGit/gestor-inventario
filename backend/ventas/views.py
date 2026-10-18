from django.contrib.auth.hashers import check_password
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Venta, Usuario, Rol
from .serializers import VentaSerializer, UsuarioSerializer, RolSerializer


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


class RolListCreateAPIView(generics.ListCreateAPIView):
    queryset = Rol.objects.all().order_by("nombre")
    serializer_class = RolSerializer


class LoginAPIView(APIView):
    def post(self, request):
        mail = request.data.get("mail")
        password = request.data.get("password")

        if not mail or not password:
            return Response(
                {"error": "El correo y la contraseña son obligatorios."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            usuario = Usuario.objects.select_related("rol").get(mail=mail)
        except Usuario.DoesNotExist:
            return Response(
                {"error": "Correo o contraseña incorrectos."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not check_password(password, usuario.password):
            return Response(
                {"error": "Correo o contraseña incorrectos."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response({
            "id": usuario.id,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "mail": usuario.mail,
            "rol": usuario.rol_id,
            "rol_nombre": usuario.rol.nombre,
        })