from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import firestore
from .serializers import votoSerializer

# Firestore client (ya inicializado en settings.py)
db = firestore.client()


@api_view(['POST'])
@authentication_classes([])  # Puedes configurar autenticación específica aquí si la necesitas.
@permission_classes([])  # Puedes requerir permisos específicos aquí si es necesario.
def votacion(request):
    """
    Maneja la lógica de votación utilizando Firebase Firestore.
    """
    if request.method == 'POST':
        serializer = votoSerializer(data=request.data)
        if serializer.is_valid():
            usuario = request.user.username  # O cualquier identificador único del usuario
            escultor = serializer.validated_data['escultor']

            try:
                # Verificar si el usuario ya votó por este escultor
                voto_docs = db.collection('votos').where('usuario', '==', usuario).where('escultor', '==', escultor).stream()
                if any(voto_docs):
                    return Response({'error': "Ya has votado por este escultor."}, status=status.HTTP_400_BAD_REQUEST)

                # Guardar el voto en Firestore
                data = {
                    'usuario': usuario,
                    'escultor': escultor,
                    'fecha': firestore.SERVER_TIMESTAMP,
                }
                db.collection('votos').add(data)
                return Response(data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
