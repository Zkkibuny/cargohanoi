# Generated by Django 4.0.10 on 2024-07-06 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopp', '0007_alter_productsizecolor_quantity_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsizecolor',
            name='quantity_available',
            field=models.IntegerField(default=0),
        ),
    ]
