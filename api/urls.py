from django.urls import path, include

from . import views

urlpatterns = [
    path('room/', views.RoomView.as_view()),
    path('create-room/', views.CreateRoomView.as_view()),
    path('get-room', views.GetRoomView.as_view()),
]
