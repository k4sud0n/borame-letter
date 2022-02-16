import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String

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

    id = Column(Integer, primary_key=True)
    name = Column(String(length=10))
    cardinal_number = Column(Integer)
    birth_year = Column(Integer)
    birth_month = Column(Integer)
    birth_date = Column(Integer)

    # 구독 목록
    every_news = Column(Boolean, default=True)
    political_news = Column(Boolean, default=False)
    world_news = Column(Boolean, default=False)
    entertain_news = Column(Boolean, default=False)
    esports_news = Column(Boolean, default=False)

    korea_football = Column(Boolean, default=False)
    world_football = Column(Boolean, default=False)
    korea_baseball = Column(Boolean, default=False)
    world_baseball = Column(Boolean, default=False)
    
    stock = Column(Boolean, default=False)
    crpytocurrency = Column(Boolean, default=False)

    today_weather = Column(Boolean, default=True)
    covid_confirm_case = Column(Boolean, default=True)
    
    def __init__(self, name, cardinal_number, birth_year, birth_month, birth_date):
        self.name = name
        self.cardinal_number = cardinal_number
        self.birth_year = birth_year
        self.birth_month = birth_month
        self.birth_date = birth_date

    def __repr__(self):
        return "<User('%s', '%s', '%s - %s - %s')>" % (self.name, self.cardinal_number, self.birth_year, self.birth_month, self.birth_date)

User.__table__.create(bind=engine, checkfirst=True)