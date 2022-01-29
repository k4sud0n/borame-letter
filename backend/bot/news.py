import requests
from bs4 import BeautifulSoup as bs
 
def get_title():
    url = 'https://news.daum.net'
    response = requests.get(url)

    news_titles = []

    if response.status_code == 200:
        html = response.text
        soup = bs(html, 'html.parser')
        titles = soup.select_one('body > div.container-doc > main > section > div > div.content-article > div.box_g.box_news_issue > ul').select('li > div > div > strong > a')
        
        for title in titles:
            news_titles.append(title.get_text(" ", strip=True))

        return news_titles
    else : 
        return response.status_code

def get_covid_confirm_case():
    url = 'https://api.corona-19.kr/korea/?serviceKey=key'

    print( requests.get(url).text.TotalCaseBefore )