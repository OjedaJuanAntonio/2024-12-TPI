from django.urls import path
from . import views

urlpatterns = [
    path('reg_evento/', views.registrar_evento, name='registrar_evento'),
    path('obt_evento/', views.obtener_evento, name='obt_evento')
]
