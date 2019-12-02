from peewee import *

db = SqliteDatabase('/Users/BIGTREE/PycharmProjects/movieList/movieList/db.sqlite3', pragmas={
    'journal_mode': 'wal',
    'cache_size': -1024 * 64})

class BaseModel(Model):
    class Meta:
        database = db

class App_Actor(BaseModel):
    id = CharField(max_length=10, primary_key=True)
    name = CharField(max_length=100)
    enName = CharField(max_length=100)

class App_Genre(BaseModel):
    id = CharField(max_length=10, primary_key=True)
    genre = CharField(max_length=100)

MovieGenreDeferred = DeferredThroughModel()
MovieActorDeferred = DeferredThroughModel()

class App_Movie(BaseModel):
    id = CharField(max_length=10, primary_key=True)
    title = CharField(max_length=100)
    entitle = CharField(max_length=200)
    releaseDate = CharField(max_length=20)
    rate = CharField(max_length=5)
    imgURL = TextField()
    URL = TextField()
    director = CharField(max_length=30)
    story = TextField()
    favorite = SmallIntegerField(default=0)
    genres = ManyToManyField(App_Genre, backref="movie_list", through_model=MovieGenreDeferred)
    actors = ManyToManyField(App_Actor, backref="movie_list", through_model=MovieActorDeferred)

class App_Movie_Genres(BaseModel):
    id = IntegerField()
    movie_id = ForeignKeyField(App_Movie, db_column='movie_id')
    genre_id = ForeignKeyField(App_Genre, db_column='genre_id')
    class Meta:
        primary_key = CompositeKey('movie_id','genre_id')

class App_Movie_Actors(BaseModel):
    id = IntegerField()
    movie_id = ForeignKeyField(App_Movie, db_column='movie_id')
    actor_id = ForeignKeyField(App_Actor, db_column='actor_id')
    class Meta:
        primary_key = CompositeKey('movie_id','actor_id')

MovieActorDeferred.set_model(App_Movie_Actors)
MovieGenreDeferred.set_model(App_Movie_Genres)
#db.connect()
