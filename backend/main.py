from typing import Optional

from fastapi import FastAPI

from bot import news

app = FastAPI()

@app.get("/news")
def get_news():
    return news.get_title()

@app.get("/covid")
def get_covid():
    return news.get_covid_confirm_case()