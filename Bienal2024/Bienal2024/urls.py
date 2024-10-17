from django.contrib import admin
from django.urls import path, re_path, include

from django.contrib import admin
from django.urls import path, re_path
from gestionUsuarios.views import profile, logout
from .views import home, register_view

urlpatterns = [
    path('', home),
    path('home/', home),
    path('admin/', admin.site.urls),    
    re_path('profile/', profile, name='profile'),
    re_path('register_view/', register_view, name='profile'),
    path('logout/', logout, name='logout'),
    path('', include('social_django.urls')),
]