# gestionEsculturas/urls.py
from django.urls import path
from . import views

urlpatterns = [

    path('reg_escultor/', views.registrar_escultor, name='registrar_escultor'),
    path('obt_escultor/', views.obtener_escultores, name='obt_escultores'),
    #path('reg_escult/', views.registrar_escultura, name='registrar_escultura'),
    #path('obt_escult/', views.obtener_escultura, name='obtener_esculturas'),
]
