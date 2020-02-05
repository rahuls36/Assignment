from .serializers import ProjectSerializer, TaskSerializer
from .models import Project, Task
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

class ProjectView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        if kwargs.get('project_id'):
            post = Project.objects.get(pk=kwargs.get('project_id'))
            serializer = ProjectSerializer(post)
        else:
            posts = Project.objects.all()
            serializer = ProjectSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = ProjectSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, project_id):
        project = Project.objects.get(pk= project_id)
        serializer = ProjectSerializer(project, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,project_id):
        project = Project.objects.get(pk = int(project_id))
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskView(APIView):

    def get(self, request, *args, **kwargs):
        project = Project.objects.get(pk=kwargs.get('project_id'))
        if kwargs.get('project_id') and kwargs.get('task_id') != None:
            task = project.tasks.all()[kwargs.get('task_id') - 1]
            serializer = TaskSerializer(task)

        else:
            tasks = project.tasks.all()
            serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        tasks_serializer = TaskSerializer(data=request.data)
        if tasks_serializer.is_valid():
            tasks_serializer.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(tasks_serializer.data, status=status.HTTP_201_CREATED)

    def delete(self,request,project_id,task_id):
        task = Task.objects.get(pk = int(task_id))
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, project_id, task_id):
        task = Task.objects.get(pk= task_id)
        serializer = TaskSerializer(task, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)