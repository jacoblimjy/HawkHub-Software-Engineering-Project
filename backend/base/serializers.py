from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken #RefreshToken is a class that is built into django rest framework that allows us to generate a token for a user
from base.models import UserProfile
from .models import Supplier, Product, UserProfile, Ingredient
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True) #this is a field that is not in the model but we want to add it to the serializer
    _id = serializers.SerializerMethodField(read_only=True) 
    isAdmin = serializers.SerializerMethodField(read_only=True)
    isSupplier = serializers.SerializerMethodField(read_only=True)

    class Meta: #this is a class that is built into django rest framework which allows us to define some options for our serializer
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'isSupplier'] 
    
    def get__id(self, obj): #this is a method that is not in the model but we want to add it to the serializer
        return obj.id 
    
    def get_isAdmin(self, obj): #this is a method that is not in the model but we want to add it to the serializer 
        return obj.is_staff
    
    def get_name(self, obj): #this is a method that is not in the model but we want to add it to the serializer
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
    def get_isSupplier(self, obj):
        return obj.userprofile.isSupplier
    
    def create(self, validated_data): #check again
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            password=make_password(validated_data['password'])
        )

        userprofile = UserProfile.objects.create(
            user=user,
            isSupplier=validated_data.get('isSupplier', False)
        )

        return user


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token', 'isSupplier']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj) #what this do is it will generate a token for the user that is passed in
        return str(token.access_token) 
    
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        exclude = ['user'] #exclude the user field from the serializer
    
class SupplierSerializer(serializers.ModelSerializer):
    class Meta: #this is a class that is built into django rest framework which allows us to define some options for our serializer
        model = Supplier
        fields = '__all__' #this will serialize all the fields in the model (Supplier)

class ProductSerializer(serializers.ModelSerializer):
    class Meta: #this is a class that is built into django rest framework which allows us to define some options for our serializer
        model = Product
        fields = '__all__' #this will serialize all the fields in the model (Product)


