from typing import Optional

from fastapi import FastAPI

from bot import sender, crawler

app = FastAPI()

@app.get("/")
def send_news():
    return sender.get_news_title()

@app.get("/news")
def get_news():
    return crawler.get_news_title()

@app.get("/weather")
def get_covid():
    return crawler.get_today_weather()

@app.get("/covid")
def get_covid():
    return crawler.get_covid_confirm_case()