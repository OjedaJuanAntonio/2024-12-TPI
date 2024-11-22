from django.db import models
#from gestionEventos.models import Evento

class Sponsor(models.Model):
    id_evento = models.CharField(max_length=255)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(max_length=500)
    aporte = models.TextField(max_length=500)  
    contacto = models.TextField(max_length=500)

    def __str__(self):
        return self.nombre
