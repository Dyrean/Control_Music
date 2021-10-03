from django.urls import path
from . import views


urlpatterns = [
    path('get-auth-url', views.AuthURL.as_view()),
    path('redirect', views.spotify_call_back),
    path('is-authenticated', views.IsAuthenticated.as_view()),
    path('current-song', views.CurrentSong.as_view()),
]
