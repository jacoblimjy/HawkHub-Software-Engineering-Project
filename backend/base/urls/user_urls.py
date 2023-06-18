from base.views import user_views as views
from django.urls import path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )

urlpatterns = [
    # Other URL patterns
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('', views.getRoutes, name='routes'),

    path('register/', views.registerUser, name='users-register'),
    
    path('profile/', views.getUserProfile, name='users-profile'),
    path('profile/update/', views.updateUserProfile, name='users-profile-update'),

    path('', views.getUsers, name='users'),
    path('createIngredient/', views.createIngredient, name='create-ingredient'),
    path('updateIngredient/', views.updateIngredient, name='update-ingredient'),
    path('getIngredients/', views.getIngredients, name='get-ingredients'),
    path('deleteIngredient/', views.deleteIngredient, name='delete-ingredient'),

    path('createMenuItem/', views.createMenuItem, name='create-menu-item'),
    path('updateMenuItem/', views.updateMenuItem, name='update-menu-item'),
    path('getMenuItems/', views.getMenuItems, name='get-menu-items'),
    path('deleteMenuItem/', views.deleteMenuItem, name='delete-menu-item'),

    path('createMenuIngredient/', views.createMenuIngredient, name='create-menu-ingredient'),
    path('updateMenuIngredient/', views.updateMenuIngredient, name='update-menu-ingredient'),
    path('getMenuIngredients/', views.getMenuIngredients, name='get-menu-ingredients'),
    path('deleteMenuIngredient/', views.deleteMenuIngredient, name='delete-menu-ingredient'),

]
