from django.shortcuts import render
from .models_peewee import *
from .models import *
from django.http import JsonResponse
from peewee import fn

# Create your views here.
def chart(request):

    data = {}
    years = [str(num) for num in range(1990,2020)]
    movie_cnt_of_year = []
    for year in years:
        movie = App_Movie.select().where((App_Movie.releaseDate>=(year+'-00-00'))&(App_Movie.releaseDate<=(year+'-12-31')))
        movie_cnt_of_year.append(movie.count())
    data = {
        'color': ['#3398db'],
        'tooltip': {
            'triger': 'axis',
            'axisPointer':{
                'type': 'shadow'
            }
        },
        'title': [{
            'text': '연도별 개봉 영화 수',
            'subtext': '총 ' + str(sum(movie_cnt_of_year)) + '편의 영화',
            'x': '25%',
            'textAlign': 'center'
        }],
        'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '4%',
            'containLabel': True
        },
        'xAxis': {
            'type': 'category',
            'data': years
        },
        'yAxis': {
            'type': 'value'
        },
        'series': [{
            'data': movie_cnt_of_year,
            'type': 'bar',
            'barWidth': '60%',
            'label': {
                'normal': {
                    'position':'top',
                    'show':True
                }
            }
        }]
    }
    return JsonResponse(data, safe=False)

def detail_chart(request):
    year = request.GET.get('year')
    data = {}
    months = [("0"+str(num) if (num<10) else str(num)) for num in range(0,13)]
    movie_cnt_of_month = []
    genres = [genre for genre in App_Genre.select()]
    movie_cnt_of_genre = []
    monthData = []
    for month in months:
        movie = (
            App_Movie.select()
            .where(
                (App_Movie.releaseDate>=(year+'-'+month+'-00'))
                &(App_Movie.releaseDate<=(year+'-'+month+'-31'))
            )
        )
        movie_cnt_of_month.append(movie.count())
        monthData.append(movie)


    genreData = []
    for genre in genres:
        movie = App_Movie.select().where((App_Movie.releaseDate>=(year+'-'+'00'+'-00'))&(App_Movie.releaseDate<=(year+'-'+'12'+'-31'))).join(App_Movie_Genres, on=(App_Movie_Genres.movie_id==App_Movie.id)).where(
        App_Movie_Genres.genre_id==genre.id )
        movie_cnt_of_genre.append(movie.count())
        genreData.append(movie)
    genres = [genre.genre for genre in genres]

    monthly = {
        'color': ['#3398db'],
        'tooltip': {
            'triger': 'axis',
            'axisPointer':{
                'type': 'shadow'
            }
        },
        'title': [{
            'text': year+'년도 월별 개봉 영화 수',
            'subtext': '총 ' + str(sum(movie_cnt_of_month)) + '편의 영화',
            'x': '25%',
            'textAlign': 'center'
        }],
        'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '4%',
            'containLabel': True
        },
        'xAxis': {
            'type': 'category',
            'data': months
        },
        'yAxis': {
            'type': 'value'
        },
        'series': [{
            'data': movie_cnt_of_month,
            'type': 'bar',
            'barWidth': '60%',
            'label': {
                'normal': {
                    'position':'top',
                    'show':True
                }
            }
        }]
    }
    genreChart = {
        'color': ['#3398db'],
        'tooltip': {
            'triger': 'axis',
            'axisPointer':{
                'type': 'shadow'
            }
        },
        'title': [{
            'text': year+'년도 장르별 개봉 영화 수',
            'subtext': '총 ' + str(sum(movie_cnt_of_genre)) + '편의 영화',
            'x': '25%',
            'textAlign': 'center'
        }],
        'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '4%',
            'containLabel': True
        },
        'xAxis': {
            'type': 'value'
        },
        'yAxis': {
            'type': 'category',
            'data': genres,
            'axisLabel': {
                'interval': 0,
                'rotate': 30
            },
        },
        'series': [{
            'data': movie_cnt_of_genre,
            'type': 'bar',
            'barWidth': '60%',
            'label': {
                'normal': {
                    'position':'right',
                    'show':True
                }
            }
        }]
    }
    data = {
        'monthlyChart':monthly,
        'genreChart': genreChart,
    }
    #TODO data 보내기
    #'monthData':monthData,
    #'genreData':genreData
    return JsonResponse(data, safe=False)

def change_favorite(request):
    movieId = request.GET.get('id')
    data = Movie.objects.get(id=movieId)
    data.favorite = not data.favorite
    data.save()

    return JsonResponse({200:'ok'}, safe=False)