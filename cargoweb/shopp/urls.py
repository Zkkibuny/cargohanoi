from django.urls import path
from django.views.generic import RedirectView, TemplateView

from . import views

urlpatterns = [
    path('', views.product_list, name='product_list'),
    # path('category/<int:category_id>/', views.product_list, name='product_list_by_category'),
    path('product/<slug:slug>/', views.product_detail, name='product_detail'),
    path('category/<slug:slug>/', views.product_list_by_category, name='product_list_by_category'),
    path('category/sales/<str:value>', views.product_sale, name='product_sale'),

    path('search/', views.search_products, name='search_products'),

    path('cart/', TemplateView.as_view(template_name='shopp/cart.html'), name='cart'),
    path('check_inventory/', views.check_inventory, name='check_inventory'),
    path('cart/add/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/', views.update_cart, name='update_cart'),
    path('cart/remove/', views.remove_from_cart, name='remove_from_cart'),
    path('cart/checkout/', TemplateView.as_view(template_name='shopp/checkout.html'), name='checkout'),

    path('order/save/', views.save_order, name='save_order'),

    path('success/', views.order_success, name='success'),
]
