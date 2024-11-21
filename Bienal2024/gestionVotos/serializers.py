from rest_framework import serializers
from .models import Voto

class VotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voto
        fields = ['id_escultura', 'id_usuario', 'puntaje']

    def validate(self, data):
        """
        Validar que un usuario no haya votado ya por la misma escultura.
        """
        if Voto.objects.filter(id_escultura=data['id_escultura'], id_usuario=data['id_usuario']).exists():
            raise serializers.ValidationError("Este usuario ya ha votado por esta escultura.")
        return data
