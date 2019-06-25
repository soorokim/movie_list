from app.models import Movie
from rest_framework import viewsets
from serializers import MovieListSerializer
from rest_framework.response import Response
from django.db.models import Q
from .filters import MovieFilter

class MovieListViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieListSerializer
    filter_class = MovieFilter
