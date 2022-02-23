import os
import sys

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from sqlalchemy import desc

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import Notice, session

router = APIRouter(
    prefix='/notice'
)

# class PostNotice(BaseModel):
#     title: str
#     content: str
#     writer: str

@router.get('/', status_code=200)
async def get_notice():
    notices = session.query(Notice).order_by(desc(Notice.id)).all()
    return notices

@router.get('/{notice_id}', status_code=200)
async def read_notice(notice_id):
    notice = session.query(Notice).filter(Notice.id == notice_id).first()
    
    if notice:
        return notice
    else:
        raise HTTPException(status_code=404, detail='Notice not found')

# @router.post('/')
# async def post_notice(notice: NewNotice):
#     session.add(Notice(notice.title, notice.content, notice.writer))
#     session.commit()
#     return notice