from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
# this is a class that is built into django rest framework that allows us to check if a user is authenticated or not
from rest_framework.permissions import IsAuthenticated
from base.serializers import FinancialSerializer
from base.models import Financial
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFinancials(request):
    financials = Financial.objects.filter(user = request.user).order_by('date')
    serializer = FinancialSerializer(financials, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFinancial(request):
    data = request.data
    try:
        financial = Financial.objects.filter(user = request.user).get(pk=data['_id'])
        serializer = FinancialSerializer(instance=financial, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"status": "error", "data": 'Financial does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    