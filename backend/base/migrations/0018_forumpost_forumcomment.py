# Generated by Django 4.2.1 on 2023-07-17 08:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0017_merge_20230717_1313'),
    ]

    operations = [
        migrations.CreateModel(
            name='ForumPost',
            fields=[
                ('title', models.CharField(max_length=200, null=True)),
                ('message', models.CharField(max_length=200, null=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ForumComment',
            fields=[
                ('message', models.CharField(max_length=200, null=True)),
                ('date', models.DateField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.forumpost')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
