from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
from sqlalchemy import desc

from database import User, Notice, Review, session

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewUser(BaseModel):
    name: str
    cardinal_number: int
    birth_year: int
    birth_month: int
    birth_date: int
    category: dict

class NewNotice(BaseModel):
    title: str
    content: str
    writer: str

class NewReview(BaseModel):
    title: str
    content: str
    writer: str
    rating: int

@app.get("/")
def main():
    return 'Hello, Borame Letter!'

@app.post("/user")
async def post_user(user: NewUser):
    session.add(User(user.name, user.cardinal_number, user.birth_year, user.birth_month, user.birth_date, user.category['every_news'], user.category['political_news'], user.category['world_news'], user.category['entertain_news'], user.category['esports_news'], user.category['korea_football'], user.category['world_football'], user.category['korea_baseball'], user.category['world_baseball'], user.category['stock'], user.category['cryptocurrency']))
    session.commit()
    return user

@app.get("/notice")
async def get_notice():
    notices = session.query(Notice).order_by(desc(Notice.id)).all()
    return notices

@app.get("/notice/{notice_id}")
async def read_notice(notice_id):
    notice = session.query(Notice).filter(Notice.id == notice_id).all()
    return notice

# @app.post("/notice")
# async def post_notice(notice: NewNotice):
#     session.add(Notice(notice.title, notice.content, notice.writer))
#     session.commit()
#     return notice

@app.get("/review")
async def get_review():
    reviews = session.query(Review).order_by(desc(Review.id)).all()
    return reviews

@app.get("/review/{review_id}")
async def read_review(review_id):
    review = session.query(Review).filter(Review.id == review_id).all()
    return review

@app.post("/review")
async def post_review(review: NewReview):
    session.add(Review(review.title, review.content, review.writer, review.rating))
    session.commit()
    return review