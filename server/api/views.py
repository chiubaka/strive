from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from api.models import Task
from api.serializers import TaskSerializer

@csrf_exempt
def task_list(request):
  if request.method == "GET":
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return JsonResponse(serializer.data, safe=False)

  elif request.method == "POST":
    data = JSONParser().parse(request)
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def task_detail(request, pk):
  try:
    task = Task.objects.get(pk=pk)
  except Task.DoesNotExist:
    return HttpResponse(status=404)

  if request.method == "GET":
    serializer = TaskSerializer(task)
    return JsonResponse(serializer.data)

  elif request.method == "PUT":
    data = JSONParser().parse(request)
    serializer = TaskSerializer(task, data=data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=400)

  elif request.method == "DELETE":
    task.delete()
    return HttpResponse(status=204)
