from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventoViewSet

# Crear un enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'eventos', EventoViewSet, basename='evento')

urlpatterns = [
    path('', include(router.urls)),  # Incluir las rutas generadas automáticamente por el router
]
