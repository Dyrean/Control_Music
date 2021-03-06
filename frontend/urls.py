from django.urls import path
from django.views.generic import TemplateView

app_name = 'frontend'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name=''),
    path('create-room', TemplateView.as_view(template_name='index.html')),
    path('join-room', TemplateView.as_view(template_name='index.html')),
    path('room/<str:roomCode>', TemplateView.as_view(template_name='index.html'))
]
