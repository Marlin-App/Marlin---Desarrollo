from rest_framework import serializers
from .models import UserProfile, Store

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         models = UserProfile

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'


