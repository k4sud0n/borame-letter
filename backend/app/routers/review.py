import os
import sys

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from sqlalchemy import desc

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import Review, session

router = APIRouter(
    prefix='/review'
)

class PostReview(BaseModel):
    title: str
    content: str
    writer: str
    rating: int

@router.get('/')
async def get_review():
    reviews = session.query(Review).order_by(desc(Review.id)).all()
    return reviews

@router.get('/{review_id}')
async def read_review(review_id):
    review = session.query(Review).filter(Review.id == review_id).first()
    
    if review:
        review.writer = review.writer.replace(review.writer[len(review.writer) - 1], '*')
        return review
    else:
        raise HTTPException(status_code=404, detail='Review not found')

@router.post('/')
async def post_review(review: PostReview):
    session.add(Review(review.title, review.content, review.writer, review.rating))
    session.commit()
    return review