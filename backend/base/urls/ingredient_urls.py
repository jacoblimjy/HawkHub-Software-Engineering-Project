
from base.views import ingredient_views as views
from django.urls import path

urlpatterns = [
    path('createIngredient/', views.createIngredient, name='create-ingredient'),
    path('updateIngredient/', views.updateIngredient, name='update-ingredient'),
    path('getIngredients/', views.getIngredients, name='get-ingredients'),
    path('deleteIngredient/', views.deleteIngredient, name='delete-ingredient'),
    # path('updateIngredientWithNameAndUser/', views.updateIngredientWithNameAndUser, name='update-ingredient-by-name-and-user')
]