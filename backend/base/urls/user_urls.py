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
]
