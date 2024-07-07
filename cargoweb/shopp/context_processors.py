
from .models import Product, Size, Color, Category  # Import your model if needed

def cart_data(request):
    # Lấy dữ liệu từ view hoặc session, ví dụ:
    cart = request.session.get('cart', {})
    detailed_cart = []  # Chuẩn bị dữ liệu cho giỏ hàng chi tiết
    total_price = 0
    total_quantity = 0

    for cart_key, item in cart.items():
        product_id = item.get('product_id')
        if product_id:
            product = Product.objects.get(id=product_id)  # Lấy sản phẩm từ ID
            total_quantity += item['quantity']
            # Xử lý dữ liệu sản phẩm và giỏ hàng ở đây
            # Ví dụ:
            image_url = product.images.first().image.url if product.images.exists() else ''
            price = product.sale_price if product.sale_price else product.price
            color = Color.objects.get(id=item.get('color'))
            size = Size.objects.get(id=item.get('size'))
            total_price += price * item['quantity']
            detailed_cart.append({
                'cart_key': cart_key,
                'image_url': image_url,
                'product_id': item['product_id'],
                'slug': product.slug,
                'name': product.name,
                'price': price,
                'total_price_item': price*item['quantity'],
                'color': color.value,
                'size': size.value,
                'quantity': item['quantity'],
            })

    return {
        'cart': detailed_cart,
        'total_price': total_price,
        'total_quantity':total_quantity,
    }

def category_data(request):
    # Lấy tất cả các danh mục, sắp xếp theo trường 'ordering'
    categories = Category.objects.all().order_by('ordering').values('slug', 'name')
    categories_list = list(categories)  # Chuyển đổi QuerySet thành danh sách

    return {
        'categories': categories_list
    }