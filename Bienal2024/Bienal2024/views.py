from django.shortcuts import render
import datetime

def home(request):
    fecha = datetime.datetime.now()
    return render(request, 'home.html',{'fechahoy': fecha})

def register_view(request):
    return render(request, 'register.html')

