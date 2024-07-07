from django.contrib import admin
from .models import Category, Product, ProductImage, Order, OrderDetail, Size, Color, ProductSizeColor


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class ProductSizeColorInline(admin.TabularInline):
    model = ProductSizeColor
    extra = 1
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name','code', 'price', 'sale_price', )
    list_filter  = ('id', 'name','code', 'price', 'sale_price', )
    ordering = ('name','code',)
    search_fields = ('name','code',)
    inlines = [ProductImageInline,ProductSizeColorInline]

admin.site.register(Product, ProductAdmin)

class OrderDetailInline(admin.TabularInline):
    model = OrderDetail
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'total_price', 'status', 'created_at')
    list_filter = ('id', 'customer_name', 'total_price', 'status', 'created_at')
    ordering = ('-created_at',)
    search_fields = ('customer_name',)
    inlines = [OrderDetailInline]

admin.site.register(Order, OrderAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'ordering')
    ordering = ('ordering',)

admin.site.register(Category,CategoryAdmin)

class SizeAdmin(admin.ModelAdmin):
    list_display = ('id', 'value', 'ordering')
    ordering = ('ordering',)

admin.site.register(Size,SizeAdmin)

class ColorAdmin(admin.ModelAdmin):
    list_display = ('id', 'value', 'ordering')
    ordering = ('ordering',)

admin.site.register(Color,ColorAdmin)


