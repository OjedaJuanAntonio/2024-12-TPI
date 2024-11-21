from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator  # Agregar esta línea
#from gestionEsculturas.models import Escultura
#from gestionUsuarios.models import Usuario  # Asumiendo que gestionUsuarios tiene un modelo Usuario

class Voto(models.Model):
    id_escultura = models.TextField(max_length=500)
    id_usuario = models.TextField(max_length=500)
    puntaje = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    fecha_voto = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('id_escultura', 'id_usuario')  # Garantiza que un usuario solo pueda votar una vez por escultura

    def __str__(self):
        return f"Voto de {self.id_usuario.name} a la escultura {self.id_escultura.titulo} con puntaje {self.puntaje}"
