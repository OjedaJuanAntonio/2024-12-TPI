from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EsculturaViewSet

router = DefaultRouter()
router.register(r'esculturas', EsculturaViewSet, basename='escultura')

urlpatterns = [
    path('', include(router.urls)),
]
