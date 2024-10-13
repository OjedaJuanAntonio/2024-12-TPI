from django.contrib import admin
from django.urls import path, re_path

from django.contrib import admin
from django.urls import path, re_path
from gestionUsuarios.views import register, login, profile
from .views import home, login_view, register_view

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    re_path('register_view/', register_view, name= 'register_view'),
    re_path('login_view/', login_view, name= 'login_view'),
    re_path('register/', register, name= 'register'),
    re_path('login/', login, name= 'login'),
    re_path('profile/', profile),
]