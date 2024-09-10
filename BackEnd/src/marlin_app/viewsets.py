from rest_framework import viewsets
from .serializers import StoreSerializer
from . models import Store

class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer