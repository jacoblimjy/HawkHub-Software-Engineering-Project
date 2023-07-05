from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# this is a class that is built into django rest framework that allows us to check if a user is authenticated or not
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password 

from base.models import UserProfile, Supplier
# this is a function that is built into django that allows us to hash a password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):  # no need decode token, will show username and email in postman
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


# this class is used in urls.py
class MyTokenObtainPairView(TokenObtainPairView):
    # serializer_class is a class variable of TokenObtainPairView, a class variable is a variable that is shared by all instances of a class.
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']) #this is a function that is built into django that allows us to hash a password
        )

        userprofile = UserProfile.objects.create(
            user = user,
            isSupplier = True if data['isSupplier'] == 'true' else False 
        )

        if data['isSupplier'] == 'true':
            supplier = Supplier.objects.create(
                user = user,
            )
            supplier.save()

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST) #check rest_framework  
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    # this is a user object from request object that is passed in from the frontend
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
