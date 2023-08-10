## Migration
### 명령어
실행 명령어
>```truffle migrate --network development```

만약, 전의 내용을 reset하고 싶다면..
>```truffle migrate --network development --reset``` 

### 의의
truffle migration 과정은 smart contract를 Ethereum Blockchain에(local또는 testnet, mainnet포함) 올리는 것이다. [migartion 참고자료](https://www.sitepoint.com/truffle-migrations-explained/)

### file 
|파일|의도|
|--|--|
|1_initial_migration.js|기본적으로 truffle migration 작업을 위해 필요한 파일<br>contracts에 있는 [Migrations.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Migrations.sol)을 다루는 파일|
|2_deploy_contracts.js|나머지 contracts들인 [Token.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Token.sol), [SetTeam.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/SetTeam.sol), [Vote.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Vote.sol)들을 migrate 하는 파일|