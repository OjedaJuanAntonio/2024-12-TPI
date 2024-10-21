from django.urls import path
from .views import logout, profile
urlpatterns = [ 
    # path('reg/', register, name="registro"),
    path('pro/', profile, name='profile'),
    path('out/', logout, name='logout'),
]