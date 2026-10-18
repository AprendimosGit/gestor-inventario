from django.urls import path, include
from .views import VentaListCreateAPIView, VentaDetailAPIView

urlpatterns = [
    path("ventas/", VentaListCreateAPIView.as_view(), name="ventas-list-create"),
    path("ventas/<int:pk>/", VentaDetailAPIView.as_view(), name="ventas-detail"),
    path("api/v1/", include("ventas.urls")),
]
