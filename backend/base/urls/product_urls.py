from base.views import product_views as views
from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('<str:pk>/', views.getProduct, name='product'),
]