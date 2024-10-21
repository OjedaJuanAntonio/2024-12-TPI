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
    if request.method == 'POST':
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
    if request.method == 'POST':
        serializer = EscultorRegSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)