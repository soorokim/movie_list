from django.db import models

class Actor(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=100)
    enName = models.CharField(max_length=100)

class Genre(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    genre = models.CharField(max_length=100)
    
class Movie(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=100)
    enTitle = models.CharField(max_length=200)
    releaseDate = models.CharField(max_length=20)
    rate = models.CharField(max_length=5)
    imgURL = models.TextField()
    URL = models.TextField()
    director = models.CharField(max_length=30)
    story = models.TextField()
    favorite = models.SmallIntegerField(default=0)
    genres = models.ManyToManyField(Genre, related_name="movie_list", blank=True)
    actors = models.ManyToManyField(Actor, related_name="movie_list", blank=True)
