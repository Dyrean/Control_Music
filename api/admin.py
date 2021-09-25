from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Room


class RoomAdmin(admin.ModelAdmin):
    list_display = ("code", "host", "created_at")


admin.site.register(User, UserAdmin)
admin.site.register(Room, RoomAdmin)
