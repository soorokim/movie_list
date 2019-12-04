"""movieList URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from viewsets import MovieListViewSet
from rest_framework import routers
from app import views

router = routers.DefaultRouter()
router.register(r'movie-list', MovieListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chart/', views.chart, name='chart'),
    path('movie-list/', views.chart, name='chart'),
    path('detail-chart/', views.detail_chart, name='detail_chart'),
    path('change_favorite/', views.change_favorite, name='change_favorite'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
