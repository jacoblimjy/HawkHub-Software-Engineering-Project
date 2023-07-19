from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# this is a class that is built into django rest framework that allows us to check if a user is authenticated or not
from rest_framework.permissions import IsAuthenticated
from base.serializers import ForumCommentSerializer, ForumPostSerializer
from base.models import ForumComment, ForumPost
from rest_framework import status
from datetime import date

@api_view(['Post'])
@permission_classes([IsAuthenticated])
def createForumPost(request):
    data = request.data
    try:
        post = ForumPost.objects.create(
            user=request.user,
            title=data['title'],
            message=data['message'],
            date=date.today()
        )
        serializer = ForumPostSerializer(post, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'message': 'Error creating post.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getForumPosts(request):
    posts = ForumPost.objects.all()
    serializer = ForumPostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getForumPost(request, pk):
    try:
        post = ForumPost.objects.get( _id=pk)
        post_serializer = ForumPostSerializer(post, many=False)
        comments = ForumComment.objects.filter(post=pk)
        comments_serializer = ForumCommentSerializer(comments, many=True)
        return Response({'post': post_serializer.data, 'comments': comments_serializer.data}, status=status.HTTP_200_OK)
    except:
        return Response({'message': "Error getting post."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateForumPost(request, pk):
    data = request.data 
    try:
        post = ForumPost.objects.get(user = request.user, _id=pk)
        serializer = ForumPostSerializer(instance=post, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'message': "Error updating post."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteForumPost(request, pk):
    try:
        post = ForumPost.objects.get(user = request.user, _id=pk)
        post.delete()
        return Response('Post deleted', status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Error deleting post.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['Post'])
@permission_classes([IsAuthenticated])
def createForumComment(request):
    data = request.data
    try:
        comment = ForumComment.objects.create(
            user=request.user,
            post=ForumPost.objects.get(_id=data['post']),
            message=data['message'],
            date=date.today()
        )
        serializer = ForumCommentSerializer(comment, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getForumComments(request, pk):
    comments = ForumComment.objects.filter(post=pk)
    serializer = ForumCommentSerializer(comments, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateForumComment(request, pk):
    data = request.data 
    try:
        comment = ForumComment.objects.get(user = request.user, _id=pk)
        serializer = ForumCommentSerializer(instance=comment, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteForumComment(request, pk):
    try:
        comment = ForumComment.objects.get(user = request.user, _id=pk)
        comment.delete()
        return Response('Comment deleted', status=status.HTTP_200_OK)
    except:
        return Response({'message': 'Error deleting comment.'}, status=status.HTTP_400_BAD_REQUEST)
    

