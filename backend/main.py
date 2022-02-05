from typing import Optional

from fastapi import FastAPI

from database import User

app = FastAPI()

@app.get("/")
def main():
    ed_user = User('haruair', 'Edward Kim', '1234')
    ed_user.name        # 'haruair'
    ed_user.password    # '1234'
    str(ed_user.id)     # 'None'
    return 0

