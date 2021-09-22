from django.shortcuts import render
from rest_framework import generics, viewsets

from .serializers import RoomSerializer
from .models import Room

# from django.contrib.auth import get_user_model
# User = get_user_model()


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
