from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import firestore

db = firestore.client()

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        try:
            # Registrar usuario en Firestore
            db.collection('users').document(data['uid']).set({
                'name': data['name'],
                'email': data['email']
            })
            return Response({'message': 'Usuario registrado con éxito'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        return Response({'message': 'Funcionalidad de inicio de sesión no implementada'})

class ProfileView(APIView):
    def get(self, request):
        user_id = request.query_params.get('uid')
        try:
            # Obtener datos del usuario desde Firestore
            user_doc = db.collection('users').document(user_id).get()
            if user_doc.exists:
                return Response(user_doc.to_dict(), status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
