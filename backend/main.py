from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

from database import User, session

app = FastAPI()

class NewUser(BaseModel):
    name: str
    cardinal_number: float
    birth_year: float
    birth_month: float
    birth_date: float

@app.get("/")
def hi():
    return 'hi'

@app.post("/submit")
async def submit(user: NewUser):
    session.add(User(user.name, user.cardinal_number, user.birth_year, user.birth_month, user.birth_date))
    session.commit()
    return user