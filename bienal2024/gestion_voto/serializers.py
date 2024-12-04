from rest_framework import serializers
from .models import Voto

class VotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voto
        fields = ['usuario', 'escultor', 'puntaje', 'fecha_voto']
