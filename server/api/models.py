from django.db import models

# Create your models here.
class Task(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  name = models.CharField(max_length=100, blank=False)
  completed = models.BooleanField(default=False)
  important = models.BooleanField(default=False)
