import os
import json
import requests
import asyncio

from datetime import datetime
from bs4 import BeautifulSoup as bs
from dotenv import load_dotenv

load_dotenv()

async def get_every_news():
    url = 'https://news.daum.net'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc > main > section > div > div.content-article > div.box_g.box_news_issue > ul').select('li > div > div > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(' ', strip=True))

        with open('../letters/every_news.txt', 'w') as f:
            f.write(f"<오늘의 종합뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/every_news.txt', 'w') as f:
            f.write(f'<오늘의 종합뉴스> 이런! 오늘의 종합뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_political_news():
    url = 'https://news.daum.net/politics'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc.cont-category > main > section > div.main-sub > div.box_g.box_news_major > ul').select('li > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(' ', strip=True))

        with open('../letters/political_news.txt', 'w') as f:
            f.write(f"<오늘의 정치뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/political_news.txt', 'w') as f:
            f.write(f'<오늘의 정치뉴스> 이런! 오늘의 정치뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_world_news():
    url = 'https://news.daum.net/foreign'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc.cont-category > main > section > div.main-sub > div.box_g.box_news_major > ul').select('li > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(' ', strip=True))

        with open('../letters/world_news.txt', 'w') as f:
            f.write(f"<오늘의 국제뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/world_news.txt', 'w') as f:
            f.write(f'<오늘의 국제뉴스> 이런! 오늘의 국제뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_entertain_news():
    url = 'https://entertain.daum.net/ranking/popular'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('#mArticle > div.ranking_list > ol').select('li > div > div > div > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(' ', strip=True))

        with open('../letters/entertain_news.txt', 'w') as f:
            f.write(f"<오늘의 연예뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/entertain_news.txt', 'w') as f:
            f.write(f'<오늘의 연예뉴스> 이런! 오늘의 연예뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_esports_news():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=esports&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        with open('../letters/esports_news.txt', 'w') as f:
            f.write(f"<오늘의 이스포츠 뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/esports_news.txt', 'w') as f:
            f.write(f'<오늘의 이스포츠 뉴스> 이런! 오늘의 이스포츠 뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_korea_football():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=soccer&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        with open('../letters/korea_football.txt', 'w') as f:
            f.write(f"<오늘의 국내축구 뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/korea_football.txt', 'w') as f:
            f.write(f'<오늘의 국내축구 뉴스> 이런! 오늘의 국내축구 뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_world_football():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=worldsoccer&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        with open('../letters/world_football.txt', 'w') as f:
            f.write(f"<오늘의 해외축구 뉴스> {' / '.join(news_titles)}\n")
    else:
        with open('../letters/world_football.txt', 'w') as f:
            f.write(f'<오늘의 해외축구 뉴스> 이런! 오늘의 해외축구 뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_korea_baseball():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=baseball&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        with open('../letters/korea_baseball.txt', 'w') as f:
            f.write(f"<오늘의 국내야구 뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/korea_baseball.txt', 'w') as f:
            f.write(f'<오늘의 국내야구 뉴스> 이런! 오늘의 국내야구 뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_world_baseball():
    url = 'https://sports.daum.net/media-api/harmony/ranking.json?page=0&service=sports&size=20&category=worldbaseball&type=latest&date=1h'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        json = response.json()['body']['data']
        
        for list in json:
            news_titles.append(list['title'])

        with open('../letters/world_baseball.txt', 'w') as f:
            f.write(f"<오늘의 해외야구 뉴스> {' / '.join(news_titles)}\n")
    else: 
        with open('../letters/world_baseball.txt', 'w') as f:
            f.write(f'<오늘의 해외야구 뉴스> 이런! 오늘의 해외야구 뉴스를 불러오는데 실패했습니다 ㅠㅠ\n')

def get_stock(code):
    url = f'https://finance.naver.com/item/main.nhn?code={code}'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        
        name = soup.select_one('#middle > div.h_company > div.wrap_company > h2 > a').get_text()
        price = soup.select_one('#chart_area > div.rate_info > div > p.no_today > em > span.blind').get_text()
        
        return [name, datetime.now().strftime('%H:%M:%S'), price]
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

async def get_today_weather():
    url = 'http://api.openweathermap.org/data/2.5/weather?q=Jinju&appid=' + str(os.environ.get('WEATHER_KEY'))
    response = requests.get(url)

    if response.status_code == 200:
        main_data = response.json()['main']
        
        temperature = int(round(main_data['temp'] - 273.15))
        feels_like = int(round(main_data['feels_like'] - 273.15))
        min_temperature = int(round(main_data['temp_min'] - 273.15))
        max_temperature = int(round(main_data['temp_max'] - 273.15))

        with open('../letters/weather.txt', 'w') as f:
            f.write(f'<오늘의 진주 날씨> 기온: {str(temperature)}℃, 체감온도: {str(feels_like)}℃, 최고기온: {str(max_temperature)}℃, 최소기온: {str(min_temperature)}℃\n')
    else: 
        with open('../letters/weather.txt', 'w') as f:
            f.write(f'<오늘의 진주 날씨> 이런! 오늘의 진주 날씨를 불러오는데 실패했습니다 ㅠㅠ\n')

async def get_covid_confirm_case():
    url = 'https://api.corona-19.kr/korea/?serviceKey=' + str(os.environ.get('COVID_KEY'))
    response = requests.get(url)

    if response.status_code == 200:
        total_case_before = response.json()['TotalCaseBefore']
        update_time = response.json()['updateTime']

        with open('../letters/covid.txt', 'w') as f:
            f.write(f'<코로나 확진자 수> 오늘의 {update_time}은 {total_case_before}명입니다.\n')
    else: 
        with open('../letters/covid.txt', 'w') as f:
            f.write(f'<코로나 확진자 수> 이런! 오늘의 코로나 확진자 수를 불러오는데 실패했습니다 ㅠㅠ\n')

async def process_async():
    await asyncio.wait([
        get_every_news(),
        get_political_news(),
        get_world_news(),
        get_entertain_news(),
        get_esports_news(),
        get_korea_football(),
        get_world_football(),
        get_korea_baseball(),
        get_world_baseball(),
        get_today_weather(),
        get_covid_confirm_case()
    ])

if __name__ == '__main__':
    asyncio.run(process_async())