from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# this is a class that is built into django rest framework that allows us to check if a user is authenticated or not
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import Supplier, Product, Review
from base.serializers import SupplierSerializer, ProductSerializer

# this is a function that is built into django that allows us to hash a password
from rest_framework import status

@api_view(['GET'])
def getSuppliers(request):
    suppliers = Supplier.objects.all()
    serializer = SupplierSerializer(suppliers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSupplier(request, pk):  # pk is passed in from the url from urls.py
    supplier = None
    supplier = Supplier.objects.get(_id=pk)
    serializer = SupplierSerializer(supplier, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getSupplierProducts(request, pk):  # pk is passed in from the url from urls.py
    supplier = None
    supplier = Supplier.objects.get(_id=pk)
    products = supplier.product_set.all() # this allows us to get all the products that belong to the supplier
    #products = Product.objects.filter(supplier=supplier) # this is another way to get all the products that belong to the supplier
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSupplierProduct(request, pk, pk2):
    supplier = None
    supplier = Supplier.objects.get(_id=pk)
    product = supplier.product_set.get(_id=pk2)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getSupplierByUserId(request, pk):
    try:
        user = User.objects.get(id=pk)
        supplier = user.supplier_set.first()
        serializer = SupplierSerializer(supplier)
        return Response(serializer.data)
    except:
        message = {'detail': 'Supplier does not exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSupplierReview(request, pk):
    user = request.user
    supplier = Supplier.objects.get(_id=pk)
    data = request.data

    alreadyExists = supplier.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Supplier already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user=user,
            supplier=supplier,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = supplier.review_set.all()
        supplier.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        supplier.rating = total / len(reviews)
        supplier.save()
        return Response('Review Added')
    
        
