from django.db import models

class Escultura(models.Model):
    id_escultor = models.TextField(max_length=500)
    id_evento = models.TextField(max_length=500)
    titulo = models.CharField(max_length=30)
    intencion = models.TextField()
    tematica = models.TextField(max_length=500)
    material_principal = models.CharField(max_length=100)
    url_imagen = models.URLField(max_length=500)  # Campo para la URL de la imagen

    def __str__(self):
        return self.titulo
