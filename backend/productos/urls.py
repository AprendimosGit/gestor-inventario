from django.urls import path
from .views import ProductoListView, IngredienteListView, ProductoIngredienteListView


urlpatterns = [
    path('productos/', ProductoListView.as_view(), name='productos-lista'),
    path('ingredientes/', IngredienteListView.as_view(), name='ingredientes-lista'),
    path('producto-ingredientes/', ProductoIngredienteListView.as_view(), name='producto-ingredientes-lista'),
]