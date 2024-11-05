from django.urls import path
from .views import logout, profile, login, register


urlpatterns = [ 
    path('register/', register, name="registro"),
    path('login/', login, name="login"),
    path('profile/', profile, name='profile'),
    path('logout/', logout, name='logout'),
]