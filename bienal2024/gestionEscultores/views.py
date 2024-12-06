from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .serializers import EscultorSerializer

ref = db.reference('escultores')

class EscultorViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar escultores en Realtime Database.
    """

    def list(self, request):
        """
        Obtiene todos los escultores desde Realtime Database.
        """
        try:
            escultores = ref.get()
            if escultores:
                escultores_list = [
                    {'id': key, **value} for key, value in escultores.items()
                ]
                return Response(escultores_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Crea un nuevo escultor en Realtime Database.
        """
        serializer = EscultorSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data

                new_ref = ref.push(data)
                return Response({'id': new_ref.key, **data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Obtiene un escultor específico por su ID.
        """
        try:
            escultor = ref.child(pk).get()
            if escultor:
                return Response({'id': pk, **escultor}, status=status.HTTP_200_OK)
            return Response({'error': 'Escultor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        """
        Actualiza un escultor existente en Realtime Database (reemplaza completamente).
        """
        serializer = EscultorSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                escultor_ref = ref.child(pk)
                if escultor_ref.get():
                    escultor_ref.set(data)  # Reemplaza todos los datos
                    return Response({'id': pk, **data}, status=status.HTTP_200_OK)
                return Response({'error': 'Escultor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):  # Agregar esta función para PATCH
        """
        Actualiza parcialmente los datos de un escultor existente en Realtime Database.
        """
        try:
            escultor_ref = ref.child(pk)
            escultor = escultor_ref.get()

            if not escultor:
                return Response({'error': 'Escultor no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            # Actualiza solo los campos proporcionados
            data = request.data
            escultor_ref.update(data)
            updated_escultor = escultor_ref.get()  # Recupera el estado actualizado
            return Response({'id': pk, **updated_escultor}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        """
        Elimina un escultor por su ID.
        """
        try:
            escultor_ref = ref.child(pk)
            if escultor_ref.get():
                escultor_ref.delete()
                return Response({'message': 'Escultor eliminado'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Escultor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)