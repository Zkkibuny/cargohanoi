# Generated by Django 4.0.10 on 2024-06-20 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shopp', '0006_alter_category_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='slug',
            field=models.SlugField(blank=True, max_length=200, null=True, unique=True),
        ),
    ]