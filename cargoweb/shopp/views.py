# views.py
from django.db.models import Q, F, FloatField
from django.db.models.functions import Cast
from django.http import JsonResponse, HttpResponse, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.http import require_POST

from .forms import OrderForm
from .models import Product, Order, OrderDetail, Category, Size


def product_list(request):
    categories = Category.objects.prefetch_related('products').all()
    context = {
        'categories': categories
    }
    return render(request, 'shopp/index.html', context)

def product_list_by_category(request, slug):
    category = get_object_or_404(Category, slug=slug)
    products = category.products.all()
    return render(request, 'shopp/product_list_by_category.html', {'category_name': 'SHOP '+category.name, 'products': products})
def search_products(request):
    query = request.GET.get('q')  # Lấy từ khóa tìm kiếm từ query parameters
    if query:
        products = Product.objects.filter(name__icontains=query)  # Tìm kiếm sản phẩm theo tên
    else:
        products = Product.objects.all()  # Nếu không có từ khóa tìm kiếm, trả về tất cả sản phẩm
    return render(request, 'shopp/product_list_by_category.html', {'category_name':'Sản phẩm theo tìm kiếm','products': products})

def product_sale(request, value):
    try:
        if '.' in value:
            # Xử lý tỷ lệ giảm giá (giá trị kiểu 0.5)
            discount_ratio = float(value)
            if not (0 < discount_ratio < 1):
                raise Http404("Tỷ lệ giảm giá không hợp lệ")

            # Tìm sản phẩm có tỷ lệ giảm giá tương ứng
            products = Product.objects.filter(sale_price__gt=discount_ratio * F('price'))
            if not products:
                return render(request, 'shopp/404.html')

            category_name = f"Giảm giá {int((1 - discount_ratio) * 100)}%"
            return render(request, 'shopp/product_list_by_category.html', {
                'products': products,
                'category_name': category_name
            })

        else:
            # Xử lý giá gốc (giá trị kiểu 1000000)
            price = float(value)
            products = Product.objects.filter(
                Q(sale_price__lte=price, sale_price__gt=0) | Q(sale_price__isnull=True, price__lte=price)
            )
            if not products:
                return render(request, 'shopp/404.html')

            category_name = f"Sản phẩm dưới {int(price):,}đ"
            return render(request, 'shopp/product_list_by_category.html', {
                'products': products,
                'category_name': category_name
            })

    except ValueError:
        raise Http404("Giá trị không hợp lệ")
#
# def product_sale(request, value):
#     try:
#         if '.' in value:
#             # Xử lý tỷ lệ giảm giá (giá trị kiểu 0.5)
#             discount_ratio = float(value) # 0.3
#             if not (0 < discount_ratio < 1):
#                 raise Http404("Tỷ lệ giảm giá không hợp lệ")
#
#             # Tìm sản phẩm có tỷ lệ giảm giá tương ứng
#             products = Product.objects.filter(sale_price__gt=discount_ratio * F('price'))
#             if not products:
#                 return render(request, 'shopp/404.html')
#
#             category_name = f"Giảm giá {int((1 - discount_ratio) * 100)}%"
#             return render(request, 'shopp/product_list_by_category.html', {
#                 'products': products,
#                 'category_name': category_name
#             })
#
#         else:
#             # Xử lý giá gốc (giá trị kiểu 1000000)
#             price = float(value)
#             products = Product.objects.filter(
#                 Q(sale_price__lte=price, sale_price__gt=0) | Q(sale_price__isnull=True, price__lte=price)
#             )
#             if not products:
#                 return render(request, 'shopp/404.html')
#
#             category_name = f"Sản phẩm dưới {int(price):,}đ"
#             return render(request, 'shopp/product_list_by_category.html', {
#                 'products': products,
#                 'category_name': category_name
#             })
#
#     except ValueError:
#         raise Http404("Giá trị không hợp lệ")
def product_detail(request, slug):
    product = get_object_or_404(Product, slug=slug)
    sizes = product.size.all()
    categories = product.categories.all()
    related_products = Product.objects.filter(categories__in=categories).exclude(id=product.id).distinct()

    context = {
        'product': product,
        'sizes': sizes,
        'categories': categories,
        'related_products': related_products,
    }

    return render(request, 'shopp/product_detail.html', context)
