#DockerFile

FROM ubuntu:16.04
#로케일 설정
RUN apt-get update && apt-get install -y locales
RUN locale-gen ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8

#파일 복사하기
RUN mkdir /code
WORKDIR /code
ADD ./movieList /code/movieList

#vim설치
RUN apt-get update
RUN apt-get install -y vim git wget

#파이썬3.6 설치
RUN apt-get install -y software-properties-common
RUN apt-get install -y virtualenv
RUN add-apt-repository -y ppa:deadsnakes/ppa
RUN apt-get update
RUN apt-get install -y python3.6
RUN apt-get install -y python3.6-dev libmysqlclient-dev build-essential
RUN virtualenv -p python3.6 venv
RUN source venv/bin/activate

#패키지 설치
WORKDIR /code
ADD requirements.txt /code
RUN pip install -r requirements.txt
