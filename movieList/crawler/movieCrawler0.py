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

code_reg = re.compile('code=(\d+)')

def put_actors_info(actors, movie):
    print(3, movie)
    for id in actors:
        actor = ActorList(id=id, name=actors[id])
        actor.save
        print(id, actors[id])
        actor.movies.add(movie)


def put_movie_info(mId,title,img_url,releaseDate, rate, genre, url, story):
    movie = MovieList(id=mId, URL=url, title=title, rate=rate, imgURL=img_url,releaseDate=releaseDate, genre=genre, story=story)
    movie.save()
    actors = find_actors(code)
    return movie


def find_actors(mId):
    url = ACTOR_URL + mId
    print(url)
    r = requests.get(url)
    tree = lxml.html.fromstring(r.text)

    actor_a_tags = tree.cssselect('#content > div.article > div.section_group.section_group_frst > div.obj_section.noline > div > div.lst_people_area.height100 > ul > li > p > a')

    if not actor_a_tags:
        print("엄서용")
        return;

    actors = {}
    for actor_info in actor_a_tags:
        actor_id = code_reg.search(actor_info.get('href')).group(1)
        actor_name = actor_info.get('title')
        actors[actor_id] = actor_name

    return actors


def get_movie_detail(detail_url) :
    url = BASE_URL_OF_NAVER_MOVIE + detail_url
    r = requests.get(url)
    tree = lxml.html.fromstring(r.text)

    code = code_reg.search(detail_url).group(1)
    #img
    img_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.poster > a > img')

    if not img_tag:
        return;

    img_url = img_tag[0].get('src')[:-15]

    #title
    title_a_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.mv_info > h3 > a:nth-child(1)')

    if not title_a_tag:
        return;

    title = title_a_tag[0].text_content()

    #releaseDate
    openY_a_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.mv_info > p > span:nth-child(4) > a:nth-child(1)')
    openMD_a_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.mv_info > p > span:nth-child(4) > a:nth-child(2)')

    if not openY_a_tag or not openMD_a_tag:
        return;

    openY = openY_a_tag[0].text_content()
    openMD = openMD_a_tag[0].text_content()
    releaseDate = openY+openMD
    releaseDate = releaseDate.replace('.','-',2)

    #rate
    rate_span_tag = tree.cssselect('#actualPointPersentWide > div > span > span')

    if not rate_span_tag:
        return;

    rate = rate_span_tag[0].get('style')[6:-1]

    #genre
    genre_a_tag = tree.cssselect('#content > div.article > div.wide_info_area > div.mv_info > p > span:nth-child(1) > a')
    if not 'genre' in genre_a_tag[0].get('href'):
        return;
    genre = genre_a_tag[0].text_content()

    story_div_tag = tree.cssselect('#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div.story_area > p')
    if not story_div_tag:
        story = "줄거리 없음"
    else :
        story = story_div_tag[0].text_content()

    movie = put_movie_info(code,title,img_url,releaseDate, rate, genre, url, story)
    print(2, movie)

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
#get_movie_detail('/bi/mi/basic.nhn?code=99701')
#test = "https://movie.naver.com/movie/bi/mi/detail.nhn?code=97631"
#print(code_reg.search(test).group(1))
#find_actors('97631')
