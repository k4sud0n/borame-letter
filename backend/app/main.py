from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from routers import user, notice, review

from database import User, session

app = FastAPI()

origins = [
    'https://borameletter.com'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(user.router)
app.include_router(notice.router)
app.include_router(review.router)

@app.get('/')
async def main():
    every_news = open('../letters/every_news.txt', 'r').read()
    political_news = open('../letters/political_news.txt', 'r').read()
    world_news = open('../letters/world_news.txt', 'r').read()
    entertain_news = open('../letters/entertain_news.txt', 'r').read()
    esports_news = open('../letters/esports_news.txt', 'r').read()

    korea_football = open('../letters/korea_football.txt', 'r').read()
    world_football = open('../letters/world_football.txt', 'r').read()
    korea_baseball = open('../letters/korea_baseball.txt', 'r').read()
    world_baseball = open('../letters/world_baseball.txt', 'r').read()

    today_weather = open('../letters/weather.txt', 'r').read()
    covid_confirm_case = open('../letters/covid.txt', 'r').read()

    total_users = session.query(User).count()

    return {
        'total_users': total_users, 
        'letters': {
            'every_news': every_news,
            'political_news': political_news,
            'world_news': world_news,
            'entertain_news': entertain_news,
            'esports_news': esports_news,
            'korea_football': korea_football,
            'world_football': world_football,
            'korea_baseball': korea_baseball,
            'world_baseball': world_baseball,
            'today_weather': today_weather,
            'covid_confirm_case': covid_confirm_case
        }
    }