@require_POST
def add_to_cart(request):
    product_id = request.POST.get('product_id')
    size = request.POST.get('size')
    quantity = int(request.POST.get('quantity'))

    if product_id and size:
        cart = request.session.get('cart', {})
        cart_key = f"{product_id}_{size}"

        if cart_key in cart:
            cart[cart_key]['quantity'] += quantity
        else:
            cart[cart_key] = {
                'product_id': product_id,
                'size': size,
                'quantity': quantity,
            }

        request.session['cart'] = cart

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid product_id or size'})
@require_POST
def update_cart(request):
    cart_key = request.POST.get('cart_key')
    quantity = int(request.POST.get('quantity', 0))
    cart = request.session.get('cart', {})

    if cart_key in cart:
        # Update the quantity in the cart
        cart[cart_key]['quantity'] = quantity
        request.session['cart'] = cart

        # Calculate total price or perform any other necessary updates

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Product not in cart'})
@require_POST
def remove_from_cart(request):
    cart = request.session.get('cart', {})
    cart_key = request.POST.get('cart_key')

    if cart_key in cart:
        del cart[cart_key]
        request.session['cart'] = cart
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False, 'error': 'Product not in cart'})

def checkout(request):
    if request.method == 'POST':
        order_form = OrderForm(request.POST)
        if order_form.is_valid():
            # Save Order
            order = order_form.save()

            # Retrieve cart from session
            cart = request.session.get('cart', {})
            for cart_key, item in cart.items():
                # Fetch product details
                product = Product.objects.get(pk=item['product_id'])
                price = product.price  # Assume price is fetched from the Product model

                OrderDetail.objects.create(
                    order=order,
                    product_id=product,
                    quantity=item['quantity'],
                    price=price
                )

            # Clear the cart after saving the order
            request.session['cart'] = {}

            return redirect('order_success')  # Redirect to a success page or order details page
    else:
        # Initialize an empty OrderForm if the request method is GET
        order_form = OrderForm(initial={
            'total_price': request.session.get('total_price', 0)
        })

    return render(request, 'shopp/checkout.html', {'form': order_form})



@require_POST
def save_order(request):
    customer_name = request.POST.get('customer_name')
    customer_mobile = request.POST.get('customer_mobile')
    customer_address = request.POST.get('customer_address')
    description = request.POST.get('description')
    total_price = request.POST.get('total_price')

    try:
        order = Order.objects.create(
            customer_name=customer_name,
            customer_mobile=customer_mobile,
            customer_address=customer_address,
            description=description,
            total_price=0
        )
        # Lấy chi tiết đơn hàng từ session cart
        cart = request.session.get('cart', {})

        total_price = 0

        for cart_key, cart_item in cart.items():
            product_id = cart_item.get('product_id')
            quantity = cart_item.get('quantity')
            size = cart_item.get('size')  # If you need to store the size in OrderDetail, you should add a size field

            # Tìm product instance
            product = Product.objects.get(id=product_id)
            price = product.sale_price if product.sale_price else product.price
            item_total = price * quantity
            total_price += item_total

            # Tạo OrderDetail instance
            order_detail = OrderDetail(
                order=order,
                product=product,
                size=size,
                quantity=quantity,
                price=price
            )
            order_detail.save()

        # Cập nhật tổng giá trị đơn hàng
        order.total_price = total_price
        order.save()

        # Xóa cart sau khi lưu đơn hàng
        request.session['cart'] = {}
        response_data = {
            'code': 1,
            'redirect': '/success/',  # URL để chuyển hướng nếu cần
        }
    except Exception as e:
        response_data = {
            'code': 0,
            'messages': [str(e)],
        }

    return JsonResponse(response_data)

def order_success(request):
    return render(request, 'shopp/order_success.html')


def custom_404_view(request, exception):
    return render(request, 'shopp/404.html', status=404)

def custom_500_view(request):
    return render(request, 'shopp/500.html', status=500)