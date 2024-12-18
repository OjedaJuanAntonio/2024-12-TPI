from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .serializers import EsculturaSerializer  

ref = db.reference('esculturas')

class EsculturaViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar esculturas en Realtime Database.
    """
    def list(self, request):
        """
        Obtiene todas las esculturas.
        """
        try:
            esculturas = ref.get()
            if esculturas:
                esculturas_list = [{'id': key, **value} for key, value in esculturas.items()]
                return Response(esculturas_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    def create(self, request):
        """
        Crea una nueva escultura.
        """
        serializer = EsculturaSerializer(data=request.data)
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
        Obtiene una escultura específica por ID.
        """
        try:
            escultura = ref.child(pk).get()
            if escultura:
                return Response({'id': pk, **escultura}, status=status.HTTP_200_OK)
            return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        """
        Reemplaza completamente los datos de una escultura (PUT).
        """
        serializer = EsculturaSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                escultura_ref = ref.child(pk)
                if escultura_ref.get():
                    escultura_ref.set(data)  
                    return Response({'id': pk, **data}, status=status.HTTP_200_OK)
                return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk=None):
        """
        Actualiza parcialmente los datos de una escultura (PATCH).
        """
        try:
            escultura_ref = ref.child(pk)
            existing_data = escultura_ref.get()
            if not existing_data:
                return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)

            serializer = EsculturaSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                data = serializer.validated_data
                escultura_ref.update(data) 
                updated_data = {**existing_data, **data}  
                return Response({'id': pk, **updated_data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        """
        Elimina una escultura.
        """
        try:
            escultura_ref = ref.child(pk)
            if escultura_ref.get():
                escultura_ref.delete()
                return Response({'message': 'Escultura eliminada'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)