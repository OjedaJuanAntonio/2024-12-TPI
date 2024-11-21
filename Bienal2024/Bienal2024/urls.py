from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from gestionEscultores.views import EscultorViewSet
from gestionEventos.views import EventoViewSet
from gestionEsculturas.views import EsculturaViewSet
from gestionVotos.views import VotoViewSet
from gestionSponsors.views import SponsorViewSet
from gestionUsuarios.views import UsuarioViewSet


# Creando el enrutador para la gestión de votos
router_voto = DefaultRouter()
router_voto.register(r'votos', VotoViewSet, basename="voto")

# Creando el enrutador para la gestión de esculturas
router_esculturas = DefaultRouter()
router_esculturas.register(r'esculturas', EsculturaViewSet, basename='escultura')

# Creando el enrutador para la gestión de escultores
router_escultores = DefaultRouter()
router_escultores.register(r'escultores', EscultorViewSet, basename='escultor')

# Creando el enrutador para la gestión de eventos
router_eventos = DefaultRouter()
router_eventos.register(r'eventos', EventoViewSet, basename='escultor')


router_sponsors = DefaultRouter()
router_sponsors.register(r'sponsors', SponsorViewSet, basename='spon')


router_usuarios = DefaultRouter()
router_usuarios.register(r'usuarios', UsuarioViewSet, basename='usuario')




# Definir las URLs del proyecto
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('social_django.urls')),  # Social Django para autenticación social
    path('user/', include('gestionUsuarios.urls')),  # URLs de la gestión de usuarios
    path('evento/', include('gestionEventos.Urls')),  # URLs de eventos

    # Integración con DRF usando routers
    *router_escultores.urls,  # Rutas para escultores
    *router_esculturas.urls,  # Rutas para esculturas
    *router_eventos.urls,     # Rutas para eventos
    *router_voto.urls,        # Rutas para votos
    *router_sponsors.urls,
    *router_usuarios.urls,
]
