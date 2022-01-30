import os
import json
import requests

from bs4 import BeautifulSoup as bs
from dotenv import load_dotenv

load_dotenv()

def get_news_title():
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