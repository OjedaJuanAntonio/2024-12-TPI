from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Escultura, Escultor
from .serializers import EsculturaSerializer, EscultorSerializer, EscultorRegSerializer

# Create your views here.

class EsculturaViewSet(viewsets.ModelViewSet):
    queryset = Escultura.objects.all()
    serializer_class = EsculturaSerializer

class EscultorViewSet(viewsets.ModelViewSet):
    queryset = Escultor.objects.all()
    serializer_class = EscultorSerializer

@api_view(['GET'])
def obtener_escultura(request):
    esculturas = Escultura.objects.all()
    serializer = EsculturaSerializer(esculturas, many=True)
    if esculturas.exists():
        return Response(serializer.data)
    else:
        return Response('no hay esculturas')
    

@api_view(['POST'])
def registrar_escultura(request):
    if isinstance(request.data, list):  # Verifica si el JSON es una lista
        resultados = []
        errores = []
        for escultura_data in request.data:
            serializer = EsculturaSerializer(data=escultura_data)
            if serializer.is_valid():
                serializer.save()
                resultados.append(serializer.data)
            else:
                errores.append(serializer.errors)
        
        if errores:
            return Response({"success": resultados, "errors": errores}, status=status.HTTP_207_MULTI_STATUS)
        
        return Response(resultados, status=status.HTTP_201_CREATED)

    # Procesa una solicitud normal de un solo diccionario
    serializer = EsculturaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

@api_view(['GET'])
def obtener_escultores(request):
    esculturas = Escultor.objects.all()
    serializer = EscultorSerializer(esculturas, many=True)
    if esculturas.exists():
        return Response(serializer.data)
    else:
        return Response('no hay escultores')
    

@api_view(['POST'])
def registrar_escultor(request):
    if isinstance(request.data, list):  # Verifica si el JSON es una lista
        resultados = []
        errores = []
        for escultor_data in request.data:
            serializer = EscultorRegSerializer(data=escultor_data)
            if serializer.is_valid():
                serializer.save()
                resultados.append(serializer.data)
            else:
                errores.append(serializer.errors)
        
        if errores:
            return Response({"success": resultados, "errors": errores}, status=status.HTTP_207_MULTI_STATUS)
        
        return Response(resultados, status=status.HTTP_201_CREATED)

    # Procesa una solicitud normal de un solo diccionario
    serializer = EscultorRegSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
