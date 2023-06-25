# Generated by Django 4.2.1 on 2023-06-22 08:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_ingredient_countinstock_financial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='financial',
            name='profit',
        ),
        migrations.AlterField(
            model_name='financial',
            name='adminCost',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=7, null=True),
        ),
    ]