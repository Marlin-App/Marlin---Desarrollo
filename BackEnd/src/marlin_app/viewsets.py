from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StoreSerializer, UserSerializer, StoreItemSerializer, StoreTypeSerializer
from . models import Store, StoreItem, StoreType
from .permissions import IsAuthenticatedOrOwner

class StoreViewSet(viewsets.ModelViewSet):
    permission_classes =  [IsAuthenticatedOrOwner]
    queryset = Store.objects.all()
    serializer_class = StoreSerializer

class StoreItemViewSet(viewsets.ModelViewSet):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class StoreTypeViewSet(viewsets.ModelViewSet):
    queryset = StoreType.objects.all()
    serializer_class = StoreTypeSerializer

