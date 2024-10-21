

from rest_framework import serializers
from .models import Escultor, Escultura, MediaFile

class EscultorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = ['DNI_Esc', 'id', 'Nacionalidad', 'nombre', 'apellido', 'Fecha_Nac', 'Biografia', 'telefono']


class EscultorRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = ['DNI_Esc', 'Nacionalidad', 'nombre', 'apellido', 'Fecha_Nac', 'Biografia', 'telefono']


    def get_dni(self):
        dni_esc = self.validated_data.get('DNI_Esc')
        return dni_esc

class EsculturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultura
        fields = ['ID_Escultura', 'id', 'Fecha_creacion', 'Titulo', 'Intencion', 'Cant_votos', 'Tematica']


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ['ID_Media', 'File_Path', 'File_Type', 'Escultura_ID', 'Evento_ID']

