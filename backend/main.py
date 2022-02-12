from typing import Optional

from fastapi import FastAPI

from database import User, session

app = FastAPI()

@app.post("/submit")
async def submit():
    session.
    # session.add(User('이창연', 834, 2002, 12, 31))
    # session.commit()
    return 'success'
