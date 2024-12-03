from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from gestionEscultores.views import EscultorViewSet
from gestionEventos.views import EventoViewSet
from gestionEsculturas.views import EsculturaViewSet
from gestionVotos.views import VotoViewSet
from gestionSponsors.views import SponsorViewSet
from gestionUsuarios.views import UsuarioViewSet


router_voto = DefaultRouter()
router_voto.register(r'votos', VotoViewSet, basename="voto")

router_esculturas = DefaultRouter()
router_esculturas.register(r'esculturas', EsculturaViewSet, basename='escultura')

router_escultores = DefaultRouter()
router_escultores.register(r'escultores', EscultorViewSet, basename='escultor')

router_eventos = DefaultRouter()
router_eventos.register(r'eventos', EventoViewSet, basename='escultor')


router_sponsors = DefaultRouter()
router_sponsors.register(r'sponsors', SponsorViewSet, basename='spon')


router_usuarios = DefaultRouter()
router_usuarios.register(r'usuarios', UsuarioViewSet, basename='usuario')




# Definir las URLs del proyecto
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('social_django.urls')),  
    path('user/', include('gestionUsuarios.urls')), 
    path('evento/', include('gestionEventos.Urls')), 
    path('votos/', include('gestionVotos.urls')),
    # Integración con DRF usando routers
    *router_escultores.urls,  
    *router_esculturas.urls,  
    *router_eventos.urls,     
    *router_voto.urls,        
    *router_sponsors.urls,
    *router_usuarios.urls,
]
