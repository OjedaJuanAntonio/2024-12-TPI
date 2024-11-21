# from rest_framework import serializers

# class EsculturaSerializer(serializers.Serializer):
#     id_escultor = serializers.CharField(max_length=255)
#     id_evento = serializers.CharField(max_length=255)
#     #fecha_presentacion = serializers.DateField()
#     titulo = serializers.CharField(max_length=30)
#     Intencion = serializers.CharField()
#     tematica = serializers.CharField(max_length=500)
    

from rest_framework import serializers
from .models import Escultura

class EsculturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultura
        fields = ['id_escultor', 'id_evento', 'titulo', 'intencion', 'tematica', 'material_principal', 'url_imagen']
