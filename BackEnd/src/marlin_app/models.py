from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.ForeignKey(UserType, on_delete=models.CASCADE)
    phone = models.CharField(max_length=8)
    zip_code = models.CharField(max_length=5)
    direction = models.CharField(max_length=250)
    specific_direction = models.TextField()
    picture = models.CharField(max_length=250)

    def __str__(self):
        return self.user.username

class StoreType(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Store(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    store_type = models.ForeignKey(StoreType, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    description = models.TextField()
    location = models.CharField(max_length=250)
    picture = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class ItemTag(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name

class StoreItem(models.Model):
    store_id = models.ForeignKey(Store, on_delete=models.CASCADE)
    item_type = models.ForeignKey(ItemTag, on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    picture = models.CharField(max_length=250)

    def __str__(self):
        return self.name








# class Product(models.Model):
#     name = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=10, decimal_places=2)

# class UserType(models.Model):
#     name = models.CharField(max_length=100)

# class User (models.Model):
#     user_type = models.ForeignKey(UserType, on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     lastname = models.CharField(max_length=100)
#     email = models.CharField(max_length=100)
#     phone = models.CharField(max_length=20)
#     password = models.CharField(max_length=100)
#     profile_picture = models.CharField()

# class UserDirection(models.Model):
#     user_id = models.ForeignKey(User, on_delete=models.CASCADE)
#     zip_code = models.CharField(max_length=5)
#     direction = models.CharField(max_length=100)
#     specific_direction = models.TextField()

# class Store(models.Model):
#     pass
