from django.db import models
from gestionUsuarios.models import Administrador

class Evento(models.Model):
    Id_E = models.AutoField(primary_key=True)  # Cambiado a AutoField
    Nombre_Ev = models.CharField(max_length=30)
    Descripcion = models.TextField()
    Tematica = models.CharField(max_length=60)
    Duracion = models.FloatField()
    Estado = models.BooleanField()
    Ubicacion = models.CharField(max_length=50)
    Fecha_In = models.DateField()

    def __str__(self):
        return self.Nombre_Ev


class Sponsor(models.Model):
    ID_Sp = models.AutoField(primary_key=True)  # Cambiado a AutoField
    Logotipo = models.URLField(max_length=255, blank=True)
    Nombre = models.CharField(max_length=35)
    Estado = models.BooleanField()
    Contacto = models.BigIntegerField()

    def __str__(self):
        return self.Nombre


class AdminEvento(models.Model):
    Admin_ID = models.ForeignKey(Administrador, on_delete=models.CASCADE)
    Evento_ID = models.ForeignKey(Evento, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('Admin_ID', 'Evento_ID')  # Combinación única

    def __str__(self):
        return f"{self.Admin_ID} - {self.Evento_ID}"


class EventoSponsor(models.Model):
    Evento_Id = models.ForeignKey(Evento, on_delete=models.CASCADE)
    Sponsor_Id = models.ForeignKey(Sponsor, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('Evento_Id', 'Sponsor_Id')  # Combinación única

    def __str__(self):
        return f"{self.Evento_Id} - {self.Sponsor_Id}"
