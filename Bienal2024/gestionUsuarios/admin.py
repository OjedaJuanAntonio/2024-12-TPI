from django.contrib import admin
from gestionEscultores.models import Escultor
from gestionEventos.models import Evento, EventoSponsor, AdminEvento
from gestionUsuarios.models import Administrador

 # Clase personalizada de administración para el modelo Administrador
class BBDD_Administrador(admin.ModelAdmin):
     list_display = ('get_dni', 'get_nombre', 'get_apellido', 'Rol')
     search_fields = ('DNI_Adm__DNI',)
     autocomplete_fields = ['DNI_Adm'] 
     list_filter=('Rol',)
    

     def get_dni(self, obj):
         return obj.DNI_Adm.DNI
     get_dni.short_description = 'DNI'

     def get_nombre(self, obj):
         return obj.DNI_Adm.Nombre
     get_nombre.short_description = 'Nombre'

     def get_apellido(self, obj):
         return obj.DNI_Adm.Apellido
     get_apellido.short_description = 'Apellido'

#  Registro de los modelos en el panel de administración
admin.site.register(Administrador, BBDD_Administrador)
admin.site.register(Escultor)
admin.site.register(Evento)
admin.site.register(EventoSponsor)
admin.site.register(AdminEvento)
