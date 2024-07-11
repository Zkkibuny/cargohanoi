from django.db import models
from django.utils.text import slugify
from unidecode import unidecode


# Model for Category
class Category(models.Model):

    name = models.CharField(max_length=100)
    ordering = models.IntegerField( default=0)

    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)

    class Meta:
        verbose_name = verbose_name_plural = "danh mục"
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.name).replace(' ', '-'))
        super().save(*args, **kwargs)
    def __str__(self):
        return self.name

class Size(models.Model):
    value = models.CharField(max_length=20, null=True)
    ordering = models.IntegerField( default=0)
    def __str__(self):
        return f"{self.value} - {self.ordering}"

    class Meta:
        verbose_name =  verbose_name_plural = "kích cỡ"
class Color(models.Model):
    value = models.CharField(max_length=20, null=True)
    ordering = models.IntegerField( default=0)
    def __str__(self):
        return f"{self.value} -  {self.ordering}"

    class Meta:
        verbose_name = verbose_name_plural = "Màu"
class Product(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=30,null=True)
    categories = models.ManyToManyField(Category, related_name='products')
    sizes = models.ManyToManyField(Size, through='ProductSizeColor')
    colors = models.ManyToManyField(Color, through='ProductSizeColor')
    price = models.DecimalField(max_digits=10, decimal_places=0)
    sale_price = models.DecimalField(max_digits=10, decimal_places=0,null=True,blank=True)

    slug = models.SlugField(max_length=100, unique=True, blank=True, null=True)

    class Meta:
        verbose_name =  verbose_name_plural = "sản phẩm"

    def save(self, *args, **kwargs):
        if not self.id:
            super().save(*args, **kwargs)  # Save to get an ID
        if not self.slug:
            self.slug = slugify(unidecode(self.name).replace(' ', '-'))+"_"+str(self.id)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} - {self.images.count()} images"

class ProductSizeColor(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    class Meta:
        verbose_name = verbose_name_plural = "số lượng theo màu săc và kích cỡ"
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.product :
            self.delete()
    class Meta:
        unique_together = ('product', 'size', 'color')

    def __str__(self):
        return f"{self.product.name} - {self.size.value} - {self.color.value}: {self.quantity}"
class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/products/')

    class Meta:
        verbose_name_plural = verbose_name = "Hình ảnh sản phẩm"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.image:
            self.delete()


# Model for Order

class Order(models.Model):
    STATUS_CHOICES = [
        (0, 'Đặt hàng'),
        (1, 'Xác nhận'),
    ]
    customer_name = models.CharField(max_length=255)
    customer_mobile = models.CharField(max_length=20,null=True)
    customer_address = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = verbose_name = "đơn hàng"
    def __str__(self):
        return f"Order {self.id} - {self.customer_name} - {self.total_price}- {self.status}"

    def delete(self, *args, **kwargs):
        order_details = OrderDetail.objects.filter(order=self)
        for detail in order_details:
            product_size_color = ProductSizeColor.objects.get(
                product=detail.product,
                size=detail.size,
                color=detail.color
            )
            product_size_color.quantity += detail.quantity
            product_size_color.save()

        super(Order, self).delete(*args, **kwargs)

class OrderDetail(models.Model):
    order = models.ForeignKey(Order, related_name='details', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_details', on_delete=models.CASCADE,null=True)
    size = models.ForeignKey(Size, on_delete=models.CASCADE,null=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE,null=True)
    quantity = models.IntegerField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2,null=True)

    class Meta:
        verbose_name_plural = verbose_name = "chi tiết đơn hàng"
    def __str__(self):
        return f"OrderDetail {self.id} - Product {self.product}- Color {self.color.value}- Size {self.size.value}"

    def save(self, *args, **kwargs):
        if self.pk:
            # Nếu OrderDetail đã tồn tại, tính toán sự thay đổi về số lượng
            old_detail = OrderDetail.objects.get(pk=self.pk)
            quantity_change = self.quantity - old_detail.quantity
        else:
            # Nếu OrderDetail mới được tạo, toàn bộ số lượng là sự thay đổi
            quantity_change = self.quantity

        # Cập nhật số lượng trong ProductSizeColor
        product_size_color = ProductSizeColor.objects.get(
            product=self.product,
            size=self.size,
            color=self.color
        )
        product_size_color.quantity -= quantity_change
        product_size_color.save()
        super(OrderDetail, self).save(*args, **kwargs)

        # Cập nhật tổng giá trị đơn hàng
        self.order.total_price += quantity_change * self.price
        self.order.save()
    def delete(self, *args, **kwargs):
        product_size_color = ProductSizeColor.objects.get(
            product=self.product,
            size=self.size,
            color=self.color
        )
        product_size_color.quantity += self.quantity
        product_size_color.save()
        self.order.total_price -= self.quantity * self.price
        self.order.save()

        super(OrderDetail, self).delete(*args, **kwargs)