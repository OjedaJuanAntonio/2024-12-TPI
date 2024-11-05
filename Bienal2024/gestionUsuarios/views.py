#Herramientas de Rest_framework
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, Token


from django.shortcuts import render, get_object_or_404
from django.contrib.auth import logout as django_logout
from django.http import HttpResponseRedirect
from decouple import config
import json
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView


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
def register(request):
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    user= get_object_or_404(User, username=request.data['username'])

    if not user.check_password(request.data['password']):
        return Response({"error": "contraseña incorrecta"},status=status.HTTP_400_BAD_REQUEST)
    token, created= Token.objects.get_or_create(user=user)

    serializer= UserSerializer(instance= user)
    return Response({'token': token.key, "user":serializer.data}, status=status.HTTP_200_OK)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    return Response("estas logueado con {}".format(request.user.username), status=status.HTTP_200_OK)   
