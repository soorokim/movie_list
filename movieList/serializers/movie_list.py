from app.models import Movie, Actor, Genre
from rest_framework import serializers

class ActorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = ('id','name','enName')

class GenreListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id','genre')

class MovieListSerializer(serializers.ModelSerializer):
    actors = ActorListSerializer(many=True)
    genres = GenreListSerializer(many=True)
    class Meta:
        model = Movie
        fields = ('id','URL','title','enTitle','director', 'releaseDate','rate','imgURL', 'story', 'actors', 'genres')
