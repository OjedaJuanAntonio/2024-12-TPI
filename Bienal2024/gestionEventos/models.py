from django.db import models
#from gestionUsuarios.models import Administrador

class Evento(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    tematica = models.CharField(max_length=60)
    #estado = models.BooleanField(default=True)
    ubicacion = models.CharField(max_length=50)
    # fecha_inicio = models.DateField(auto_now_add=True)
    # fecha_fin = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre


# class Sponsor(models.Model):
#     logo = models.URLField(max_length=255, blank=True)
#     nombre = models.CharField(max_length=35)
#     # Estado = models.BooleanField()
#     Contacto = models.BigIntegerField()
#     direccion_web = models.URLField()

#     def __str__(self):
#         return self.nombre


# class AdminEvento(models.Model):
#     Admin_ID = models.ForeignKey(Administrador, on_delete=models.CASCADE)
#     Evento_ID = models.ForeignKey(Evento, on_delete=models.CASCADE)

#     class Meta:
#         unique_together = ('Admin_ID', 'Evento_ID')  # Combinación única

#     def __str__(self):
#         return f"{self.Admin_ID} - {self.Evento_ID}"


# class EventoSponsor(models.Model):
#     Evento_Id = models.ForeignKey(Evento, on_delete=models.CASCADE)
#     Sponsor_Id = models.ForeignKey(Sponsor, on_delete=models.CASCADE)

#     class Meta:
#         unique_together = ('Evento_Id', 'Sponsor_Id')  # Combinación única

#     def __str__(self):
#         return f"{self.Evento_Id} - {self.Sponsor_Id}"
