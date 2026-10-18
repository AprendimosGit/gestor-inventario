from django.urls import path, include
from .views import VentaListCreateAPIView, VentaDetailAPIView, UsuarioListCreateAPIView, UsuarioDetailAPIView

urlpatterns = [
    path("ventas/", VentaListCreateAPIView.as_view(), name="ventas-list-create"),
    path("ventas/<int:pk>/", VentaDetailAPIView.as_view(), name="ventas-detail"),
    path("api/v1/", include("ventas.urls")),
    path("usuarios/", UsuarioListCreateAPIView.as_view(), name="usuarios-list-create"),
    path("usuarios/<int:pk>/", UsuarioDetailAPIView.as_view(), name="usuarios-detail"),
]
