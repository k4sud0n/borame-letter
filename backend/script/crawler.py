import os
import json
import requests

from datetime import datetime
from bs4 import BeautifulSoup as bs
from dotenv import load_dotenv

load_dotenv()

def get_every_news():
    url = 'https://news.daum.net'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc > main > section > div > div.content-article > div.box_g.box_news_issue > ul').select('li > div > div > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(" ", strip=True))

        return news_titles
    else: 
        return response.status_code

def get_political_news():
    url = 'https://news.daum.net/politics'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc.cont-category > main > section > div.main-sub > div.box_g.box_news_major > ul').select('li > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(" ", strip=True))

        return news_titles
    else: 
        return response.status_code

def get_world_news():
    url = 'https://news.daum.net/foreign'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc.cont-category > main > section > div.main-sub > div.box_g.box_news_major > ul').select('li > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(" ", strip=True))

        return news_titles
    else: 
        return response.status_code

def get_entertain_news():
    url = 'https://entertain.daum.net/ranking/popular'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('#mArticle > div.ranking_list > ol').select('li > div > div > div > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(" ", strip=True))

        return news_titles
    else: 
        return response.status_code

def get_esports_news():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=esports&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        return news_titles
    else: 
        return response.status_code

def get_korea_football():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=soccer&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        return news_titles
    else: 
        return response.status_code

def get_world_football():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=worldsoccer&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        return news_titles
    else: 
        return response.status_code

def get_korea_baseball():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=baseball&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        return news_titles
    else: 
        return response.status_code

def get_world_baseball():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=worldbaseball&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        return news_titles
    else: 
        return response.status_code

def get_stock(code):
    url = f'https://finance.naver.com/item/main.nhn?code={code}'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        price = soup.select_one('#chart_area > div.rate_info > div > p.no_today > em.no_down > span.blind').get_text()
        
        return [datetime.now().strftime('%H:%M:%S'), price]
    else: 
        return response.status_code

def get_cryptocurrency(code):
    url = f'https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-{code}'
    response = requests.get(url)

    if response.status_code == 200:
        json = response.json()[0]
        price = json['tradePrice']

        return [datetime.now().strftime('%H:%M:%S'), format(int(price), ',')]
    else: 
        return response.status_code

def get_today_weather():
    url = 'http://api.openweathermap.org/data/2.5/weather?q=Jinju&appid=' + str(os.environ.get('WEATHER_KEY'))
    response = requests.get(url)

    if response.status_code == 200:
        main_data = response.json()['main']
        
        temperature = int(round(main_data['temp'] - 273.15))
        feels_like = int(round(main_data['feels_like'] - 273.15))
        min_temperature = int(round(main_data['temp_min'] - 273.15))
        max_temperature = int(round(main_data['temp_max'] - 273.15))

        return {'temperature': temperature, 'feels_like': feels_like, 'min_temperature': min_temperature, 'max_temperature': max_temperature}
    else : 
        return response.status_code

def get_covid_confirm_case():
    url = 'https://api.corona-19.kr/korea/?serviceKey=' + str(os.environ.get('COVID_KEY'))
    response = requests.get(url)

    if response.status_code == 200:
        total_case_before = response.json()['TotalCaseBefore']
        update_time = response.json()['updateTime']

        return {'total_case': total_case_before, 'update_time': update_time}
    else : 
        return response.status_code
