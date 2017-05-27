from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, permissions
from api.models import Task
from api.permissions import IsOwner
from api.serializers import TaskSerializer, UserSerializer

class TaskList(generics.ListCreateAPIView):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer
  permission_classes = (permissions.IsAuthenticated, IsOwner,)

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Task.objects.all()
  serializer_class = TaskSerializer
  permission_classes = (permissions.IsAuthenticated, IsOwner,)

class UserDetail(generics.RetrieveAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
