from django.db import models
from django.contrib.auth.models import User# Asegúrate de que la ruta sea correcta
from gestionEscultores.models import Escultura

class Voto(models.Model):
    visitante = models.ForeignKey(User, on_delete=models.CASCADE)
    escultura = models.ForeignKey(Escultura, on_delete=models.CASCADE)
    fecha_voto = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('visitante', 'escultura')  # Asegura que un visitante solo pueda votar una vez por escultura

    def __str__(self):
        return f"{self.visitante} votó por {self.escultura} el {self.fecha_voto}"
