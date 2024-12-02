from rest_framework import serializers

class UsuarioSerializer(serializers.Serializer):
    """
    Serializer para validar y manejar los datos de un usuario autenticado desde Auth0.
    """
    sub = serializers.CharField(max_length=255)  
    name = serializers.CharField(max_length=255) 
    email = serializers.EmailField(max_length=255)
    picture = serializers.URLField()  
    nickname = serializers.CharField(max_length=100, required=False, allow_blank=True)  
    family_name = serializers.CharField(max_length=255, required=False, allow_blank=True)
    given_name = serializers.CharField(max_length=255, required=False, allow_blank=True)  
    type_user = serializers.CharField(
        max_length=255, 
        default='normal', 
        required=False
    )


#capaz que se tenga que agregar los cambos que faltan con requiered=false