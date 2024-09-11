from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Store
from rest_framework.permissions import AllowAny

# Registrar un usuario
class UserSerializer(serializers.ModelSerializer):
    permission_classes = [AllowAny]
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        #datos necesarios
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

#Serializador para comunicar datos por medio de json
class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'


