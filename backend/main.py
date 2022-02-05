from typing import Optional

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def main():
    return 0