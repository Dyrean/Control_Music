from django.contrib import admin
from .models import SpotifyToken


class SpotifyTokenAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at", "token_type")


admin.site.register(SpotifyToken, SpotifyTokenAdmin)
