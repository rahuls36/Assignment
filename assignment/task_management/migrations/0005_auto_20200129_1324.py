# Generated by Django 3.0.2 on 2020-01-29 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_management', '0004_auto_20200129_1301'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='avatar',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]