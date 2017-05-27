from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source="owner.username")

  class Meta:
    model = Task
    fields = ("id", "name", "completed", "important", "owner")

class UserSerializer(serializers.ModelSerializer):
  tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

  class Meta:
    model = User
    fields = ("id", "username", "tasks")
