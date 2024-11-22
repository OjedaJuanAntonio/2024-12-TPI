from django.db import models
#from gestionUsuarios.models import Administrador

class Evento(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    tematica = models.CharField(max_length=60)
    #estado = models.BooleanField(default=True)
    ubicacion = models.CharField(max_length=50)
    # fecha_inicio = models.DateField(auto_now_add=True)
    # fecha_fin = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre

