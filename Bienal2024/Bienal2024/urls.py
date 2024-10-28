from django.contrib import admin
from django.urls import path, re_path, include

from django.contrib import admin
from .views import home, register_view

from gestionEscultores.views import EsculturaViewSet
from rest_framework.routers import DefaultRouter

from gestionVotos.views import votacion

router = DefaultRouter()
router.register(r'esculturas', EsculturaViewSet)


urlpatterns = [
    path('', home),
    path('home/', home),
    path('admin/', admin.site.urls),
    path('register_view/', register_view, name='profile'),
    path('', include('social_django.urls')),
    path('escultores/', include('gestionEscultores.urls')),
    path('user/', include('gestionUsuarios.urls')),
    path('voto/', votacion, name='votar' )
]