## python
### getData.py
|function|설명|
|--|--|
|getMatchData( )|lck 대회 일정이 있는 [사이트](https://game.naver.com/esports/League_of_Legends/schedule/lck)를 selenium을 사용해서 동적 크롤링 실시하고<br>얻은 데이터를 json형식을 가지고 있는 부분만 얻어서 return함|
|getImageUrlsByDate(json_data, date)|getMatchData에서 얻은 json파일을 받고, 특정 날짜를 입력받으면<br> 그 당일에 실행했던 대회의 home team, away team의 로고를 각각 배열의 형식으로 return함|

### 다른 파일들
1. faker.html : namu.wiki에서 선수 본명을 입력하면 접근 가능. 선수 초상화를 얻기 위해서 namu.wiki크롤링을 하기 위해서 html data를 받아봤는데 분석 어려움..
2. getLCKMATCH.py : getMatchData( )에서 return하는 json data를 다운함<br>
<br>

### 유의점
selenium을 활용하기 위해서는 chromedriver가 필요.<br> 
만약 코드가 실행되지 않으면 chromedriver 문제일 가능성이 크므로, 확인 필요