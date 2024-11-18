from rest_framework import serializers
from .models import Escultor

class EscultorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = ['dni', 'nacionalidad', 'nombre', 'apellido', 'fecha_nac', 'biografia', 'telefono']


class EscultorRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = ['dni', 'nacionalidad', 'nombre', 'apellido', 'fecha_nac', 'biografia', 'telefono']


    def get_dni(self):
        dni_esc = self.validated_data.get('dni')
        return dni_esc
