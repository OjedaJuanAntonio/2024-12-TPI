from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VotoViewSet

router = DefaultRouter()
router.register(r'votos', VotoViewSet, basename='votos')

urlpatterns = [
    path('', include(router.urls)),
    path('top3/', VotoViewSet.as_view({'get': 'top_3'}), name='votos-top3'),
]
