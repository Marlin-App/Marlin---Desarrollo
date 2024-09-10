from django.contrib import admin
from .models import UserType, StoreType, ItemTag

# Register your models here.

admin.site.register(UserType)
admin.site.register(StoreType)
admin.site.register(ItemTag)

