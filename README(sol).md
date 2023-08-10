# solidity code 
truffle, metamask 준비가 다 되었으면, solidity code를 작성해보자.  
먼저, 어떤 작품을 만들고 싶은지를 생각하고, 그에 따라서 어떤 내용의 변수, 함수들이 필요한지 생각을 해야한다. 이 프로젝트는 LCK 대회 기반으로 베팅을 하는 간단한 코드를 만들어보도록 하겠다.

## 1. Migrations.sol
가장 먼저 필요한 코드는 Migrations.sol이다. truffle을 사용할 때, terminal에서 우리가 사용할 명령어는 크게 2가지이다. 
```cmd
truffle compile
truffle migrate --network development
```
이 과정에서 필요한 코드가 바로 **contracts -> Migrations.sol**과, 나중에 만들 **migrations -> 1_initial_migrations.js**이다. 자세한 내용은 기니까, [여기](https://ethereum.stackexchange.com/questions/56411/what-is-the-role-of-migrations-sol-contract-in-truffle-project)를 참고하면 좋을 것이다.

이 코드를 얻기 위해서는 Ubuntu에서 ```truffle init``` 한번 해주면 바로 생성된다. 물론, ```truffle init```은 해당 폴더를 초기화 시키고, truffle을 사용할 수 있는 환경을 만들어주는 것이기 때문에, 유의하기를 바란다.

코드의 내용은 다음과 같다. 이 내용은 기본적으로 주어지기 때문에, 궁금하면 추가적으로 찾아보기를 바란다.
```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;
// migration 작업을 위해서 필요한 contract. truffle이기에 필요한 코드이다
contract Migrations {
  address public owner;
  uint256 public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor () {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
```

## 2. Token.sol
### 1. 변수
이제, 구상하고 있는 아이디어를 코드로 만들어보자. 이 글을 쓰는 날 기준으로, T1과 KT의 경기가 있었다. 이 내용을 우리는 최대한 간단하게 해서, 베팅을 하는 코드를 생각한다면, 기본적으로 무엇이 필요할까? 

당연히 투표할 수 있는 돈이 필요하다. 그 돈에 대한 정의를 내려 여기서 쓰이는 토큰을 만들어보자. 


1. **발행량(totalSupply)**
2. **토큰 이름(name)** 
3. **단위(symbol)** 가 필요하다. 
4. 추가적으로 ETH과 비슷한 맥락으로 갈 것이기 때문에 **소수점 자리수**도 그냥 만들어주겠다(혹시 나중에 ```web3.utils..```코드를 javascript에서 사용할 수도 있기 때문이다. [참고](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#towei)). 

5. 마지막으로, [cryptoZombies](https://cryptozombies.io/ko/course)를 해봤으면 알겠지만, owner만 실행할 수 있는 함수를 만들게 될테니, **owner**에 대한 주소를 저장할 수 있도록 하자.
```solidity
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;

contract Token {
    uint256 public totalSupply = 1000000 * (10 ** 18);      // 총 토큰 발행량
    uint8 public decimals = 18;                             // 소수점 자리 수
    string public name = 'lol token';                       // 토큰 이름
    string public symbol = 'lt';                            // 단위
    address public owner;                                   // owner 주소(constructor에 의해서 정해짐)
}
```
### 2. User
유저가 우리의 LCK에 베팅하는 DApp을 사용한다고 생각을 해보자. 먼저 필요한 것은 무엇일까? 어느 팀에 베팅하였는지 정보를 저장해두는 곳이 있어야 한다. 또한, 유저의 Token 보유량 및 중복 투표를 방지하도록 확인할 수 있어야 한다. 이 내용들을 저장하는   ```struct User```를 만들어보자.

그리고, User들의 데이터는 무엇과 연결이 되어야 하는가? 당연히 지갑 주소이다. 그래서 ```mapping```을 통해 User의 데이터를 접근할 수 있게 하자.
```solidity
struct User {
    uint256 balance;    // user의 돈
    bool voted;         // 한 팀에 베팅하면, 추가 베팅을 못하게 하는 변수
}
mapping(address => User) userData;          // struct User에 접근하기 위해서 설정
```
이렇게 하면 msg.sender의 balance는 ```userData[msg.sender].balance```라는 방법으로 접근할 수 있게 된다.
