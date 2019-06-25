#-*- coding:utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

import datetime
import requests
import lxml.html

import time
import re

'''
Django ORM 사용하기
'''
import os
sys.path.insert(0, 'C:\work\movie-list\movieList')
# Python이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movieList.settings")
# 이제 장고를 가져와 장고 프로젝트를 사용할 수 있도록 환경을 만듭니다.
import django
from django.utils import timezone
django.setup()
from app.models import *
'''
ORM 사용하기 위한
'''

BASE_URL_OF_NAVER_MOVIE = "https://movie.naver.com/movie"
OPEN_YEAR_URL = BASE_URL_OF_NAVER_MOVIE + "/sdb/browsing/bmovie.nhn?open="
ACTOR_URL = BASE_URL_OF_NAVER_MOVIE + "/bi/mi/detail.nhn?code="
YEAR_START = 1990
THIS_YEAR = int(datetime.datetime.now().strftime('%Y'))
TODAY = datetime.datetime.now().strftime('%Y-%m-%d')

code_reg = re.compile('code=(\d+)')
open_reg = re.compile('open=(\d{8})')
genre_reg = re.compile('genre=(\d+)')

def put_genres_info(genres, movie):
    for code in genres:
        genre = Genre(id=code, genre=genres[code])
        genre.save()
        movie.genres.add(genre)


def put_actors_info(actors, movie):
    for id in actors:
        actor = Actor(id=id, name=actors[id]['name'], enName=actors[id]['name_en'])
        actor.save()
        movie.actors.add(actor)

def put_movie_info(mId,title,enTitle,imgURL,releaseDate,rate,url,story,director):
    movie = Movie(id=mId, URL=url, title=title,director=director, enTitle=enTitle, rate=rate, imgURL=imgURL,releaseDate=releaseDate, story=story)
    movie.save()
    return movie


def get_actors(mId):
    url = ACTOR_URL + mId
    r = requests.get(url)
    tree = lxml.html.fromstring(r.text)
    actors = {}
    director = "감독정보 없음"

    actor_li_tags = tree.cssselect('#content > div.article > div.section_group.section_group_frst > div.obj_section.noline > div > div.lst_people_area.height100 > ul > li')

    if not actor_li_tags:
        return actors, director;

    for actor_info_li in actor_li_tags:
        actor_info = actor_info_li.cssselect('p > a')
        if not actor_info:
            break
        actor_id = code_reg.search(actor_info[0].get('href')).group(1)
        actor_name = actor_info[0].get('title')
        actor_en_name = actor_info_li.cssselect('.e_name')[0].text_content()
        actors[actor_id] = { 'name': actor_name, 'name_en': actor_en_name }

    director_a_tag = tree.cssselect('.dir_product > .k_name')#https://movie.naver.com/movie/bi/mi/basic.nhn?code=18879 test 해봐야 함.
    if director_a_tag:
        director = director_a_tag[0].text_content()

    return actors,director


def get_movie_detail(detail_url) :
    url = BASE_URL_OF_NAVER_MOVIE + detail_url
    r = requests.get(url)
    tree = lxml.html.fromstring(r.text)

    #title
    title_a_tag = tree.cssselect('.h_movie > a')

    if not title_a_tag:
        print("UnkownTitle(fail): no title")
        return;

    title = title_a_tag[0].text_content()

    code = code_reg.search(detail_url).group(1)
    #img
    img_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.poster > a > img')

    if not img_tag:
        print(title+"(fail): no imgTag")
        return;

    imgURL = img_tag[0].get('src')[:-15]


    enTitle_a_tag = tree.cssselect('.h_movie2')

    if not enTitle_a_tag:
        print(title+"(fail): no enTitle")
        return;

    enTitle = enTitle_a_tag[0].text_content()
    enTitle = " ".join(enTitle.split())

    #releaseDate
    open_a_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.mv_info > p > span > a')

    releaseDate = ""
    open_a_tag.reverse()
    for open in open_a_tag:
        open_href = open_reg.search(open.get('href'))

        if open_href: #재개봉인 경우 마지막(뒤에서 첫번째)에 개봉일이 있다.
            y = open_href.group(1)[:4]
            m =  open_href.group(1)[4:6]
            d =  open_href.group(1)[6:8]
            releaseDate = y+"-"+m+"-"+d
            break

    ''' 어차피 미개봉 영화는 rate가없음
    if releaseDate > TODAY :
        return
    '''

    #rate
    rate_span_tag = tree.cssselect('#actualPointPersentWide > div > span > span')

    if not rate_span_tag:
        print(title+"(fail): no rate")
        return;

    rate = rate_span_tag[0].get('style')[6:-1]

    #story
    story_div_tag = tree.cssselect('#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div.story_area > p')
    if not story_div_tag:
        story = "줄거리 없음"
    else :
        story = story_div_tag[0].text_content()

    actors, director = get_actors(code)

    genre_a_tags = tree.cssselect('.info_spec > span:nth-child(1) > a')

    genres = {}

    for genre_a_tag in genre_a_tags:
        genre = genre_a_tag.get('href')
        genre = genre_reg.search(genre)
        if not genre :
            break;
        genre_code = genre.group(1)
        genre_name = genre_a_tag.text_content()
        genres[genre_code] = genre_name

    if not genres:
        print(title+"(fail): no genre")
        return

    movie = put_movie_info(code,title,enTitle,imgURL,releaseDate,rate,url,story,director)
    #actors
    if actors:
        put_actors_info(actors, movie)
    put_genres_info(genres, movie)
    '''
    '''


    print(title+": success!!")
    return True


def naver_movie() :
    year = YEAR_START
    cnt = 0
    while year <= THIS_YEAR :
        print("="*10,year,"년도 영화 start","="*10)
        year_url = OPEN_YEAR_URL + str(year)
        page=1
        while True:
            url = year_url + "&page=" + str(page)
            r = requests.get(url)
            tree = lxml.html.fromstring(r.text)
            lis = tree.cssselect('#old_content > ul > li > a')

            for li in lis:
                if (get_movie_detail(li.get('href'))):
                    cnt = cnt + 1;

            if (tree.cssselect('.next')):
                page = page + 1
            else :
                year = year + 1
                break
    print(cnt)

naver_movie()
#get_movie_detail('/bi/mi/basic.nhn?code=10200') #상세페이지 테스트
#get_actors('97631') #배우 얻기 테스트
