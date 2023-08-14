## Migration
### 명령어
----
실행 명령어
>```truffle migrate --network development```

만약, 전의 내용을 reset하고 싶다면..
>```truffle migrate --network development --reset``` 

### 의의
----
truffle migration 과정은 smart contract를 Ethereum Blockchain에(local또는 testnet, mainnet포함) 올리는 것이다. [migartion 참고자료](https://www.sitepoint.com/truffle-migrations-explained/)

### File 
----
|파일|의도|
|--|--|
|1_initial_migration.js|기본적으로 truffle migration 작업을 위해 필요한 파일<br>contracts에 있는 [Migrations.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Migrations.sol)을 다루는 파일|
|2_deploy_contracts.js|나머지 contracts들인 [Token.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Token.sol), [SetTeam.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/SetTeam.sol), [Vote.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Vote.sol)들을 migrate 하는 파일|

### Code
----
기본적으로 **contract**에 있는 파일을 선언한다.
```js
const <FileName> = artifacts.require("<FileName>");
```
그 후, ```deploy```함수를 사용하면 된다. 다만, [**Migrations.sol**](https://github.com/Minkun00/Betting/blob/master/src/contracts/Migrations.sol)은 다른 contract와 직접적 연결이 없어서 상관 없지만, 상속관계에 있는 다른 코드들은 account를 상속받아야 한다. 이는 ```owner address```의 값이기 때문이다. 자세한 코드는 [여기](https://github.com/Minkun00/Betting/blob/master/migrations/2_deploy_contracts.js)에서 볼 수 있다.

이 과정은 제일 간단하게 선언한 것이기 때문에, 복잡한 프로그램을 만들 경우, migration code에 적절히 추가할 수 있어야 한다.
