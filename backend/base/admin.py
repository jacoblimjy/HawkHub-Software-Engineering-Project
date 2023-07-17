from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Supplier)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Ingredient)
admin.site.register(MenuItem)
admin.site.register(MenuIngredient)
admin.site.register(Financial)
admin.site.register(Notification)
admin.site.register(MenuItemSold)