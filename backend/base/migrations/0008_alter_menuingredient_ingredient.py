# Generated by Django 4.2.1 on 2023-06-17 08:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_menuingredient_unique_together_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menuingredient',
            name='ingredient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.ingredient'),
        ),
    ]