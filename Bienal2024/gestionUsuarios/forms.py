from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

# Utiliza tu modelo de usuario personalizado
User = get_user_model()
    

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')  # Puedes agregar más campos si lo deseas

    # Personalización de widgets o validaciones adicionales, si es necesario
    def __init__(self, *args, **kwargs):
        super(CustomUserCreationForm, self).__init__(*args, **kwargs)
        for fieldname in ['username', 'password1', 'password2']:
            self.fields[fieldname].help_text = None  # Elimina los textos de ayuda por defecto
