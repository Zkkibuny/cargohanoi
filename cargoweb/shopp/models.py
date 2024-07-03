from django.db import models
from django.utils.text import slugify
from unidecode import unidecode


# Model for Category
class Category(models.Model):

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.name).replace(' ', '-'))
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name

class Size(models.Model):
    value = models.IntegerField(unique=True)

    def __str__(self):
        return str(self.value)

class Product(models.Model):
    name = models.CharField(max_length=100)
    categories = models.ManyToManyField(Category, related_name='products')
    size = models.ManyToManyField(Size, related_name='sizes')
    price = models.DecimalField(max_digits=10, decimal_places=0)
    sale_price = models.DecimalField(max_digits=10, decimal_places=0,null=True,blank=True)
    

    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)  # Save to get an ID
        if not self.slug:
            self.slug = slugify(unidecode(self.name).replace(' ', '-'))+"_"+str(self.id)
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.name} - {self.images.count()} images"

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/products/')

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.image:
            self.delete()


# Model for Order
from django.db import models

class Order(models.Model):
    customer_name = models.CharField(max_length=255)
    customer_mobile = models.CharField(max_length=20,null=True)
    customer_address = models.CharField(max_length=255,null=True)
    description = models.TextField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.customer_name}"

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name='details', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_details', on_delete=models.CASCADE,null=True)
    size = models.IntegerField(null=True)
    quantity = models.IntegerField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True)

    def __str__(self):
        return f"OrderDetail {self.id} - Product {self.product}"
