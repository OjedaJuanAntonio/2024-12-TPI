from django.db import models

class Evento(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    tematica = models.CharField(max_length=255)
    ubicacion = models.CharField(max_length=255)
    img_evento = models.URLField(max_length=500)  
    fecha_inicio = models.DateField()  
    fecha_fin = models.DateField()
