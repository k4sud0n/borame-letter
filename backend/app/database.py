import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, Boolean, DateTime

load_dotenv()

SQLALCHEMY_DATABASE_URL = str(os.environ.get('DB_URL'))

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Session.configure(bind=engine)

Base = declarative_base()

session = Session()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, nullable=False, primary_key=True)
    name = Column(String(length=10), nullable=False)
    cardinal_number = Column(Integer, nullable=False)
    birth_year = Column(Integer, nullable=False)
    birth_month = Column(Integer, nullable=False)
    birth_date = Column(Integer, nullable=False)

    # 구독 목록
    every_news = Column(Boolean, nullable=False, default=False)
    political_news = Column(Boolean, nullable=False, default=False)
    world_news = Column(Boolean, nullable=False, default=False)
    entertain_news = Column(Boolean, nullable=False, default=False)
    esports_news = Column(Boolean, nullable=False, default=False)

    korea_football = Column(Boolean, nullable=False, default=False)
    world_football = Column(Boolean, nullable=False, default=False)
    korea_baseball = Column(Boolean, nullable=False, default=False)
    world_baseball = Column(Boolean, nullable=False, default=False)
    
    stock = Column(String(length=10), nullable=False)
    cryptocurrency = Column(String(length=10), nullable=False)

    today_weather = Column(Boolean, nullable=False, default=True)
    covid_confirm_case = Column(Boolean, nullable=False, default=True)
    
    def __init__(self, name, cardinal_number, birth_year, birth_month, birth_date, every_news, political_news, world_news, entertain_news, esports_news, korea_football, world_football, korea_baseball, world_baseball, stock, cryptocurrency):
        self.name = name
        self.cardinal_number = cardinal_number
        self.birth_year = birth_year
        self.birth_month = birth_month
        self.birth_date = birth_date

        self.every_news = every_news
        self.political_news = political_news
        self.world_news = world_news
        self.entertain_news = entertain_news
        self.esports_news = esports_news

        self.korea_football = korea_football
        self.world_football = world_football
        self.korea_baseball = korea_baseball
        self.world_baseball = world_baseball

        self.stock = stock
        self.cryptocurrency = cryptocurrency

    def __repr__(self):
        return '<User("%s", "%s", "%s/%s/%s", "every_news: %s", "political_news: %s", "world_news: %s", "entertain_news: %s", "esports_news: %s", "korea_football: %s", "world_football: %s", "korea_baseball: %s", "world_baseball: %s", "stock: %s", "cryptocurrency: %s")>' % (self.name, self.cardinal_number, self.birth_year, self.birth_month, self.birth_date, self.every_news, self.political_news, self.world_news, self.entertain_news, self.esports_news, self.korea_football, self.world_football, self.korea_baseball, self.world_baseball, self.stock, self.cryptocurrency)

class Notice(Base):
    __tablename__ = 'notice'

    id = Column(Integer, nullable=False, primary_key=True)
    title = Column(String(length=100), nullable=False)
    content = Column(String(length=5000), nullable=False)
    writer = Column(String(length=10), nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    def __init__(self, title, content, writer):
        self.title = title
        self.content = content
        self.writer = writer

    def __repr__(self):
        return f'<Notice(({self.id}) {self.title})>'

class Review(Base):
    __tablename__ = 'review'

    id = Column(Integer, nullable=False, primary_key=True)
    title = Column(String(length=100), nullable=False)
    content = Column(String(length=5000), nullable=False)
    writer = Column(String(length=10), nullable=False)
    password = Column(String(length=64), nullable=False)
    rating = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())

    def __init__(self, title, content, writer, password, rating):
        self.title = title
        self.content = content
        self.writer = writer
        self.password = password
        self.rating = rating

    def __repr__(self):
        return f'<Review(({self.id}) {self.title})>'

User.__table__.create(bind=engine, checkfirst=True)
Notice.__table__.create(bind=engine, checkfirst=True)
Review.__table__.create(bind=engine, checkfirst=True)