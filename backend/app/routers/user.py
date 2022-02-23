import os
import sys

from fastapi import APIRouter
from pydantic import BaseModel

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import User, session

router = APIRouter(
    prefix='/user'
)

class PostUser(BaseModel):
    name: str
    cardinal_number: int
    birth_year: int
    birth_month: int
    birth_date: int
    category: dict

class PatchUser(BaseModel):
    name: str
    cardinal_number: int
    birth_year: int
    birth_month: int
    birth_date: int
    category: dict

class CheckUser(BaseModel):
    name: str
    cardinal_number: int
    birth_year: int
    birth_month: int
    birth_date: int

@router.post('/', status_code=201)
async def post_user(user: PostUser):
    session.add(User(user.name, user.cardinal_number, user.birth_year, user.birth_month, user.birth_date, user.category['every_news'], user.category['political_news'], user.category['world_news'], user.category['entertain_news'], user.category['esports_news'], user.category['korea_football'], user.category['world_football'], user.category['korea_baseball'], user.category['world_baseball'], user.category['stock'], user.category['cryptocurrency']))
    session.commit()
    return user

@router.patch('/', status_code=200)
async def patch_user(user: PatchUser):
    exist_user = session.query(User).filter(User.name == user.name, User.birth_year == user.birth_year, User.birth_month == user.birth_month, User.birth_date == user.birth_date).first()

    if exist_user:
        exist_user.every_news = user.category['every_news']
        exist_user.political_news = user.category['political_news']
        exist_user.world_news = user.category['world_news']
        exist_user.entertain_news = user.category['entertain_news']
        exist_user.esports_news = user.category['esports_news']
        exist_user.korea_football = user.category['korea_football']
        exist_user.world_football = user.category['world_football']
        exist_user.korea_baseball = user.category['korea_baseball']
        exist_user.world_baseball = user.category['world_baseball']
        exist_user.stock = user.category['stock']
        exist_user.cryptocurrency = user.category['cryptocurrency']
        session.commit()
        return user
    else:
        raise HTTPException(status_code=404, detail="User doesn't exists")

@router.post('/check', status_code=200)
async def check_user(user: CheckUser):
    exist_user = session.query(User).filter(User.name == user.name, User.birth_year == user.birth_year, User.birth_month == user.birth_month, User.birth_date == user.birth_date).first()

    if exist_user:
        return {'status': 'User already exists', 'user': exist_user}
