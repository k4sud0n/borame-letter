import sys
import multiprocessing

from sender import sender
from crawler import get_stock, get_cryptocurrency

sys.path.insert(1, '../')
from app import database

every_news = open('../letters/every_news.txt', 'r').read()
political_news = open('../letters/political_news.txt', 'r').read()
world_news = open('../letters/world_news.txt', 'r').read()
entertain_news = open('../letters/entertain_news.txt', 'r').read()
esports_news = open('../letters/esports_news.txt', 'r').read()

korea_football = open('../letters/korea_football.txt', 'r').read()
world_football = open('../letters/world_football.txt', 'r').read()
korea_baseball = open('../letters/korea_baseball.txt', 'r').read()
world_baseball = open('../letters/world_baseball.txt', 'r').read()

def stock(code):
    return f'<오늘의 주식> {get_stock(code)[0]}: {get_stock(code)[1]}시 기준 {get_stock(code)[2]}원\n'

def cryptocurrency(code):
    return f'<오늘의 암호화폐> {code}: {get_cryptocurrency(code)[0]}시 기준 {get_cryptocurrency(code)[1]}원\n'

today_weather = open('../letters/weather.txt', 'r').read()
covid_confirm_case = open('../letters/covid.txt', 'r').read()

content_start = '님 안녕하세요! 공군 훈련병들의 인편지기 보라매인편입니다. \n오늘도 힘든 훈련 하시느라 수고 많으셨습니다. 보라매인편이 따끈따끈한 오늘자 사회 소식을 전달해드리겠습니다.\n' 
content_end = '오늘의 보라매 인편은 여기까지입니다. 오늘 하루도 수고 많으셨고 몸 건강히 수료하시길 바랍니다 :)'

users = database.session.query(database.User).all()

def writer(user):
    content = user.name + content_start

    if user.every_news:
        content += every_news
    if user.political_news:
        content += political_news
    if user.world_news:
        content += world_news
    if user.entertain_news:
        content += entertain_news
    if user.esports_news:
        content += esports_news
    if user.korea_football:
        content += korea_football
    if user.world_football:
        content += world_football
    if user.korea_baseball:
        content += korea_baseball
    if user.world_baseball:
        content += world_baseball
    if user.stock != '0':
        content += stock(user.stock)
    if user.cryptocurrency != '0':
        content += cryptocurrency(user.cryptocurrency)

    content += today_weather + covid_confirm_case + content_end

    if 1100 < len(content) < 2200:
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[:1100])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[1100:len(content)])
    elif 2200 < len(content) < 3300:
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[:1100])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[1100:2200])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[2200:len(content)])
    elif 3300 < len(content) < 4400:
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[:1100])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[1100:2200])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[2200:3300])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[3300:len(content)])
    elif 4400 < len(content) < 5500:
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[:1100])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[1100:2200])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[2200:3300])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[3300:4400])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[4400:len(content)])
    elif 5500 < len(content) < 6600:
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[:1100])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[1100:2200])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[2200:3300])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[3300:4400])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[4400:5500])
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content[5500:len(content)])
    else:
        sender(user.name, user.birth_year, user.birth_month, user.birth_date, content)

    print(f'{user.name} done!')

if __name__ == '__main__':
    pool = multiprocessing.Pool(processes=4)
    pool.map(writer, users)
