from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

from database import User, session

app = FastAPI()

class NewUser(BaseModel):
    name: str
    cardinal_number: int
    birth_year: int
    birth_month: int
    birth_date: int
    category: dict

@app.get("/")
def main():
    return 'Hello, World!'

@app.post("/submit")
async def submit(user: NewUser):
    session.add(User(user.name, user.cardinal_number, user.birth_year, user.birth_month, user.birth_date, user.category['every_news'], user.category['political_news'], user.category['world_news'], user.category['entertain_news'], user.category['esports_news'], user.category['korea_football'], user.category['world_football'], user.category['korea_baseball'], user.category['world_baseball'], user.category['stock'], user.category['cryptocurrency']))
    session.commit()
    return user