from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .serializers import VotoSerializer

ref = db.reference('votos')  # Referencia a Firebase Realtime Database

class VotoViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar los votos en Firebase.
    """

    def list(self, request):
        """
        Obtiene todos los votos registrados desde Firebase Realtime Database.
        """
        try:
            votos = ref.get()
            if votos:
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
                new_ref = ref.push(data)  # Inserta el nuevo voto en Firebase
                return Response({'id': new_ref.key, **data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Obtiene un voto específico por ID desde Firebase.
        """
        try:
            voto = ref.child(pk).get()
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
                voto_ref.delete()
                return Response({'message': 'Voto eliminado'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Voto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
