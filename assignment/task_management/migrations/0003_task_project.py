# Generated by Django 3.0.2 on 2020-01-29 13:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task_management', '0002_task'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='Project',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='task_management.Project'),
            preserve_default=False,
        ),
    ]
