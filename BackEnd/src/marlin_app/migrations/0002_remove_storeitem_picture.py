# Generated by Django 5.1 on 2024-10-15 01:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marlin_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storeitem',
            name='picture',
        ),
    ]
