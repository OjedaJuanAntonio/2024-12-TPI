from django.db import models

class Escultura(models.Model):
    id_escultor = models.TextField(max_length=500)
    id_evento = models.TextField(max_length=500)
    titulo = models.CharField(max_length=30)
    intencion = models.TextField()
    material_principal = models.CharField(max_length=100)
    url_imagen_1 = models.URLField(max_length=500)  
    url_imagen_2 = models.URLField(max_length=500, blank=True, null=True)
    url_imagen_3 = models.URLField(max_length=500, blank=True, null=True)
    
    def __str__(self):
        return self.titulo
