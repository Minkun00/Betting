# React에서 사용할 때, 함수로 정해져있어야 꺼내올 수 있다.
from selenium import webdriver
from bs4 import BeautifulSoup
import re
import json

# LCK_MATCH에 대한 데이터를 json파일로 받아옴.
def getMatchData():
    # Chrome WebDriver 실행 가능한 경로 설정 (chromedriver.exe 파일 경로)
    webdriver_path = './chromedriver_win32/chromedriver.exe'

    # 네이버 e스포츠 일정 페이지 URL
    url = 'https://game.naver.com/esports/League_of_Legends/schedule/lck'

    # Chrome WebDriver 옵션 설정
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # 창 숨기기 (headless 모드로 실행)

    # Chrome WebDriver 실행
    driver = webdriver.Chrome(executable_path=webdriver_path, options=options)

    # 웹 페이지 접속
    driver.get(url)

    # 페이지 로딩을 기다리기 위한 implicit wait 설정 (초 단위)
    driver.implicitly_wait(10)

    # 페이지 소스 가져오기
    page_source = driver.page_source

    # Chrome WebDriver 종료
    driver.quit()

    # BeautifulSoup를 사용하여 HTML 파싱
    soup = BeautifulSoup(page_source, 'html.parser')

    # script 태그에서 JSON 데이터 추출
    json_data = None
    scripts = soup.find_all('script')
    for script in scripts:
        if 'id="__NEXT_DATA__"' in str(script):
            json_data = re.search(r'{.*}', str(script)).group(0)
            break
    
    # 추출한 JSON 데이터를 파이썬 객체로 변환
    if json_data:
        json_obj = json.loads(json_data)

    return json_obj

# json_data, 날짜를 받아와서 해당 날의 경기에 대한 사진을 return
# arguments : 
# 1. json_data는 getMatchData()에서 return하는 json_obj를 바로 넣으면 됨
# 2. date의 형식은 "07월 02일 (일)"으로 받아와야 한다.  -> 추후에 현재시간에 맞추어 아직 진행전인 게임의 팀 데이터만 받아오는 방법을 써보겠음
def getImageUrlsByDate(json_data, date):
    home_image_urls = []
    away_image_urls = []
    month_schedule = json_data["props"]["initialState"]["schedule"]["monthSchedule"]
    for entry in month_schedule:
        if entry["groupName"] == date:
            schedules = entry["schedules"]
            for schedule in schedules:
                # 홈 팀, 어웨이 팀의 로고를 받아옴.
                # 하루에 보통 2경기 하기에, home, away team 각 2개씩으로 
                # 총 4개의 url을 배열 형식으로 return한다.
                home_team_image_url = schedule["homeTeam"]["imageUrl"]
                away_team_image_url = schedule["awayTeam"]["imageUrl"]
                home_image_urls.append(home_team_image_url)
                away_image_urls.append(away_team_image_url)
    return home_image_urls, away_image_urls

# test on python
# date = "07월 02일 (일)"
# result_home_image_urls, result_away_image_urls = getImageUrlsByDate(getMatchData(), date)
# print(result_home_image_urls)
# print(result_away_image_urls)

# 결과 : ['https://nng-phinf.pstatic.net/MjAyMzA1MzBfMTQ0/MDAxNjg1NDIxMzgzOTY2.GQkVwv8J6u8Yg0Svnd8sNNORLGk1ul5D2x4mIkACHv4g.IJpn4aOLliIHbBxakciASB_l7zfUaCnAKHc5BOCiwO8g.PNG/rLyTtbtZmVmXloyNgOFk.png', 'https://nng-phinf.pstatic.net/MjAyMzA1MzBfMjkw/MDAxNjg1NDIxMjYzMDU5.vjQ8S0wkSqUrjx6gtPr1MBmRRJSFuHQHmgLsZinlzKEg.zIrC4Ok_ddR22kf3ykv7KB_K6W-gLpPHB_pShfeZYPog.PNG/NfeCtdoSiCsxJecXGKdd.png']
# ['https://nng-phinf.pstatic.net/MjAyMzA1MzBfMjk0/MDAxNjg1NDIxMzg0MjQ3.1VOcqviNN9XAMDBWSjddg5o8Ri9AJUrWjt6sjX3EFWEg.3bnz0Cu_6ZsCgdPxAXlMTMAcMbDau6zHHLsWjXrZ5D8g.PNG/CNWBkgRqBkoIIylCFwMC.png', 'https://nng-phinf.pstatic.net/MjAyMzA3MDhfNTQg/MDAxNjg4Nzg2NDgxMTgw.ExOvdlNrcoNRR80APkGmk2fzMrXJvGvdeFGSOT7rAJwg.3Q3Bd2_Wga5YakbR1pq5LN-uEcpQLM4eyLopYmL4u2Ig.PNG/EQOpfcKWXLcKryzdYXkM.png']