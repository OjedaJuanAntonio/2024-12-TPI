
from rest_framework import serializers
from .models import Escultor

class EscultorSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='nombre')  
    lastName = serializers.CharField(source='apellido')  
    nacionalidad = serializers.CharField()
    email = serializers.EmailField()  
    generalInfo = serializers.CharField(source='biografia') 
    photo = serializers.URLField()  
    phone = serializers.CharField(source='telefono')  
    DNI = serializers.IntegerField(source='dni')  

    class Meta:
        model = Escultor
        fields = ['name', 'lastName', 'nacionalidad', 'email', 'generalInfo', 'photo', 'phone', 'DNI']
