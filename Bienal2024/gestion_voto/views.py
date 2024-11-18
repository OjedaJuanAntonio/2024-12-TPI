from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import firestore
from .serializers import VotoSerializer
#from django.conf import settings

# Inicialización de Firestore (asegúrate de haberlo configurado en settings.py)
db = firestore.client()

class VotoViewSet(viewsets.ModelViewSet):
    queryset = []  # No es necesario, ya que no estamos usando un queryset tradicional.
    serializer_class = VotoSerializer
    # permission_classes = [permissions.IsAuthenticated]  # Solo usuarios autenticados pueden votar

    def perform_create(self, serializer):
        usuario = self.request.user
        escultura = serializer.validated_data['escultura']

        # Verificar si el usuario ya votó a este escultor en Firestore
        votos_ref = db.collection('votos')
        voto_query = votos_ref.where('usuario', '==', usuario.id).where('escultura', '==', escultura.id).stream()
        
        if any(voto.id for voto in voto_query):
            raise ValidationError("Ya has votado por este escultor.")

        # Guardar el voto en Firestore
        voto_data = {
            'usuario': usuario.id,
            'escultura': escultura.id,
            'fecha': firestore.SERVER_TIMESTAMP,  # Fecha en que se creó el voto
        }
        
        # Guardar el voto en la colección "votos"
        votos_ref.add(voto_data)

        # Retornar el voto en formato serializado
        return Response(serializer.data, status=status.HTTP_201_CREATED)
