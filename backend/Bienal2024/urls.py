from django.contrib import admin
from django.urls import path
from Bienal2024.views import home,logIn  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', home), 
    path('login/',logIn),
]
