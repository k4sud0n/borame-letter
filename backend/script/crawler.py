import os
import json
import requests

from datetime import datetime
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


news_titles = ' / '.join(get_news_title())
today_weather = f'기온: {str(get_today_weather()["temperature"])}℃, 체감온도: {str(get_today_weather()["feels_like"])}℃, 최고기온: {str(get_today_weather()["max_temperature"])}℃, 최소기온: {str(get_today_weather()["min_temperature"])}℃'
covid_confirm_case = f'{get_covid_confirm_case()["update_time"]} {get_covid_confirm_case()["total_case"]}명입니다.'

content = f'안녕하세요! 공군 훈련병들의 인편지기 보라매인편입니다. 오늘도 힘든 훈련 하시느라 수고 많으셨습니다. 보라매 인편이 따끈따끈한 오늘자 사회 소식을 전달해드리겠습니다. <오늘의 뉴스> {news_titles} <오늘의 진주 날씨> {today_weather} <코로나 확진자 수> {covid_confirm_case} 오늘의 보라매 인편은 여기까지입니다. 오늘 하루도 수고 많으셨고 몸 건강히 수료하시길 바랍니다 :)'

file = open(f'../letters/{datetime.now().strftime("%Y-%m-%d")}.txt', 'w')
file.write(content)
file.close()