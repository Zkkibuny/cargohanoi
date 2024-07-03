from django import template
from django.shortcuts import get_object_or_404
from ..models import Product

register = template.Library()

@register.inclusion_tag('shopp/checkout.html', takes_context=True)
def show_cart(context):
    request = context['request']
    cart = request.session.get('cart', {})
    detailed_cart = []
    total_price = 0

    for cart_key, item in cart.items():
        product_id = item.get('product_id')
        if product_id:
            product = get_object_or_404(Product, id=product_id)
            image_url = product.images.first().image.url if product.images.exists() else ''
            total_price += product.price * item['quantity']
            detailed_cart.append({
                'image_url': image_url,
                'product_id': item['product_id'],
                'slug': product.slug,
                'name': product.name,
                'price': product.price,
                'size': item['size'],
                'quantity': item['quantity'],
                'total': product.price * item['quantity']
            })

    return {'cart': detailed_cart, 'total_price': total_price}
