from django.urls import path
from . import views

urlpatterns = [
    path('projects/', views.ProjectView.as_view(), name= 'project_lists'),
    path('projects/<int:project_id>', views.ProjectView.as_view(), name= 'project_list'),
    path('projects/<int:project_id>/task/', views.TaskView.as_view(), name= 'tasks_list'),
    path('projects/<int:project_id>/task/<int:task_id>', views.TaskView.as_view(), name= 'task_list'),
]


