from django.contrib.postgres.fields import ArrayField
from django.db import models

# Create your models here.
def default_task():
    return [{ "description":"a", "name":"b", "size":"c", "creationDate": 0 }]

class User(models.Model):
    username = models.CharField(max_length=70)
    password = models.CharField(max_length=255)
    tasks = models.JSONField("tasks", default=default_task)
    totalNumTasks = models.BigIntegerField()
    longestLivingTask = models.JSONField("lltask", default=default_task)
    longestLivingTaskTime = models.BigIntegerField()

    
    def __str__(self):
        return self.username
    
class Task(models.Model):
    description = models.CharField(max_length=255)
    name = models.CharField(max_length=70)
    size = models.CharField(max_length=70)
    creationDate = models.BigIntegerField()
    
    def __str__(self):
        return self.description
    
