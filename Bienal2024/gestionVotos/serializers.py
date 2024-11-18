from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Votos

class votoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Votos
        fields = ['escultura', 'estrellas', 'id_votante']