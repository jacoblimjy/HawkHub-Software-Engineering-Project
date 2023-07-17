from base.views import forum_views as views
from django.urls import path

urlpatterns = [
    path('createForumPost/', views.createForumPost, name='create-forum-post'),
    path('getForumPosts/', views.getForumPosts, name='get-forum-posts'),
    path('updateForumPost/<str:pk>/', views.updateForumPost, name='update-forum-post'),
    path('deleteForumPost/<str:pk>/', views.deleteForumPost, name='delete-forum-post'),

    path('createForumComment/', views.createForumComment, name='create-forum-comment'),
    path('getForumComments/<str:pk>/', views.getForumComments, name='get-forum-comments'),
    path('updateForumComment/<str:pk>/', views.updateForumComment, name='update-forum-comment'),
    path('deleteForumComment/<str:pk>/', views.deleteForumComment, name='delete-forum-comment'),
]

