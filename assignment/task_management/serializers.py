from rest_framework import serializers
from .models import Project,Task

class TaskSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()

    class Meta:
        model = Task
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(max_length=None, allow_empty_file=True, allow_null=True, required=False)
    tasks = TaskSerializer(many = True, read_only= True)
    class Meta:
        model = Project
        fields = '__all__'

    '''
    name = serializers.CharField(max_length= 120)
    description = serializers.CharField(max_length=1024)
    duration = serializers.DurationField()
    avatar = serializers.ImageField()
    '''

