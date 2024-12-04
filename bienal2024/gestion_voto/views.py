from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import firestore
from .serializers import VotoSerializer

db = firestore.client()

class VotoViewSet(viewsets.ModelViewSet):
    queryset = [] 
    serializer_class = VotoSerializer
    # permission_classes = [permissions.IsAuthenticated]  # Solo usuarios autenticados pueden votar

    def perform_create(self, serializer):
        usuario = self.request.user
        escultura = serializer.validated_data['escultura']

        votos_ref = db.collection('votos')
        voto_query = votos_ref.where('usuario', '==', usuario.id).where('escultura', '==', escultura.id).stream()
        
        if any(voto.id for voto in voto_query):
            raise ValidationError("Ya has votado por este escultor.")

        voto_data = {
            'usuario': usuario.id,
            'escultura': escultura.id,
            'fecha': firestore.SERVER_TIMESTAMP,  
        }
        
        
        votos_ref.add(voto_data)

        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
