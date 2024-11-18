from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .Serializers import EventoSerializer

# Inicializar Realtime Database
ref = db.reference('eventos')

class EventoViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar eventos en Realtime Database.
    """

    def list(self, request):
        """
        Listar todos los eventos desde Realtime Database.
        """
        eventos_ref = ref.get()  # Obtener todos los eventos
        eventos = []
        if eventos_ref:
            for evento_id, evento_data in eventos_ref.items():
                evento_data['id'] = evento_id  # Añadir el ID al evento
                eventos.append(evento_data)
        return Response(eventos, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        """
        Obtener un evento específico por su ID.
        """
        evento_ref = ref.child(pk).get()  # Obtener un evento específico
        if not evento_ref:
            return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        evento_ref['id'] = pk  # Añadir el ID al evento
        return Response(evento_ref, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Crear un nuevo evento en Realtime Database.
        """
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            evento_ref = ref.push(data)  # Añade el evento a Realtime Database
            return Response({'id': evento_ref.key, **data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """
        Actualizar un evento existente en Realtime Database.
        """
        evento_ref = ref.child(pk)
        if not evento_ref.get():
            return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            evento_ref.update(data)  # Actualiza el evento en Realtime Database
            return Response({'id': pk, **data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Eliminar un evento desde Realtime Database.
        """
        evento_ref = ref.child(pk)
        if not evento_ref.get():
            return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        evento_ref.delete()  # Elimina el evento de Realtime Database
        return Response({'message': 'Evento eliminado correctamente'}, status=status.HTTP_204_NO_CONTENT)
