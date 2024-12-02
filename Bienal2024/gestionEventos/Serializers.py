from rest_framework import serializers
from datetime import datetime
from .models import Evento

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['nombre', 'descripcion', 'tematica', 'ubicacion', 'fecha_inicio', 'fecha_fin','img_evento' ]

    def validate_fecha_inicio(self, value):
        if isinstance(value, int):  # Si llega como timestamp
            return datetime.utcfromtimestamp(value / 1000).date()  # Convierte a date
        elif isinstance(value, str):  # Si llega como string
            try:
                return datetime.strptime(value, "%Y-%m-%d").date()  # Formato esperado
            except ValueError:
                raise serializers.ValidationError("Formato de fecha inválido para fecha_inicio.")
        return value

    def validate_fecha_fin(self, value):
        if isinstance(value, int):  # Si llega como timestamp
            return datetime.utcfromtimestamp(value / 1000).date()  # Convierte a date
        elif isinstance(value, str):  # Si llega como string
            try:
                return datetime.strptime(value, "%Y-%m-%d").date()  # Formato esperado
            except ValueError:
                raise serializers.ValidationError("Formato de fecha inválido para fecha_fin.")
        return value
