# Generated by Django 5.2.3 on 2025-06-22 19:46

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_user_tasks'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='creationDate',
            field=models.TimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
