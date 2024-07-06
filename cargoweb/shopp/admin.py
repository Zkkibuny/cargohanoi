from django.contrib import admin
from .models import Category, Product, ProductImage, Order, OrderDetail, Size, Color, ProductSizeColor


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductSizeColorInline(admin.TabularInline):
    model = ProductSizeColor
    extra = 1
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline,ProductSizeColorInline]

class OrderDetailInline(admin.TabularInline):
    model = OrderDetail
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderDetailInline]

admin.site.register(Category)
admin.site.register(Size)
admin.site.register(Color)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
