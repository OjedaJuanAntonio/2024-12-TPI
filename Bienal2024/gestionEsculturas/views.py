from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .serializers import EsculturaSerializer
#from .permissions import IsAdminEsculturasOrReadOnly

from rest_framework.views import APIView
from rest_framework.response import Response
#from .permissions import HasRole
from rest_framework.views import APIView
from rest_framework.response import Response


ref = db.reference('esculturas')

class EsculturaViewSet(viewsets.ViewSet):

    def get(self, request):
        print("¡Acceso permitido! Eres admin de esculturas.")
        
        return Response({"message": "Tienes acceso como admin de esculturas."})
   
    #permission_classes = [IsAdminEsculturasOrReadOnly]


    def list(self, request):
        """
        Obtiene todas las esculturas o filtra por id_escultor si se proporciona.
        """
        try:
            esculturas = ref.get()  # Obtiene todas las esculturas de Firebase
            if esculturas:
                esculturas_list = [{'id': key, **value} for key, value in esculturas.items()]
                
                id_escultor = request.query_params.get('id_escultor')
                if id_escultor:
                    esculturas_list = [
                        escultura for escultura in esculturas_list 
                        if escultura.get('id_escultor') == id_escultor
                    ]
                
                return Response(esculturas_list, status=status.HTTP_200_OK)
            
            #print(request.usuarios)
            return Response([], status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': f'Error al obtener esculturas: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Crea una nueva escultura. Solo accesible para 'admin_esculturas'.
        """
        serializer = EsculturaSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                new_ref = ref.push(data)  # Agrega los datos a Firebase
                return Response({'id': new_ref.key, **data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': f'Error al crear escultura: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
            return Response({'error': f'Error al obtener escultura: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
                    escultura_ref.set(data)  # Reemplaza todos los datos
                    return Response({'id': pk, **data}, status=status.HTTP_200_OK)
                return Response({'error': 'Escultura no encontrada'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': f'Error al actualizar escultura: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
                escultura_ref.update(data)  # Actualiza solo los campos proporcionados
                updated_data = {**existing_data, **data}  # Mezcla datos originales y actualizados
                return Response({'id': pk, **updated_data}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error al actualizar escultura: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            return Response({'error': f'Error al eliminar escultura: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

