from typing import Optional

from fastapi import FastAPI

from database import User, session

from sender import sender

app = FastAPI()

@app.get("/")
def main():
    # borame = User('이창연', 834, 2002, 12, 31)
    # session.add(borame)
    # session.commit()
    # print(borame.id)


    # sender('이창연', 2002, 12, 31)

    return 'success'

