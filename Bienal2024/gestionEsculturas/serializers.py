
from rest_framework import serializers
from .models import Escultura

class EsculturaSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)  

    class Meta:
        model = Escultura
        fields = ['id', 'id_escultor', 'id_evento', 'titulo', 'intencion', 'tematica', 'material_principal', 'url_imagen', 'votos']
