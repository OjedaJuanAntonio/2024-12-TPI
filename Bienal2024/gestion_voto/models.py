from django.db import models
from django.conf import settings  # Para usar el modelo de usuario
from django.core.validators import MinValueValidator, MaxValueValidator  # Importa los validadores


class Voto(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    escultor = models.ForeignKey('gestionEscultores.Escultor', on_delete=models.CASCADE)
    puntaje = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]  # Escala de 1 a 5
    )
    fecha_voto = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario', 'escultor')  # Evita que un usuario vote al mismo escultor más de una vez
