from rest_framework.permissions import BasePermission
from django.http import JsonResponse
import json

class IsAdminOfSculpture(BasePermission):
    """
    Permiso personalizado:
    - Permite a cualquiera ver la lista de esculturas (list).
    - Solo los administradores pueden crear, modificar o borrar esculturas.
    """

    def has_permission(self, request, view):
        #Permitir a cualquiera acceder a la lista de esculturas
        if view.action == 'list':
            return True
        
        # Obtener el usuario autenticado
        data = json.loads(request.body)
        type_user = data.get("type_user")
        

        # Para todas las demás acciones, verificar si el usuario es admin
        if type_user == 'admin_esculturas' or type_user == 'superuser':
            return True

        # Si no cumple las condiciones, denegar el acceso
        return False