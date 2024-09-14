from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StoreSerializer, UserSerializer, StoreItemSerializer, StoreTypeSerializer
from . models import Store, StoreItem, StoreType
from .permissions import IsAuthenticatedOrOwner
from django_filters.rest_framework import DjangoFilterBackend

class StoreViewSet(viewsets.ModelViewSet):
    permission_classes =  [IsAuthenticatedOrOwner]
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['store_type']

class StoreItemViewSet(viewsets.ModelViewSet):
    permission_classes =  [IsAuthenticatedOrOwner]
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

class StoreTypeViewSet(viewsets.ModelViewSet):
    queryset = StoreType.objects.all()
    serializer_class = StoreTypeSerializer

