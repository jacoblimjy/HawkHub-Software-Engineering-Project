# Generated by Django 4.2.1 on 2023-06-22 06:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0010_merge_20230621_2203'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='countInStock',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
        migrations.CreateModel(
            name='Financial',
            fields=[
                ('date', models.DateField(blank=True, null=True)),
                ('revenue', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('cost', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('adminCost', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('profit', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'date')},
            },
        ),
    ]
