from django.urls import path, include
from rest_framework import routers
from . import viewsets
from .views import RegisterUserAPIView

# Url para las apis
router = routers.DefaultRouter()
router.register(r'stores', viewsets.StoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserAPIView.as_view(), name='register'),
]