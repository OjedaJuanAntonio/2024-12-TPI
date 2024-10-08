from django.contrib import admin
from gestionEscultores.models import Escultor, Escultura, MediaFile
from gestionEventos.models import Evento, EventoSponsor, AdminEvento
from gestionUsuarios.models import Visitante, Administrador, Persona

# Clase personalizada de administración para el modelo Persona
class BBDD_Personas(admin.ModelAdmin):
    list_display = ('DNI', 'Nombre', 'Apellido')
    search_fields = ('DNI',) 

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

# Registro de los modelos en el panel de administración
admin.site.register(Persona, BBDD_Personas)
admin.site.register(Administrador, BBDD_Administrador)
admin.site.register(Escultor)
admin.site.register(Escultura)
admin.site.register(MediaFile)
admin.site.register(Evento)
admin.site.register(EventoSponsor)
admin.site.register(AdminEvento)
admin.site.register(Visitante)
