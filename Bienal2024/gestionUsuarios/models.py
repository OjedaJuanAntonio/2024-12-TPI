from django.db import models
from django.contrib import admin
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class BBDD_Personas(admin.ModelAdmin):
    list_display=('DNI','Nombre','Apellido')
    
class Persona(models.Model):
    DNI = models.IntegerField(primary_key=True)  # Cambiado a IntegerField para entrada manual
    Email = models.EmailField(max_length=254, unique=True)
    Nombre = models.CharField(max_length=35)
    Apellido = models.CharField(max_length=35)
    Telefono = models.BigIntegerField()
    Foto_Perfil = models.URLField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.DNI} |{self.Nombre} {self.Apellido} "


class Administrador(models.Model):
    DNI_Adm = models.OneToOneField(Persona, on_delete=models.CASCADE, primary_key=True)  # Relación uno a uno
    Fecha_cr = models.DateField()
    Rol = models.CharField(max_length=60)

    def __str__(self):
        return f"Administrador: {self.DNI_Adm} - Rol: {self.Rol}"


class Visitante(models.Model):
    DNI_Vis = models.OneToOneField(Persona, on_delete=models.CASCADE, primary_key=True)  # Relación uno a uno
    Localidad = models.CharField(max_length=50)
    Codigo_Postal = models.CharField(max_length=10)

    def __str__(self):
        return f"Visitante: {self.DNI_Vis} - Localidad: {self.Localidad}"
