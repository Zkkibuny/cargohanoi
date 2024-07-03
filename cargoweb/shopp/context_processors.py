from .models import Product  # Import your model if needed

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
            total_price += price * item['quantity']
            detailed_cart.append({
                'cart_key': cart_key,
                'image_url': image_url,
                'product_id': item['product_id'],
                'slug': product.slug,
                'name': product.name,
                'price': price,
                'total_price_item': price*item['quantity'],
                'size': item['size'],
                'quantity': item['quantity'],
            })

    return {
        'cart': detailed_cart,
        'total_price': total_price,
        'total_quantity':total_quantity,
    }
