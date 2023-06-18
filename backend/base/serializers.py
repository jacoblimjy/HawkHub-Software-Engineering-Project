from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken #RefreshToken is a class that is built into django rest framework that allows us to generate a token for a user
from base.models import UserProfile, Ingredient, MenuItem, MenuIngredient

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

class MenuItemSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = MenuItem
        exclude = ['user'] #exclude the user field from the serializer

    def get_ingredients(self, obj):
        ingredients = obj.menuingredient_set.all()
        serializer = MenuIngredientSerializer(ingredients, many=True)
        return serializer.data

class MenuIngredientSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    unit = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MenuIngredient
        fields = '__all__' 
    
    def get_name(self, obj):
        return obj.ingredient.name
    
    def get_unit(self, obj):
        return obj.ingredient.unit