from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import UsuarioSerializer
from firebase_admin import db


# Inicializar Realtime Database
ref = db.reference('usuarios')


class UsuarioViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar usuarios autenticados desde Auth0, usando Firebase Realtime Database.
    """

    def create(self, request):
        """
        Crea un nuevo usuario con los datos proporcionados por Auth0 en Firebase.
        """
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Verificar si el usuario ya existe en Firebase (por auth0_id)
                sub = serializer.validated_data['sub']
                user_ref = ref.child(sub)
                
                if user_ref.get():  # Si el usuario ya existe
                    return Response({"message": "Usuario ya existe"}, status=status.HTTP_200_OK)
                
                # Crear un nuevo usuario en Firebase
                user_ref.set(serializer.validated_data)  # Guardar los datos en Firebase
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        """
        Obtiene todos los usuarios desde Firebase.
        """
        try:
            users = ref.get()  # Obtener todos los usuarios desde Firebase
            if users:
                users_list = [{'id': key, **value} for key, value in users.items()]
                return Response(users_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        """
        Obtiene un usuario por su auth0_id desde Firebase.
        """
        try:
            user = ref.child(pk).get()  # Obtener el usuario desde Firebase por su auth0_id
            if user:
                return Response({'id': pk, **user}, status=status.HTTP_200_OK)
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
