from django.urls import path
from .views import ProductoListView, IngredienteListView, ProductoIngredienteListView
from .views import ProductoDetailView, IngredienteDetailView


urlpatterns = [
    path('productos/', ProductoListView.as_view(), name='productos-lista'),
    path('ingredientes/', IngredienteListView.as_view(), name='ingredientes-lista'),
    path('producto-ingredientes/', ProductoIngredienteListView.as_view(), name='producto-ingredientes-lista'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='productos-detalle'),
    path('ingredientes/<int:pk>/', IngredienteDetailView.as_view(), name='ingredientes-detalle'),
]