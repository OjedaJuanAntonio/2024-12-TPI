from django.db import models
from gestionUsuarios.models import Persona  # Importa el modelo Persona desde la app correcta

class Escultor(models.Model):
    DNI_Esc = models.OneToOneField('gestionUsuarios.Persona', on_delete=models.CASCADE)
    Nacionalidad = models.CharField(max_length=40)
    Fecha_Nac = models.DateField()
    Biografia = models.TextField()
    DNI_Adm = models.ForeignKey('gestionUsuarios.Administrador', on_delete=models.SET_NULL, null=True)  # Usar el nombre del modelo como cadena

class Escultura(models.Model):
    ID_Escultura = models.AutoField(primary_key=True)
    DNI_Esc = models.ForeignKey(Escultor, on_delete=models.CASCADE)
    Fecha_creacion = models.DateField()
    Titulo = models.CharField(max_length=55)
    Intencion = models.TextField()
    Cant_votos = models.IntegerField()
    Tematica = models.CharField(max_length=100)  # Asegúrate de que este campo está presente



class MediaFile(models.Model):
    ID_Media = models.AutoField(primary_key=True)
    File_Path = models.CharField(max_length=255)
    File_Type = models.CharField(max_length=50)
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
