from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from api.models import Task
from api.serializers import TaskSerializer

class TaskList(generics.ListCreateAPIView):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer
