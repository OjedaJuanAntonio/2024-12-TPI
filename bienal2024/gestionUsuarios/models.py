from django.db import models

class Usuario(models.Model):
   
    sub = models.CharField(max_length=255, unique=True) 
    name = models.CharField(max_length=255) 
    email = models.EmailField(max_length=255, unique=True)  
    picture = models.URLField()  
    nickname = models.CharField(max_length=100, null=True, blank=True) 
    family_name = models.CharField(max_length=255, null=True, blank=True)
    given_name = models.CharField(max_length=255, null=True, blank=True) 

    def __str__(self):
        return self.name
