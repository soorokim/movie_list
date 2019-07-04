from django.db.models import Q
from django_filters.rest_framework import FilterSet
from django_filters.rest_framework import CharFilter
from app.models import Movie

class MovieFilter(FilterSet):
    year = CharFilter(field_name='releaseDate', lookup_expr='icontains')
    search = CharFilter(method="search_movie")
    sort = CharFilter(method="sort_movie")

    def search_movie(self, qs, name, value):
        return qs.filter(
        Q(title__icontains=value)           #한글 제목
        | Q(enTitle__icontains=value)       #영어 제목
        | Q(story__icontains=value)         #스토리
        | Q(actors__name__icontains=value)  #배우 한글 이름
        | Q(actors__enName__icontains=value)#배우 영어 이름
        | Q(director__icontains=value)      #감독
        ).distinct()

    def sort_movie(self, qs, name, value):
        return qs.order_by(value)

    class Meta:
        model = Movie
        fields = {
            'genres__genre':['exact']
        }
