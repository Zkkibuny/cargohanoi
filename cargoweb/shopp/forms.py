# forms.py
from django import forms
from .models import Order, OrderDetail

from django import forms
from .models import Order

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ['customer_name', 'customer_mobile', 'customer_address', 'description', 'total_price']

class OrderDetailForm(forms.ModelForm):
    class Meta:
        model = OrderDetail
        fields = ['product','color','size', 'quantity', 'price']
