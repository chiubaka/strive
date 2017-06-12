from django.conf.urls import include, url
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [
  url(r"^tasks/$", views.TaskList.as_view()),
  url(r"^tasks/(?P<pk>[0-9]+)/$", views.TaskDetail.as_view()),
  url(r"^users/(?P<pk>[0-9]+)/$", views.UserDetail.as_view()),
  url(r"^api-auth/", include("rest_framework.urls", namespace="rest_framework")),
  url(r"^auth/", include("rest_framework_social_oauth2.urls")),
]

urlpatterns = format_suffix_patterns(urlpatterns)
