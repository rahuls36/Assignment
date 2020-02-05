from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length= 120)
    description = models.CharField(max_length= 1024)
    duration = models.CharField(max_length= 120)
    avatar = models.ImageField(blank=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    name = models.CharField(max_length= 120)
    description = models.CharField(max_length= 1024)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    project = models.ForeignKey(Project, on_delete= models.CASCADE, related_name= 'tasks')

    def __str__(self):
        return self.name

