from django import template

register = template.Library()

@register.filter
def dot_separator(value):
    if value is None:
        return ""
    return "{:,.0f}".format(value).replace(",", ".")
