from rest_framework import serializers
from .models import Evento

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['nombre', 'descripcion', 'tematica', 'ubicacion', 'fecha_inicio', 'fecha_fin']
