# solidity code 
truffle, metamask 준비가 다 되었으면, solidity code를 작성해보자.  
먼저, 어떤 작품을 만들고 싶은지를 생각하고, 그에 따라서 어떤 내용의 변수, 함수들이 필요한지 생각을 해야한다. 이 프로젝트는 LCK 대회 기반으로 베팅을 하는 간단한 코드를 만들어보도록 하겠다. 최종 결과물(react에서)의 느낌을 twitch에서 포인트 베팅하는, 유사한 느낌의 사이트를 만들어보는 것이다.

이 페이지는 총 4개의 contract에 대해서 설명할 것이다. 각 contract별로 설명, 간단한 문제, 답이 적혀있다. 
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
-------
이제, 구상하고 있는 아이디어를 코드로 만들어보자. 이 글을 쓰는 날 기준으로, T1과 KT의 경기가 있었다. 이 내용을 우리는 최대한 간단하게 해서, 베팅을 하는 코드를 생각한다면, 기본적으로 무엇이 필요할까? 

당연히 투표할 수 있는 돈이 필요하다. 그 돈에 대한 정의를 내려 여기서 쓰이는 토큰을 만들어보자. 


1. 발행량(totalSupply)
2. 토큰 이름(name) 
3. 단위(symbol) 가 필요하다. 
4. 추가적으로 ETH과 비슷한 맥락으로 갈 것이기 때문에 소수점 자리수도 그냥 만들어주겠다(혹시 나중에 ```web3.utils..```코드를 javascript에서 사용할 수도 있기 때문이다. [참고](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#towei)). 

5. 마지막으로, [cryptoZombies](https://cryptozombies.io/ko/course)를 해봤으면 알겠지만, owner만 실행할 수 있는 함수를 만들게 될테니, **owner**에 대한 주소를 저장할 수 있도록 하자.
6. 진짜 마지막으로, constructor를 이용해서 owner의 주소를 처음 배포하는 사람의 주소로 저장할 수 있도록 하자.
```solidity
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;

contract Token {
  uint256 public totalSupply = 1000000 * (10 ** 18);      // 총 토큰 발행량
  uint8 public decimals = 18;                             // 소수점 자리 수
  string public name = 'lol token';                       // 토큰 이름
  string public symbol = 'lt';                            // 단위
  address public owner;                                   // owner 주소(constructor에 의해서 정해짐)

  constructor () {
    owner = msg.sender;
  }
}
```

* 만약 ```pragma solidity >= 0.5.0```이면 ```constructor() public {}```처럼 ```public```이 들어가야 한다. 이 코드에서는 0.8.18 이상 버전을 사용하기 때문에 public이 들어가지 않았다.
### 2. User
-------
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

### 3. login
-----
유저가 처음에 토큰을 어떻게하면 얻을 수 있을까? 아직까지는 ```userData[msg.sender].balance == 0```이다. 그러면, 로그인이라는 과정을 만들어서 user에게 무료로 일정량의 토큰을 제공하도록 해보자. 유의할 점은, 로그인을 여러번 하면 계속 토큰을 퍼주게 되기 때문에, 그런 문제를 방지하기 위해서 단 한 번만의 로그인이 가능하도록 제한을 해야한다. 또, totalBalance의 양은 유지가 되어야 하기 때문에, totalSupply의 값의 변화를 생각하자.

1. ```mapping registeredUsers```를 만들자. 이 용도는 user가 logIn을 한 번만 할 수 있도록 확인하게 하는 용도이다. logIn이 실행되면 return값을 바뀌게 하고, require문으로 logIn에서 제한을 하도록 하자.

2. ```function logIn()```을 만든다.

3. userData로 User에 접근하여, balance를 10 * (10 ** 18)만큼 제공하고, voted값을 false로 하자.(나중에 쓸 것이다.)

4. user에게 제공한 balance양 만큼, totalSupply에서 빼야 한다. 추가로, 그럴 일은 없겠지만, totalSupply에 남은 값보다 제공해야할 balance 양이 더 많으면 logIn함수는 실행되면 안된다.

```solidity
mapping(address => bool) registeredUsers;

function logIn()public returns(uint){
  require(!registeredUsers[msg.sender], 'You have already registered!');
  require(totalSupply >= 10 * (10 ** 18), 'Not enough totalSupply!');
  registeredUsers[msg.sender] = true;

  userData[msg.sender] = User({
    balance: 10 * (10 ** 18),
    voted: false
  });
  totalSupply -= 10 * (10 ** 18);
  return balanceOf(msg.sender);
}
```

### 4. balanceOf
----
잠시 간단한 내용으로 넘어가도록 하겠다. [ERC 20](https://ethereum.org/ko/developers/docs/standards/tokens/erc-20/)을 보면 balanceOf 함수가 있다. 우리도 이 내용이 베팅하는 과정, 나중에 react에서 user의 balance가 얼마나 있는지 확인하기 위해서 꼭 필요한 함수이다. 한번 만들어보자. 물론, 우리의 balance값을 알기 위해서는 userData에 접근해서 가져와야 한다. 

1. ERC 20을 참고하여 balanceOf 함수를 만들어보자. 
2. 굳이 필요는 없지만, 나중에 react에서 맛을 보기 위해서 owner의 address값을 알려주는 함수를 만들자. 이 함수도 당연히 public view 형식이다.

```solidity
function balanceOf(address _address) public view returns(uint) {
  return userData[_address].balance;
}

function showOwner() public view returns(address) {
  return owner;
}
```

### 현재까지의 Token.sol
-----
```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;
// Token.sol
contract Token {
    uint256 public totalSupply = 1000000 * (10 ** 18);      // 총 토큰 발행량
    uint8 public decimals = 18;                             // 소수점 자리 수
    string public name = 'lol token';                       // 토큰 이름
    string public symbol = 'lt';                            // 단위
    address public owner;                                   // owner 주소(constructor에 의해서 정해짐)

    struct User {
        uint256 balance;    // user의 돈
        bool voted;         // 한 팀에 베팅하면, 추가 베팅을 못하게 하는 변수
    }

    mapping(address => User) userData;          // struct User에 접근하기 위해서 설정
    mapping(address => bool) registeredUsers;   // logIn()함수가 계좌당 한 번만 실행되기 위해서 설정


    constructor () {                            // owner 값 저장해둠
        owner = msg.sender;
    }    

    // 주소에 따른 잔액을 표시
    function balanceOf(address _address) view public returns(uint) {
        return userData[_address].balance;
    }

    function logIn() public returns(uint){
        // logIn()은 한 번만 실행될 수 있음(by mapping -> registeredUsers)
        // 토큰 총 발행량을 넘어서는 유저의 수는 안됨
        require(!registeredUsers[msg.sender], 'You have already registered');
        require(totalSupply >= 10 * (10 ** 18), 'Not enough totalSupply!');
        registeredUsers[msg.sender] = true;

        // user에게 기본 자본, 투표권 등 지급 및 세팅 설정
        userData[msg.sender] = User({
            balance: 10 * (10 ** 18),
            voted: false,
        });
        totalSupply -= 10 * (10 ** 18);
        return balanceOf(msg.sender);
    }

    // 없어도 됨. react에서 owner의 주소를 잘 받아오는지 표기하기 위해서 인위적으로 만들었음
    function showOwner() public view returns(address) {
        return owner;
    }
}
```
## 3. SetTeam.sol
전의 Token.sol은 토큰에 대한 기본적인 관리와 User의 데이터 관리를 중심으로 다루었다. 이번 contract는 실제 lck 팀들이 베팅하기 위해서 필요한 팀에 대한 정보를 관리하는 것이다. LCK 팀들의 팀원 정보, 사진, .. 이런 내용들은 나중에 React에서 API를 사용하는 방식으로 접근할 것이기 때문에, 순수하게 베팅에 필요한 변수들만 관리할 것이다. 

### 1. 상속
SetTeam.sol은 Token.sol을 상속받는 코드이다. 이를 반영해서 기본적인 SetTeam.sol을 작성하자.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;
import './Token.sol';

contract SetTeam is Token {

}
```

### 2. stringTeamName
-----
LCK 팀들의 이름을 Contract에 저장한다고 상상해보자. ```String``` 형식으로 저장하면 상당히 많은 가스비를 사용할 것 같지 않을까? 그래서 나온 대안으로, ```bytes32```로 저장을 하는 것이다. 그러면, String을 입력하면 bytes32로 변환시켜주는 함수가 필요하고, 변환된 데이터를 저장하는 곳이 필요하다.

사실, 이 과정이 굳이 필요없긴한데, 경험이라고 생각하자. 지금의 목적은 최대한 효율적인 무언가를 만드는 것 보다, 경험을 한다는 것이 중요하다고 생각하기 때문이다. 

1. ```function stringToBytes32(string memory source) public pure returns(bytes32 result)```를 만들자. string인 source가 들어가면, bytes32로 바꿔줘야 한다.

2. bytes32로 변환된 데이터를 string으로 다시 저장해주는 ```mapping stringTeamName```을 만들자. 나중에 Betting과정에서 쓰일 것이다.  

```solidity
mapping(bytes32 => string) public stringTeamName;

function stringToBytes32(string memory source) public pure returns(bytes32 result) {
  bytes memory tempEmptyStringTest = bytes(source);
  if(tempEmptyStringTest.length == 0) {
    return 0x0;
  }
  assembly {
    result := mload(add(source, 32))
  }
}
```