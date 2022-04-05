import os
import sys
import time
import inspect
import logging

from datetime import datetime
from dotenv import load_dotenv

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

wait = WebDriverWait(driver, 10)

load_dotenv()

def sender(name, birth_year, birth_month, birth_date, content):
    try:
        driver.get('https://www.airforce.mil.kr/user/indexSub.action?codyMenuSeq=156893223&siteId=last2&menuUIType=top')

        name = driver.find_element(By.ID, 'searchName').send_keys(name)
        birth_year = driver.find_element(By.ID, 'birthYear').send_keys(birth_year)
        birth_month = driver.find_element(By.ID, 'birthMonth').send_keys(birth_month)
        birth_date = driver.find_element(By.ID, 'birthDay').send_keys(birth_date)

        # 훈련병 검색
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="btnNext"]')))
        driver.find_element(By.XPATH, '//*[@id="btnNext"]').click()
        print('훈련병 검색 성공')


        # 창 전환 후 훈련병 선택
        driver.switch_to.window(driver.window_handles[1])
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="emailPic-container"]/ul/li/input')))
        driver.find_element(By.XPATH, '//*[@id="emailPic-container"]/ul/li/input').click()
        print('창 전환 후 훈련병 선택 성공')

        # 창 전환 후 편지쓰기 클릭
        driver.switch_to.window(driver.window_handles[0])
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="btnNext"]')))
        driver.find_element(By.XPATH, '//*[@id="btnNext"]').click()
        print('창 전환 후 편지쓰기 클릭 성공')

        # 인터넷 편지쓰기 버튼 클릭
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="emailPic-container"]/div[3]/span/input')))
        driver.find_element(By.XPATH, '//*[@id="emailPic-container"]/div[3]/span/input').click()
        print('인터넷 편지쓰기 버튼 클릭 성공')

        # 우편번호 검색 버튼 클릭 후 창 전환
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="emailPic-container"]/form/div[1]/table/tbody/tr[3]/td/div[1]/span/input')))
        driver.find_element(By.XPATH, '//*[@id="emailPic-container"]/form/div[1]/table/tbody/tr[3]/td/div[1]/span/input').click()
        driver.switch_to.window(driver.window_handles[1])
        print('우편번호 검색 버튼 클릭 후 창 전환 성공')

        # 주소 검색
        wait.until(EC.presence_of_element_located((By.ID, "keyword")))
        driver.find_element(By.ID, 'keyword').send_keys('경남 진주시 금산면 송백로 46')
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="searchContentBox"]/div[1]/fieldset/span/input[2]')))
        driver.find_element(By.XPATH, '//*[@id="searchContentBox"]/div[1]/fieldset/span/input[2]').click()
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="roadAddrTd1"]/a')))
        driver.find_element(By.XPATH, '//*[@id="roadAddrTd1"]/a').click()
        print('주소 검색 성공')

        # 상세주소 입력 후 창 전환
        driver.find_element(By.ID, 'rtAddrDetail').send_keys('경남 진주시 금산면 송백로 46')
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="resultData"]/div/a')))
        driver.find_element(By.XPATH, '//*[@id="resultData"]/div/a').click()
        driver.switch_to.window(driver.window_handles[0])
        print('상세주소 입력 후 창 전환 성공')

        # 발신자 이름, 관계 입력
        driver.find_element(By.ID, 'senderName').send_keys('보라매인편')
        driver.find_element(By.ID, 'relationship').send_keys('인편지기')
        print('발신자 이름, 관계 입력 성공')

        # 제목 입력
        driver.find_element(By.ID, 'title').send_keys(f'{datetime.now().strftime("%m월 %d일")} 보라매인편')
        print('제목 입력 성공')

        # 내용 입력
        driver.find_element(By.ID, 'contents').send_keys(content)
        print('내용 입력 성공')

        # 비밀번호 입력
        driver.find_element(By.ID, 'password').send_keys(str(os.environ.get('LETTER_PASSWORD')))
        print('비밀번호 입력 성공')

        # 편지쓰기 클릭
        wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="emailPic-container"]/form/div[2]/span[1]/input')))
        driver.find_element(By.XPATH, '//*[@id="emailPic-container"]/form/div[2]/span[1]/input').click()
        print('편지쓰기 클릭 성공')
    except Exception as e: 
        print(e)
    finally:
        driver.quit()
        
        return driver
