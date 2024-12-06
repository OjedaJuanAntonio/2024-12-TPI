from django.shortcuts import render
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import datetime

@csrf_exempt
def verif(request):
    data = json.loads(request.body)
    type_user = data.get("type_user")
    is_superuser = type_user == 'superuser' 
    return JsonResponse(
        {"is_superuser": is_superuser},
        status=status.HTTP_200_OK
    )



