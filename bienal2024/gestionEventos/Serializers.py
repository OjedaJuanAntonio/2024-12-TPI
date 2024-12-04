from rest_framework import serializers
from .models import Evento
import re

class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ['nombre', 'descripcion', 'tematica', 'ubicacion', 'fecha_inicio', 'fecha_fin', 'img_evento']

    def validate_fecha_inicio(self, value):
        """
        Valida que fecha_inicio tenga el formato correcto (YYYY-MM-DD).
        """
        if not re.match(r'^\d{4}-\d{2}-\d{2}$', value):
            raise serializers.ValidationError("El formato de fecha_inicio debe ser YYYY-MM-DD.")
        return value

    def validate_fecha_fin(self, value):
        """
        Valida que fecha_fin tenga el formato correcto (YYYY-MM-DD).
        """
        if not re.match(r'^\d{4}-\d{2}-\d{2}$', value):
            raise serializers.ValidationError("El formato de fecha_fin debe ser YYYY-MM-DD.")
        return value
