from rest_framework import serializers
from .models import Escultura

class EsculturaSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)  

    class Meta:
        model = Escultura
        fields = ['id','id_escultor','id_evento','titulo','intencion','material_principal','url_imagen_1','url_imagen_2','url_imagen_3',]
