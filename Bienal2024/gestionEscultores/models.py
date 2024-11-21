# from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
# from django.db import models
# from gestionEventos.models import Evento

# #from django.contrib.auth.models import User  # Importa el modelo Persona desde la app correcta

# class Escultor(models.Model):
#     dni = models.BigIntegerField(validators=[
#         MinValueValidator(1000000),  # Mínimo 7 dígitos
#         MaxValueValidator(9999999999)  # Máximo 10 dígitos
#         ])    
#     nombre = models.CharField(max_length=30)
#     apellido = models.CharField(max_length=30)
#     nacionalidad = models.CharField(max_length=40)
#     telefono = models.CharField(
#         max_length=15,
#         validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Formato de teléfono inválido.")]
#     )    
#     #fecha_nac = models.DateField()
#     biografia = models.TextField()

# class EscultorInvitado(models.Model):
#     id_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
#     id_escultor= models.ForeignKey(Escultor, on_delete= models.DO_NOTHING)



from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator, EmailValidator
from django.db import models
from gestionEventos.models import Evento

class Escultor(models.Model):
    # Cambios para coincidir con las claves del JSON
    DNI = models.BigIntegerField(
        validators=[
            MinValueValidator(1000000),  # Mínimo 7 dígitos
            MaxValueValidator(9999999999)  # Máximo 10 dígitos
        ],
        unique=True  # Si el DNI debe ser único
    )
    name = models.CharField(max_length=50)  # Nombre
    lastName = models.CharField(max_length=50)  # Apellido
    nacionalidad = models.CharField(max_length=40)
    email = models.EmailField(
        max_length=100, 
        validators=[EmailValidator(message="Formato de email inválido.")]
    )  # Correo electrónico
    generalInfo = models.TextField()  # Información general
    photo = models.URLField(max_length=300, blank=True, null=True)  # URL de la foto del escultor
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Formato de teléfono inválido.")]
    )  # Teléfono

    def __str__(self):
        return f"{self.name} {self.lastName}"


class EscultorInvitado(models.Model):
    id_evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    id_escultor = models.ForeignKey(Escultor, on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"Escultor Invitado: {self.id_escultor} en Evento: {self.id_evento}"
