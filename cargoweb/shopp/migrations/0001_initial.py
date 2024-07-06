# Generated by Django 4.0.10 on 2024-07-06 12:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(blank=True, max_length=100, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=255)),
                ('customer_mobile', models.CharField(max_length=20, null=True)),
                ('customer_address', models.CharField(max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('code', models.CharField(max_length=30, null=True)),
                ('price', models.DecimalField(decimal_places=0, max_digits=10)),
                ('sale_price', models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True)),
                ('slug', models.SlugField(blank=True, max_length=100, null=True, unique=True)),
                ('categories', models.ManyToManyField(related_name='products', to='shopp.category')),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductSizeColor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('color', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopp.color')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopp.product')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shopp.size')),
            ],
            options={
                'unique_together': {('product', 'size', 'color')},
            },
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/products/')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='shopp.product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='colors',
            field=models.ManyToManyField(through='shopp.ProductSizeColor', to='shopp.color'),
        ),
        migrations.AddField(
            model_name='product',
            name='sizes',
            field=models.ManyToManyField(through='shopp.ProductSizeColor', to='shopp.size'),
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.IntegerField(null=True)),
                ('quantity', models.IntegerField(null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='details', to='shopp.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_details', to='shopp.product')),
            ],
        ),
    ]
