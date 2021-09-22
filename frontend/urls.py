from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('create-room/', TemplateView.as_view(template_name='index.html')),
    path('join-room/', TemplateView.as_view(template_name='index.html')),
]
