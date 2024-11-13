from django.contrib import admin
from django.urls import path, include

from django.contrib import admin

from gestionEscultores.views import EsculturaViewSet, EscultorViewSet
from gestionEventos.views import EventoViewSet
from rest_framework.routers import DefaultRouter

from gestionVotos.views import votacion

router_esculturas = DefaultRouter()
router_esculturas.register(r'esculturas', EsculturaViewSet)

router_escultores = DefaultRouter()
router_escultores.register(r'escultores', EscultorViewSet)

router_eventos = DefaultRouter()
router_eventos.register(r'eventos', EventoViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('social_django.urls')),
    path('user/', include('gestionUsuarios.urls')),
    path('voto/', votacion, name='votar' ),
    path('evento/',include('gestionEventos.Urls')),
    *router_escultores.urls,
    *router_esculturas.urls,
    *router_eventos.urls
]