from django.conf.urls import url
from api import views

urlpatterns = [
  url(r"^tasks/$", views.task_list),
  url(r"^tasks/(?P<pk>[0-9]+)/$", views.task_detail),
]
