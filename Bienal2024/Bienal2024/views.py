from django.shortcuts import render
import datetime

def home(request):
    fecha = datetime.datetime.now()
    return render(request, 'home.html', {'fechahoy': fecha})

def logIn(request):
    return render(request,'logIn.html',)
    
