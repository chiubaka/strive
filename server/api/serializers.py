from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = ("id", "name", "completed", "important")
