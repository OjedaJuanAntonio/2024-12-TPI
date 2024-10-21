from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.db import models

from django.contrib.auth.models import User  # Importa el modelo Persona desde la app correcta

class Escultor(models.Model):
    ID_Esc = models.OneToOneField(User, on_delete=models.CASCADE)
    DNI_Esc = models.BigIntegerField(validators=[
        MinValueValidator(1000000),  # Mínimo 7 dígitos
        MaxValueValidator(9999999999)  # Máximo 10 dígitos
        ])    
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    Nacionalidad = models.CharField(max_length=40)
    telefono = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Formato de teléfono inválido.")]
    )    
    Fecha_Nac = models.DateField()
    Biografia = models.TextField()


class Escultura(models.Model):
    ID_Escultura = models.AutoField(primary_key=True)
    id = models.ForeignKey(Escultor, on_delete=models.CASCADE)
    Fecha_creacion = models.DateField()
    Titulo = models.CharField(max_length=30)
    Intencion = models.TextField()
    Cant_votos = models.IntegerField()
    Tematica = models.TextField(max_length=500)  # Asegúrate de que este campo está presente


class MediaFile(models.Model):
    ID_Media = models.AutoField(primary_key=True)
    File_Path = models.CharField(max_length=300)
    File_Type = models.CharField(max_length=30)
    Escultura_ID = models.ForeignKey('gestionEscultores.Escultura', null=True, blank=True, on_delete=models.CASCADE)
    Evento_ID = models.ForeignKey('gestionEventos.Evento', null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=(
                    (models.Q(Escultura_ID__isnull=False) & models.Q(Evento_ID__isnull=True)) |
                    (models.Q(Escultura_ID__isnull=True) & models.Q(Evento_ID__isnull=False))
                ),
                name='media_file_constraint'
            )
        ]
