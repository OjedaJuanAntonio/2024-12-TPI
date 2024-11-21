from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SponsorViewSet

# Crear el enrutador y registrar el ViewSet
router = DefaultRouter()
router.register(r'sponsors', SponsorViewSet, basename='sponsor')

# URL patterns
urlpatterns = [
    path('', include(router.urls)),
]
