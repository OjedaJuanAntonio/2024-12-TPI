from rest_framework import serializers
from .models import Escultor, EscultorInvitado

class EscultorSerializer(serializers.ModelSerializer):
    # Mapea las claves del JSON a los campos del modelo
    name = serializers.CharField(source='nombre')  # Mapea 'name' a 'nombre'
    lastName = serializers.CharField(source='apellido')  # Mapea 'lastName' a 'apellido'
    nacionalidad = serializers.CharField()
    email = serializers.EmailField()  # Asegúrate de manejar esto en el modelo si lo agregas
    generalInfo = serializers.CharField(source='biografia')  # Mapea 'generalInfo' a 'biografia'
    photo = serializers.URLField()  # Si planeas guardar URLs de fotos
    phone = serializers.CharField(source='telefono')  # Mapea 'phone' a 'telefono'
    DNI = serializers.IntegerField(source='dni')  # Mapea 'DNI' a 'dni'

    class Meta:
        model = Escultor
        fields = ['name', 'lastName', 'nacionalidad', 'email', 'generalInfo', 'photo', 'phone', 'DNI']