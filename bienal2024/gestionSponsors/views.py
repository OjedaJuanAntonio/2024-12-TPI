from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .serializers import SponsorSerializer

ref = db.reference('sponsors')

class SponsorViewSet(viewsets.ViewSet):
    def list(self, request):
        try:
            sponsors = ref.get()
            if sponsors:
                sponsors_list = [
                    {'id': key, **value} for key, value in sponsors.items()
                ]
                return Response(sponsors_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        serializer = SponsorSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                new_ref = ref.push(data)  
                return Response({'id': new_ref.key, **data}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            sponsor = ref.child(pk).get()
            if sponsor:
                return Response({'id': pk, **sponsor}, status=status.HTTP_200_OK)
            return Response({'error': 'Sponsor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        serializer = SponsorSerializer(data=request.data)
        if serializer.is_valid():
            try:
                data = serializer.validated_data
                sponsor_ref = ref.child(pk)
                if sponsor_ref.get():
                    sponsor_ref.update(data)
                    return Response({'id': pk, **data}, status=status.HTTP_200_OK)
                return Response({'error': 'Sponsor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            sponsor_ref = ref.child(pk)
            if sponsor_ref.get():
                sponsor_ref.delete()
                return Response({'message': 'Sponsor eliminado'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Sponsor no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
