from django.urls import path
from .views import (
    ProveedorListView,
    ProveedorDetailView,
    MovimientoStockListView,
    MovimientoStockDetailView,
)

urlpatterns = [
    path('proveedores/', ProveedorListView.as_view(), name='proveedores-list'),
    path('proveedores/<int:pk>/', ProveedorDetailView.as_view(), name='proveedores-detail'),
    path('movimientos-stock/', MovimientoStockListView.as_view(), name='movimientos-list'),
    path('movimientos-stock/<int:pk>/', MovimientoStockDetailView.as_view(), name='movimientos-detail'),
]