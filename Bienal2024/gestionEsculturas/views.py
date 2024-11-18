from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import firestore
from .serializers import EsculturaSerializer

# Firestore client (ya inicializado en settings.py)
db = firestore.client()


class EsculturaViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar esculturas en Firestore.
    """

    def list(self, request):
        """
        Obtiene todas las esculturas desde Firestore.
        """
        try:
            escultura_docs = db.collection('esculturas').stream()
            esculturas = [doc.to_dict() for doc in escultura_docs]
            return Response(esculturas, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Crea una nueva escultura en Firestore.
        """
        serializer = EsculturaSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                doc_ref = db.collection('esculturas').document()
                doc_ref.set(data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        """
        Obtiene una escultura específica por su ID.
        """
        try:
            doc = db.collection('esculturas').document(pk).get()
            if doc.exists:
                return Response(doc.to_dict(), status=status.HTTP_200_OK)
            return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        """
        Actualiza una escultura existente en Firestore.
        """
        serializer = EsculturaSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                doc_ref = db.collection('esculturas').document(pk)
                if doc_ref.get().exists:
                    doc_ref.update(data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Elimina una escultura por su ID.
        """
        try:
            doc_ref = db.collection('esculturas').document(pk)
            if doc_ref.get().exists:
                doc_ref.delete()
                return Response({'message': 'Escultura eliminada'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
