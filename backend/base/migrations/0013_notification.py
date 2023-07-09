# Generated by Django 4.2.1 on 2023-07-07 15:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0012_remove_financial_profit_alter_financial_admincost'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('subject', models.CharField(max_length=200, null=True)),
                ('message', models.CharField(max_length=200, null=True)),
                ('isRead', models.BooleanField(default=False)),
                ('date', models.DateField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'date', 'subject', 'message')},
            },
        ),
    ]
