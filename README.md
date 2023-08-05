# Betting
**목적** : lck betting 과정을 통해 solidity, react를 사용하면서 기초적인 이해하기

**환경** : **WSL: Ubuntu**에서 truffle, ganache, react 사용
## src 구조(08/05)
```
 ┣ 📂contracts      // contracts 저장
 ┃ ┣ 📜.gitkeep
 ┃ ┣ 📜Migrations.sol
 ┃ ┣ 📜SetTeam.sol
 ┃ ┣ 📜Token.sol
 ┃ ┗ 📜Vote.sol
 ┣ 📂navbar         // react - navbar
 ┃ ┗ 📜Navbar.jsx
 ┣ 📂owner          // react - localhost:3000/owner
 ┃ ┣ 📂function             // owner에서 사용될 함수(contracts)
 ┃ ┃ ┗ 📜Ownerfunction.js
 ┃ ┣ 📂src                  // class 형식으로 만들어짐
 ┃ ┃ ┣ 📜GameEnd.js
 ┃ ┃ ┣ 📜GetMatch.js
 ┃ ┃ ┗ 📜LCK_MATCH.json // 대회 대진표(crawling)
 ┃ ┗ 📜Owner.js            // src가 여기에 합쳐짐
 ┣ 📂truffle_abis           // compiled contracts
 ┃ ┣ 📜Migrations.json
 ┃ ┣ 📜SetTeam.json
 ┃ ┣ 📜Token.json
 ┃ ┗ 📜Vote.json
 ┣ 📂user           // react - localhost:3000
 ┃ ┣ 📜Main.js      
 ┃ ┗ 📜Mainfunction.js
 ┣ 📜App.css
 ┣ 📜App.js         // 최종적으로 Owner.js, Main.js가 합쳐지는 곳
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
 ```