from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=70)
    tasks = []
    
    def __str__(self):
        return self.username
    
class Task(models.Model):
    description = models.CharField(max_length=255)
    name = models.CharField(max_length=70)
    size = models.CharField(max_length=70)
    
    def __str__(self):
        return self.description