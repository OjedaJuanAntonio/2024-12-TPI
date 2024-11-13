from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .Serializers import EventoSerializer
from .models import Evento

class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer

# Create your views here.
@api_view(['GET'])
def obtener_evento(request):
    esculturas = Evento.objects.all()
    serializer = EventoSerializer(esculturas, many=True)
    if esculturas.exists():
        return Response(serializer.data)
    else:
        return Response('no hay escultores')
    

@api_view(['POST'])
def registrar_evento(request):
    if isinstance(request.data, list):  # Verifica si el JSON es una lista
        resultados = []
        errores = []
        for escultor_data in request.data:
            serializer = EventoSerializer(data=escultor_data)
            if serializer.is_valid():
                serializer.save()
                resultados.append(serializer.data)
            else:
                errores.append(serializer.errors)
        
        if errores:
            return Response({"success": resultados, "errors": errores}, status=status.HTTP_207_MULTI_STATUS)
        
        return Response(resultados, status=status.HTTP_201_CREATED)

    # Procesa una solicitud normal de un solo diccionario
    serializer = EventoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)