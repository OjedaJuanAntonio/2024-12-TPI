from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator, EmailValidator
from django.db import models
from gestionEventos.models import Evento

class Escultor(models.Model):
   
    DNI = models.BigIntegerField(
        validators=[
            MinValueValidator(1000000),  
            MaxValueValidator(9999999999) 
        ],
        unique=True  
    )
    name = models.CharField(max_length=50)  # Nombre
    lastName = models.CharField(max_length=50)  # Apellido
    nacionalidad = models.CharField(max_length=40)
    email = models.EmailField(
        max_length=100, 
        validators=[EmailValidator(message="Formato de email inválido.")]
    )  
    generalInfo = models.TextField()  
    photo = models.URLField(max_length=300, blank=True, null=True)  
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^+?1?\d{9,15}$', message="Formato de teléfono inválido.")]
    ) 

    def _str_(self):
        return f"{self.name} {self.lastName}"


class EscultorInvitado(models.Model):
    id_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    id_escultor = models.ForeignKey(Escultor, on_delete=models.DO_NOTHING)

    def _str_(self):
        return f"Escultor Invitado: {self.id_escultor} en Evento: {self.id_evento}"