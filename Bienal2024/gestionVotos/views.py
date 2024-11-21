from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import VotoSerializer
from firebase_admin import db


# Inicializar Realtime Database
ref = db.reference('votos')


class VotoViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar los votos de las esculturas.
    """

    def list(self, request):
        """
        Obtiene todos los votos registrados desde Firebase Realtime Database.
        """
        try:
            votos = ref.get()  # Obtiene los votos desde Firebase
            if votos:
                # Convertir los datos en una lista de diccionarios para serializar
                votos_list = [{'id': key, **value} for key, value in votos.items()]
                return Response(votos_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Crea un nuevo voto para una escultura en Firebase.
        """
        serializer = VotoSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                new_ref = ref.push(data)  # Añadir el voto a Firebase
                return Response({'id': new_ref.key, **data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Obtiene un voto específico por ID desde Firebase.
        """
        try:
            voto = ref.child(pk).get()  # Obtiene el voto por ID desde Firebase
            if voto:
                return Response({'id': pk, **voto}, status=status.HTTP_200_OK)
            return Response({'error': 'Voto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        """
        Elimina un voto específico por ID desde Firebase.
        """
        try:
            voto_ref = ref.child(pk)
            if voto_ref.get():
                voto_ref.delete()  # Elimina el voto desde Firebase
                return Response({'message': 'Voto eliminado'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Voto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
