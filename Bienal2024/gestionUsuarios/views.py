from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import UsuarioSerializer
from firebase_admin import db
import logging

ref = db.reference('usuarios')

logger = logging.getLogger(__name__)

class UsuarioViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar usuarios autenticados desde Auth0, usando exclusivamente Firebase.
    """

    def create(self, request):
        """
        Crea un nuevo usuario con los datos proporcionados por Auth0 en Firebase.
        Si el usuario ya existe, devuelve un mensaje de bienvenida.
        """
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Verificar si el usuario ya existe en Firebase (por sub)
                sub = serializer.validated_data['sub']
                user_ref = ref.child(sub)
                existing_user = user_ref.get()

                if existing_user:  # Si el usuario ya existe
                    # Enviar un mensaje de bienvenida al usuario existente
                    return Response(
                        {"message": "Bienvenida al Usuario", "user_data": existing_user},
                        status=status.HTTP_200_OK
                    )

                # Crear un nuevo usuario en Firebase
                user_ref.set(serializer.validated_data)  # Guardar los datos validados en Firebase
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                # Log del error para depuración
                logger.error(f"Error al crear usuario en Firebase: {e}")
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Log de errores de validación
        logger.error(f"Errores de validación: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        """
        Obtiene todos los usuarios desde Firebase.
        """
        try:
            users = ref.get()
            if users:
                users_list = [{'id': key, **value} for key, value in users.items()]
                return Response(users_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error al listar usuarios desde Firebase: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        """
        Obtiene un usuario por su ID (sub) desde Firebase.
        """
        try:
            user = ref.child(pk).get()
            if user:
                return Response({'id': pk, **user}, status=status.HTTP_200_OK)
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error al obtener usuario con ID {pk} desde Firebase: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        """
        Actualiza los datos de un usuario existente en Firebase.
        """
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user_ref = ref.child(pk)
                existing_user = user_ref.get()

                if not existing_user:  # Si el usuario no existe
                    return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

                # Actualizar el usuario con los datos proporcionados
                user_ref.update(serializer.validated_data)
                return Response({"message": "Usuario actualizado correctamente"}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error al actualizar usuario con ID {pk} en Firebase: {e}")
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Log de errores de validación
        logger.error(f"Errores de validación: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
