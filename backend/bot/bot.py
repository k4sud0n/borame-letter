import requests
from bs4 import BeautifulSoup as bs
 
url = 'https://news.daum.net'
response = requests.get(url)
news_titles = []

if response.status_code == 200:
    html = response.text
    soup = bs(html, 'html.parser')
    titles = soup.select_one('body > div.container-doc > main > section > div > div.content-article > div.box_g.box_news_issue > ul').select('li > div > div > strong > a')
    
    for title in titles:
        news_titles.append(title.get_text(" ", strip=True))
else : 
    print(response.status_code)


print(news_titles)
