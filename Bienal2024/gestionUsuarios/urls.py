from django.urls import path
from .views import ProfileView, RegisterView, LoginView

urlpatterns = [
    #path('register/', RegisterView.as_view(), name="register"),  # Registro de usuario (si aplica)
    path('login/', LoginView.as_view(), name="login"),          # Inicio de sesión usando Auth0
    path('profile/', ProfileView.as_view(), name="profile"),    # Perfil del usuario autenticado
]
