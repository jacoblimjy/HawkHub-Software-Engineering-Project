# Generated by Django 4.2.1 on 2023-06-12 16:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="userprofile",
            name="isAdmin",
        ),
    ]
