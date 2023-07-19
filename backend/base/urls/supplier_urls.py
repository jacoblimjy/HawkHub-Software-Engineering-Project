from base.views import supplier_views as views
from django.urls import path

urlpatterns = [
    path('', views.getSuppliers, name='suppliers'),
    path('<str:pk>/', views.getSupplier, name='supplier'),
    path('<str:pk>/reviews/', views.createSupplierReview, name='create-review'),
    path('<str:pk>/products/', views.getSupplierProducts, name='supplier-products'),
    path('<str:pk>/products/<str:pk2>/', views.getSupplierProduct, name='supplier-product'),
    path('user/<str:pk>/', views.getSupplierByUserId, name='user-supplier'),
]
