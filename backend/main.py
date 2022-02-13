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
    # session.add(User('이창연', 834, 2002, 12, 31))
    # session.commit()
    return user