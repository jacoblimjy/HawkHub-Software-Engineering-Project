from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# this is a class that is built into django rest framework that allows us to check if a user is authenticated or not
from rest_framework.permissions import IsAuthenticated
from base.serializers import IngredientSerializer
from base.models import Ingredient
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createIngredient(request):
    serializer = IngredientSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"Ingredient already exists"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateIngredient(request):
    data = request.data
    try:
        ingredient = Ingredient.objects.filter(user = request.user).get(pk=data['_id'])
        serializer = IngredientSerializer(instance=ingredient, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"Ingredient already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getIngredients(request):
    ingredients = Ingredient.objects.filter(user = request.user)
    serializer = IngredientSerializer(ingredients, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteIngredient(request):
    data = request.data
    try:
        ingredient = Ingredient.objects.filter(user = request.user).get(pk=data['_id'])
        ingredient.delete()
        return Response({"status": "success", "data": 'Ingredient deleted.'}, status=status.HTTP_200_OK)
    except:
        return Response({"status": "error", "data": 'Ingredient does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateIngredientWithNameAndUser(request):
#     data = request.data
#     try:
#         ingredient = Ingredient.objects.filter(user=request.user, name=data['name']).first()
#         if ingredient:
#             serializer = IngredientSerializer(instance=ingredient, data=request.data, partial=True)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             else:
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         else:
#             return Response({"error": "Ingredient not found"}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


