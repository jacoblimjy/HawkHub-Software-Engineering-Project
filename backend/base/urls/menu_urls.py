from base.views import menu_views as views
from django.urls import path


urlpatterns = [
    path('createMenuItem/', views.createMenuItem, name='create-menu-item'),
    path('updateMenuItem/', views.updateMenuItem, name='update-menu-item'),
    path('getMenuItems/', views.getMenuItems, name='get-menu-items'),
    path('deleteMenuItem/', views.deleteMenuItem, name='delete-menu-item'),

    path('createMenuIngredient/', views.createMenuIngredient, name='create-menu-ingredient'),
    path('updateMenuIngredient/', views.updateMenuIngredient, name='update-menu-ingredient'),
    path('getMenuIngredients/', views.getMenuIngredients, name='get-menu-ingredients'),
    path('deleteMenuIngredient/', views.deleteMenuIngredient, name='delete-menu-ingredient'),

    path('sellMenuItem/', views.sellMenuItem, name='sell-menu-item'),
]   