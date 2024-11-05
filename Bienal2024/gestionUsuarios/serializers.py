from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

# class AdminSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Administrador
#         fields = ['dni', 'username', 'telefono', 'email', 'password']