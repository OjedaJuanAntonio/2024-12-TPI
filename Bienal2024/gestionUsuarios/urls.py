from django.urls import path
from .views import logout, profile
urlpatterns = [ 
    # path('reg/', register, name="registro"),
    path('profile/', profile, name='profile'),
    path('logout/', logout, name='logout'),
]