from rest_framework import serializers
from .models import Escultura

class EsculturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultura
        fields = '__all__'  # O puedes especificar los campos que deseas incluir
