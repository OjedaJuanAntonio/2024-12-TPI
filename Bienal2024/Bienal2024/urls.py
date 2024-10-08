from django.contrib import admin
from django.urls import path
from Bienal2024.views import saludos  # Asegúrate de que esté importado correctamente

urlpatterns = [
    path('admin/', admin.site.urls),
    path('saludos/', saludos),  # Asegúrate de que esto esté correcto
]
