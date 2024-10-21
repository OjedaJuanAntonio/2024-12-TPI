#Herramientas de Rest_framework
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from django.shortcuts import render
from django.contrib.auth import logout as django_logout
from django.http import HttpResponseRedirect
from decouple import config
import json



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def perfil(request):
    user=request.user

    auth0_user = user.social_auth.get(provider= 'auth0')
    user_data={
        'user_id':auth0_user.uid,
        'name': user.first_name,
        'picture': auth0_user.extra_data['picture']
    }
    
    context = {
        'user_data': json.dumps(user_data, indent=4),
        'auth0': auth0_user
    }
    return render(request, 'profile.html',context)


def logout(request):
    django_logout(request)

    domain=config('AUTH0_DOMAIN')
    client_id=config('AUTH0_CLIENT_ID')
    return_to='http://localhost:8000/'

    return HttpResponseRedirect(f"https://{domain}/v2/logout?client_id={client_id}&returnTo={return_to}")

#Herramientas django
from django.shortcuts import render, redirect


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response("estas logueado con {}".format(request.user.username), status=status.HTTP_200_OK)   
