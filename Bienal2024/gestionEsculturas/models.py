from django.db import models
from gestionEscultores.models import Escultor  # Asegúrate de importar el modelo Escultor
from gestionEventos.models import Evento  # Asegúrate de importar el modelo Evento

class Escultura(models.Model):
    id_escultor = models.ForeignKey(Escultor, on_delete=models.CASCADE)
    id_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    fecha_presentacion = models.DateField()
    titulo = models.CharField(max_length=30)
    Intencion = models.TextField()
    Cant_votos = models.IntegerField()
    tematica = models.TextField(max_length=500)

    def __str__(self):
        return self.titulo
