from django.db import models
from django.contrib import admin
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User
from django.db import models



 # Primero defines un UserManager personalizado
class AdminManager(BaseUserManager):
     def create_user(self, email, password=None, **extra_fields):
         if not email:
             raise ValueError('El email es requerido')
         email = self.normalize_email(email)
         user = self.model(email=email, **extra_fields)
         user.set_password(password)  # Encripta la contraseña
         user.save(using=self._db)
         return user

     def create_superuser(self, email, password=None, **extra_fields):
         extra_fields.setdefault('is_staff', True)
         extra_fields.setdefault('is_superuser', True)

         return self.create_user(email, password, **extra_fields)



    

class Administrador(AbstractBaseUser, PermissionsMixin):
     DNI_Adm = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)  # Relación uno a uno
     Fecha_cr = models.DateField(auto_now_add=True)
     nombre = models.CharField(max_length=30)
     apellido = models.CharField(max_length=30)

     Rol = models.CharField(max_length=60)


     groups = models.ManyToManyField(
         'auth.Group',
         related_name='persona_set',  # Cambia el related_name para evitar el conflicto
         blank=True,
         help_text='Los grupos a los que pertenece el usuario.'
     )

     user_permissions = models.ManyToManyField(
         'auth.Permission',
         related_name='persona_user_permissions_set',  # Cambia el related_name para evitar el conflicto
         blank=True,
         help_text='Permisos específicos para este usuario.'
     )


     # Estos campos son necesarios si estás usando AbstractBaseUser
     is_active = models.BooleanField(default=True)
     is_staff = models.BooleanField(default=False)

     # Define el UserManager
     objects = AdminManager()

     USERNAME_FIELD = 'email'  # Utilizas el email para loguear al usuario     REQUIRED_FIELDS = ['nombre', 'apellido', 'dni']  # Campos requeridos además del email

     def __str__(self):
         return f'{self.nombre} {self.apellido}'


     def __str__(self):
         return f"Administrador: {self.DNI_Adm} - Rol: {self.Rol}"


class BBDD_Administrador(admin.ModelAdmin):
    list_display = ['dni', 'nombre', 'apellido']


    