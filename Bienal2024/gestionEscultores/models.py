from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.db import models
from gestionEventos.models import Evento

from django.contrib.auth.models import User  # Importa el modelo Persona desde la app correcta

class Escultor(models.Model):
    dni = models.BigIntegerField(validators=[
        MinValueValidator(1000000),  # Mínimo 7 dígitos
        MaxValueValidator(9999999999)  # Máximo 10 dígitos
        ])    
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    nacionalidad = models.CharField(max_length=40)
    telefono = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Formato de teléfono inválido.")]
    )    
    fecha_nac = models.DateField()
    biografia = models.TextField()

class EscultorInvitado(models.Model):
    id_evento= models.ForeignKey(Evento, on_delete= models.CASCADE)
    id_escultor= models.ForeignKey(Escultor, on_delete= models.DO_NOTHING)



class Escultura(models.Model):
    id_escultor = models.ForeignKey(Escultor, on_delete=models.CASCADE)
    id_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    fecha_presentacion = models.DateField()
    titulo = models.CharField(max_length=30)
    Intencion = models.TextField()
    Cant_votos = models.IntegerField()
    tematica = models.TextField(max_length=500)  # Asegúrate de que este campo está presente
