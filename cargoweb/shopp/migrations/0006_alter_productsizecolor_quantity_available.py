# Generated by Django 4.0.10 on 2024-07-06 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopp', '0005_alter_color_ordering_alter_size_ordering'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productsizecolor',
            name='quantity_available',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
