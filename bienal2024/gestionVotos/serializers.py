from rest_framework import serializers
from firebase_admin import db

class VotoSerializer(serializers.Serializer):
    id_escultura = serializers.CharField(max_length=500)
    id_usuario = serializers.CharField(max_length=500)
    puntaje = serializers.IntegerField(min_value=1, max_value=5)

    def validate(self, data):
    
        try:
            votos = db.reference('votos').get()
            
            if votos:
                for key, value in votos.items():
                    if value['id_escultura'] == data['id_escultura'] and value['id_usuario'] == data['id_usuario']:
                        raise serializers.ValidationError("Este usuario ya ha votado por esta escultura.")
            
        except Exception as e:
            raise serializers.ValidationError(f"Error validando los votos: {str(e)}")
        
        return data
