import sys
import inspect

from crawler import *
# from sender import sender

## Importing database.py
current_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir) 
from database import User, session

users = session.query(User).all()

every_news = f"<오늘의 종합뉴스> {' / '.join(get_every_news())}\n"
political_news = f"<오늘의 정치뉴스> {' / '.join(get_political_news())}\n"
world_news = f"<오늘의 국제뉴스> {' / '.join(get_world_news())}\n"
entertain_news = f"<오늘의 연예뉴스> {' / '.join(get_entertain_news())}\n"
esports_news = f"<오늘의 이스포츠 뉴스> {' / '.join(get_esports_news())}\n"

korea_football = f"<오늘의 국내축구 뉴스> {' / '.join(get_korea_football())}\n"
world_football = f"<오늘의 해외축구 뉴스> {' / '.join(get_world_football())}\n"
korea_baseball = f"<오늘의 국내야구 뉴스> {' / '.join(get_korea_baseball())}\n"
world_baseball = f"<오늘의 해외야구 뉴스> {' / '.join(get_world_baseball())}\n"

def stock(code):
    return f"<오늘의 주식> {get_stock(code)[0]}: {get_stock(code)[1]}시 기준 {get_stock(code)[2]}원\n"

def cryptocurrency(code):
    return f"<오늘의 암호화폐> {code}: {get_cryptocurrency(code)[0]}시 기준 {get_cryptocurrency(code)[1]}원\n"

today_weather = f'<오늘의 진주 날씨> 기온: {str(get_today_weather()["temperature"])}℃, 체감온도: {str(get_today_weather()["feels_like"])}℃, 최고기온: {str(get_today_weather()["max_temperature"])}℃, 최소기온: {str(get_today_weather()["min_temperature"])}℃\n'
covid_confirm_case = f'<코로나 확진자 수> 오늘의 {get_covid_confirm_case()["update_time"]}은 {get_covid_confirm_case()["total_case"]}명입니다.\n'

content_start = '님 안녕하세요! 공군 훈련병들의 인편지기 보라매인편입니다. \n오늘도 힘든 훈련 하시느라 수고 많으셨습니다. 보라매 인편이 따끈따끈한 오늘자 사회 소식을 전달해드리겠습니다.\n' 
content_end = '오늘의 보라매 인편은 여기까지입니다. 오늘 하루도 수고 많으셨고 몸 건강히 수료하시길 바랍니다 :)'


# 병렬 처리해서 편지 보내는 속도 더 빠르기 하기
for user in users:
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
    if user.stock != "0":
        content += stock(user.stock)
    if user.cryptocurrency != "0":
        content += cryptocurrency(user.cryptocurrency)

    content += today_weather + covid_confirm_case + content_end

    # sender(user.name, user.birth_year, user.birth_month, user.birth_date, content)  
