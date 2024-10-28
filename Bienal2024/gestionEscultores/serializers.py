

from rest_framework import serializers
from .models import Escultor, Escultura, MediaFile
from gestionVotos.models import Voto

class EscultorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = ['id', 'DNI_Esc', 'id', 'Nacionalidad', 'nombre', 'apellido', 'Fecha_Nac', 'Biografia', 'telefono']


class EscultorRegSerializer(serializers.ModelSerializer):
    class Meta:
        model = Escultor
        fields = ['DNI_Esc', 'Nacionalidad', 'nombre', 'apellido', 'Fecha_Nac', 'Biografia', 'telefono']


    def get_dni(self):
        dni_esc = self.validated_data.get('DNI_Esc')
        return dni_esc


from rest_framework import serializers
from .models import Escultura

class EsculturaSerializer(serializers.ModelSerializer):
    escultor_nombre = serializers.CharField(source='id.nombre', read_only=True)  # Asumiendo que `id` es el escultor
    ranking = serializers.SerializerMethodField()

    class Meta:
        model = Escultura
        fields = ['ID_Escultura', 'Titulo', 'Intencion', 'Tematica', 'escultor_nombre', 'ranking']  # Ajusta según tus necesidades

    def get_ranking(self, obj):
        votos = obj.voto_set.all()  # Accede a los votos relacionados con la escultura
        if votos.exists():
            promedio = sum([voto.estrellas for voto in votos]) / votos.count()
            return round(promedio, 2)  # Ajusta el redondeo si es necesario
        return 0  # Si no hay votos, devuelve 0 o None




# class EsculturaSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Escultura
#         fields = ['ID_Escultura', 'id', 'Fecha_creacion', 'Titulo', 'Intencion', 'Cant_votos', 'Tematica']


class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = ['ID_Media', 'File_Path', 'File_Type', 'Escultura_ID', 'Evento_ID']
