from rest_framework import viewsets, status
from rest_framework.response import Response
from firebase_admin import db
from .serializers import VotoSerializer
from collections import defaultdict
from operator import itemgetter

ref = db.reference('votos')

class VotoViewSet(viewsets.ViewSet):
    """
    ViewSet para manejar los votos en Firebase.
    """

    def list(self, request):
        """
        Obtiene todos los votos registrados desde Firebase Realtime Database.
        """
        try:
            votos = ref.get()
            if votos:
                votos_list = [{'id': key, **value} for key, value in votos.items()]
                return Response(votos_list, status=status.HTTP_200_OK)
            return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        """
        Crea un nuevo voto para una escultura en Firebase.
        """
        serializer = VotoSerializer(data=request.data)
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
        Obtiene un voto específico por ID desde Firebase.
        """
        try:
            voto = ref.child(pk).get()
            if voto:
                return Response({'id': pk, **voto}, status=status.HTTP_200_OK)
            return Response({'error': 'Voto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        """
        Elimina un voto específico por ID desde Firebase.
        """
        try:
            voto_ref = ref.child(pk)
            if voto_ref.get():
                voto_ref.delete()
                return Response({'message': 'Voto eliminado'}, status=status.HTTP_204_NO_CONTENT)
            return Response({'error': 'Voto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def top_3(self, request):
        """
        Obtiene el top 3 de esculturas según el promedio de los puntajes de los votos.
        """
        try:
            votos = ref.get()
            
            if not votos:
                return Response({'error': 'No hay votos registrados'}, status=status.HTTP_404_NOT_FOUND)
            
            # Usamos un defaultdict para contar los votos y acumular los puntajes
            puntajes = defaultdict(int)
            cantidad_votos = defaultdict(int)
            
            for value in votos.values():
                id_escultura = value['id_escultura']
                puntaje = value['puntaje']
                
                puntajes[id_escultura] += puntaje  # Sumar los puntajes
                cantidad_votos[id_escultura] += 1  # Contar la cantidad de votos

            # Calcular el promedio de puntajes para cada escultura
            promedios = {}
            for escultura, total_puntajes in puntajes.items():
                cantidad = cantidad_votos[escultura]
                promedio = total_puntajes / cantidad  # Dividir la suma de puntajes por la cantidad de votos
                promedios[escultura] = promedio
            
            # Ordenar las esculturas por promedio de puntajes
            top_3_esculturas = sorted(promedios.items(), key=itemgetter(1), reverse=True)[:3]

            # Preparar la respuesta con el top 3
            resultado = [{'id_escultura': escultura, 'promedio': promedios[escultura]} for escultura, _ in top_3_esculturas]

            return Response(resultado, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
