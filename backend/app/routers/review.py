import os
import re
import sys
import bcrypt
import datetime

from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from fastapi_pagination import Page, add_pagination, paginate

from sqlalchemy import desc, func

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import Review, session

router = APIRouter(
    prefix='/review'
)

class GetReview(BaseModel):
    id: int
    title: str
    content: str
    writer: str
    rating: int
    created_at: datetime.datetime

class PostReview(BaseModel):
    title: str
    content: str
    writer: str
    password: str
    rating: int

class PatchReview(BaseModel):
    id: int
    title: str
    content: str
    writer: str
    password: str
    rating: int

class DeleteReview(BaseModel):
    password: str

@router.get('/', status_code=200, response_model=Page[GetReview])
async def get_review():
    reviews = session.query(Review.id, Review.title, Review.content, func.regexp_replace(Review.writer, '(?<=.{1}).', '*').label('writer'), Review.rating, Review.created_at).order_by(desc(Review.id)).all()
    return paginate(reviews)

@router.post('/', status_code=201)
async def post_review(review: PostReview):
    password = bcrypt.hashpw(review.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    review = Review(review.title, review.content, review.writer, password, review.rating)

    session.add(review)
    session.commit()

    session.refresh(review)

    return review

@router.get('/{review_id}', status_code=200)
async def read_review(review_id):
    review = session.query(Review).filter(Review.id == review_id).first()
    
    if review:
        review.writer = re.sub('(?<=.{1}).', '*', review.writer)
        return review
    else:
        raise HTTPException(status_code=404, detail='Review not found')

@router.patch('/{review_id}', status_code=200)
async def patch_review(review: PatchReview, review_id):
    exist_review = session.query(Review).filter(Review.id == review_id).first()

    if exist_review:
        check_password = bcrypt.checkpw(review.password.encode('utf-8'), exist_review.password.encode('utf-8'))
        
        if check_password:
            exist_review.title = review.title
            exist_review.content = review.content
            session.commit()
            return review
        else:
            raise HTTPException(status_code=403, detail='Wrong password')
    else:
        raise HTTPException(status_code=404, detail='Review not found')

@router.delete('/{review_id}', status_code=200)
async def delete_review(review: DeleteReview, review_id):
    exist_review = session.query(Review).filter(Review.id == review_id).first()

    if exist_review:
        check_password = bcrypt.checkpw(review.password.encode('utf-8'), exist_review.password.encode('utf-8'))
        
        if check_password:
            session.delete(exist_review)
            session.commit()
            raise HTTPException(status_code=200, detail='Delete successfully')
        else:
            raise HTTPException(status_code=403, detail='Wrong password')
    else:
        raise HTTPException(status_code=404, detail='Review not found')

add_pagination(router)