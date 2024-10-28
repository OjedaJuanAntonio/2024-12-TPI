from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Voto

class votoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voto
        fields = ['escultura', 'estrellas', 'id_votante']