from django.contrib import admin
from django.urls import path, re_path, include

from django.contrib import admin
from django.urls import path, re_path
from gestionUsuarios.views import register, profile, logout
from .views import home

urlpatterns = [
    path('', home),
    path('home/', home),
    path('admin/', admin.site.urls),    
    re_path('profile/', profile, name='profile'),
    path('logout/', logout, name='logout'),
    path('', include('social_django.urls')),
]