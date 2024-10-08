from django.shortcuts import render
import datetime

def saludos(request):
    fecha = datetime.datetime.now()
    return render(request, 'plantillasaludo.html', {'fechahoy': fecha})
