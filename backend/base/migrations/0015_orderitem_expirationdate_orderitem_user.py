# Generated by Django 4.2.1 on 2023-07-08 05:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("base", "0014_alter_product_expirationdate"),
    ]

    operations = [
        migrations.AddField(
            model_name="orderitem",
            name="expirationDate",
            field=models.DateField(blank=True, default="2023-12-12", null=True),
        ),
        migrations.AddField(
            model_name="orderitem",
            name="user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
