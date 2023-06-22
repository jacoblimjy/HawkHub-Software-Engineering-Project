from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# this is a class that is built into django rest framework that allows us to check if a user is authenticated or not
from rest_framework.permissions import IsAuthenticated
from base.serializers import MenuItemSerializer, MenuIngredientSerializer
from base.models import Ingredient, MenuItem, Financial
from rest_framework import status
from datetime import date
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMenuItem(request):
    serializer = MenuItemSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save(user=request.user)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateMenuItem(request):
    data = request.data
    try:
        menuItem = MenuItem.objects.filter(user = request.user).get(pk=data['_id'])
        serializer = MenuItemSerializer(instance=menuItem, data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except:
                return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"status": "error", "data": 'Menu Item does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMenuItems(request):
    menuItems = MenuItem.objects.filter(user = request.user)
    serializer = MenuItemSerializer(menuItems, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteMenuItem(request):
    data = request.data
    try:
        menuItem = MenuItem.objects.filter(user = request.user).get(pk=data['_id'])
        menuItem.delete()
        return Response({"status": "success", "data": 'Menu Item deleted.'}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "data": 'Menu Item does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMenuIngredient(request):
    data = request.data
    try:
        menuItem = MenuItem.objects.filter(user = request.user).get(pk=data['menuItem'])
        ingredient = Ingredient.objects.filter(user = request.user).get(pk=data['ingredient'])

        serializer = MenuIngredientSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"status": "error", "data": 'Menu Item or Ingredient does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateMenuIngredient(request):
#     data = request.data
#     try:
#         menuIngredient = MenuIngredient.objects.get(pk=data['_id'])
#         newQuantity = { k:v for k,v in data.items() if 'quantity' in k }
#         serializer = MenuIngredientSerializer(instance=menuIngredient, data=newQuantity, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)  
#     except:
#         return Response({"status": "error", "data": 'Menu Ingredient does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateMenuIngredient(request):
    data = request.data
    try:
        menuItem = MenuItem.objects.filter(user = request.user).get(pk=data['menuItem_id'])
        ingredients = menuItem.menuingredient_set.all()
        for add_ingredient in data['add']:
            if ingredients.filter(ingredient=add_ingredient['ingredient']).exists():
                menuIngredient = ingredients.get(ingredient=add_ingredient['ingredient'])
                menuIngredient.quantity = add_ingredient['quantity']
                menuIngredient.save()
            else:
                add_ingredient['menuItem'] = menuItem._id
                serializer = MenuIngredientSerializer(data=add_ingredient)
                if serializer.is_valid():
                    serializer.save(menuItem=menuItem)
                else:
                    return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        for remove_ingredient in data['remove']:
            if ingredients.filter(ingredient=remove_ingredient['ingredient']).exists():
                menuIngredient = ingredients.get(ingredient=remove_ingredient['ingredient'])
                menuIngredient.delete()

        return Response({"status": "success", "data": 'Menu Ingredients updated.'}, status=status.HTTP_200_OK)
    
    except Exception as err:
        return Response({"status": "error", "data": str(err)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMenuIngredients(request):
    try:
        menuIngredients = MenuItem.objects.filter(user = request.user).get(pk=request.data['_id']).menuingredient_set.all()
        serializer = MenuIngredientSerializer(menuIngredients, many=True)
        return Response(serializer.data)
    except:
        return Response({"status": "error", "data": 'Menu Item does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteMenuIngredient(request):
    data = request.data
    try:
        menuIngredient = MenuItem.objects.filter(user = request.user).get(pk=data['menuItem_id']).menuingredient_set.get(pk=data['_id'])
        menuIngredient.delete()
        return Response({"status": "success", "data": 'Menu Ingredient deleted.'}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "data": 'Menu Ingredient does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sellMenuItem(request):
    data = request.data
    num_Sold = int(data['num_Sold'])
    try:
        menuItem = MenuItem.objects.filter(user = request.user).get(pk=data['_id'])
        menuIngredients = menuItem.menuingredient_set.all()
        cost = 0
        for menuIngredient in menuIngredients:
            ingredient = menuIngredient.ingredient
            ingredient.countInStock -= menuIngredient.quantity * num_Sold
            ingredient.save()
            cost += float(ingredient.cost) * menuIngredient.quantity * num_Sold

        if Financial.objects.filter(user = request.user).exists():
            financial = Financial.objects.filter(user = request.user).latest('date')
            if financial.date.month == date.today().month:
                financial.cost += Decimal(cost)
                financial.revenue += menuItem.price * num_Sold
                financial.save()
            else:
                financial = Financial.objects.create(user = request.user, cost=Decimal(cost), revenue=menuItem.price * num_Sold, date=date.today())
        
        else:
            financial = Financial.objects.create(user = request.user, cost=Decimal(cost), revenue=menuItem.price * num_Sold, date=date.today())
            
        

        return Response({"status": "success", "data": 'Menu Item sold.'}, status=status.HTTP_200_OK)
    except Exception as err:
        return Response({"status": "error", "data": str(err)}, status=status.HTTP_400_BAD_REQUEST)