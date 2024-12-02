from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .Serializers import EventoSerializer

ref = db.reference('eventos')

class EventoViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar eventos en Realtime Database.
    """

    def list(self, request):
        """
        Listar todos los eventos desde Realtime Database.
        """
        try:
            eventos_ref = ref.get()
            eventos = []
            if eventos_ref:
                for evento_id, evento_data in eventos_ref.items():
                    evento_data['id'] = evento_id  
                    eventos.append(evento_data)
            return Response(eventos, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        """
        Obtener un evento específico por su ID.
        """
        try:
            evento_ref = ref.child(pk).get()  
            if not evento_ref:
                return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            evento_ref['id'] = pk  
            return Response(evento_ref, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Crear un nuevo evento en Realtime Database.
        """
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                evento_ref = ref.push(data) 
                return Response({'id': evento_ref.key, **data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """
        Reemplazar completamente los datos de un evento existente en Realtime Database.
        """
        try:
            evento_ref = ref.child(pk)
            if not evento_ref.get():
                return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            serializer = EventoSerializer(data=request.data)
            if serializer.is_valid():
                data = serializer.validated_data
                evento_ref.set(data)  # Reemplaza todos los datos existentes
                return Response({'id': pk, **data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None):
        """
        Actualizar parcialmente los datos de un evento existente (PATCH).
        """
        try:
            evento_ref = ref.child(pk)
            existing_data = evento_ref.get()
            if not existing_data:
                return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            serializer = EventoSerializer(data=request.data, partial=True)
            if serializer.is_valid():
                data = serializer.validated_data
                evento_ref.update(data)  # Actualiza solo los campos proporcionados
                updated_data = {**existing_data, **data}  # Combina datos existentes y actualizados
                return Response({'id': pk, **updated_data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        """
        Eliminar un evento desde Realtime Database.
        """
        try:
            evento_ref = ref.child(pk)
            if not evento_ref.get():
                return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            evento_ref.delete() 
            return Response({'message': 'Evento eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)