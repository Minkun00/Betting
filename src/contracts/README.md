# solidity code 
truffle, metamask 준비가 다 되었으면, solidity code를 작성해보자.  
먼저, 어떤 작품을 만들고 싶은지를 생각하고, 그에 따라서 어떤 내용의 변수, 함수들이 필요한지 생각을 해야한다. 이 프로젝트는 LCK 대회 기반으로 베팅을 하는 간단한 코드를 만들어보도록 하겠다. 최종 결과물(react에서)의 느낌을 twitch에서 포인트 베팅하는, 유사한 느낌의 사이트를 만들어보는 것이다.

가장 중요한 것은, 이 내용들을 간단히 익히고, 자신만의 다른 작품을 만드는 것이 가장 좋다고 생각한다. 이 프로젝트 역시 인터넷 강의를 듣고, 기본적인 지식을 익힌 후에 우리만의 방법으로 다른 것을 만들었기 때문이다. 여러분들도 그러기를 바란다. 다시 말해, 재미로 보고, 응용할 부분을 응용하고, 여기 쓰인 것이 마음에 안드는 것은 다른 방법으로 시도해보기를 바란다.

이 페이지는 총 4개의 contract에 대해서 설명할 것이다. 각 contract별로 설명, 간단한 문제, 답이 적혀있다. 
## 1. Migrations.sol
가장 먼저 필요한 코드는 **Migrations.sol**이다. truffle을 사용할 때, terminal에서 우리가 사용할 명령어는 크게 2가지이다. 
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
전의 **Token.sol**은 토큰에 대한 기본적인 관리와 User의 데이터 관리를 중심으로 다루었다. 이번 contract는 실제 lck 팀들이 베팅하기 위해서 필요한 팀에 대한 정보를 관리하는 것이다. LCK 팀들의 팀원 정보, 사진, .. 이런 내용들은 나중에 React에서 API를 사용하는 방식으로 접근할 것이기 때문에, 순수하게 베팅에 필요한 변수들만 관리할 것이다. 

### 1. 상속
----
**SetTeam.sol**은 **Token.sol**을 상속받는 코드이다. 이를 반영해서 기본적인 **SetTeam.sol**을 작성하자.

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
### 3. onlyOwner
-----
원래 **Token.sol**에서 사용된 ```address owner```를 상속받은 SetTeam에서 쓸 수 있다. 그래서 modifier onlyOwner()를 만들어 볼 것이다. 뜬금없이 튀어나오는 내용일 수 있는데, 의식의 흐름대로 쓰고 있어서 그렇다. 

1. ```modifier onlyOwner()```를 만들어보자. ```msg.sender```와 ```owner```값이 동일해야 실행 될 수 있게 하는 제한자이다.

```solidity
modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}
```

### 정리
------
```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;
import './Token.sol';

contract SetTeam is Token {
    // 팀 관련 변수 접근은 모두 mapping으로 들어감
    // stringToBytes32(<Team Name>) 을 mapping에 넣어야 해당 값이 튀어나오게 했음.

    mapping(bytes32 => string) public stringTeamName;
    // team이 입력되었는지 확인용으로 만든 mapping

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function stringToBytes32(string memory source) public pure returns(bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if(tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }
}
```

## 4. Vote.sol
지금까지 만든 것들은 **Vote.sol**을 실행하기 위한 초석들이다. 처음부터 완벽하게 contract들을 짜지 않았기에, **Vote.sol**을 만들면서 추가적으로 필요한 것들을 **Token.sol, SetTeam.sol**에 추가하면서 만들어보자. 

물론, **Vote.sol**은 **SetTeam.sol**을 상속받고 있다.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0; //>=0.8.18 <0.9.0
import './SetTeam.sol';
// Vote.sol

contract Vote is SetTeam {

}
```

### 1. 생각하는 시간
----
잠시 정리하는 시간을 가져보자. 실제 베팅의 과정을 어떻게 해야 할까? React에서 실제 LCK 매칭 데이터를 어떻게든 가져온다고 생각을 해보자(이때까지는 API 사용이 아닌 Crawling으로 해결하려고 했다. 만약 python Crawling 과정이 궁금하다면 [여기](https://github.com/Minkun00/vote/tree/main/src/python)). 

상상으로 React화면을 상상하면서 해보자.. 

>1. React에서 LCK Match 한 게임의 팀 이름의 값을 가져온다. 
>
>2. 두 팀 이름을 Contract에 저장하고, 게임 시작을 알린다.
>3. User들이 두 팀 중 어디가 이길지 베팅을 한다
>4. 게임 결과가 나오면 게임 종료 선언 및 승자 선언을 한다.
>5. User들은 자신들의 베팅 결과에 따른 돈을 받아간다.(베팅된 금액의 비율에 따라서 받아감)
>6. User들이 다 받아가면 다음 게임 Setting을 위한 준비를 한다.<br>
>(1 ~ 6 과정의 반복)

이러한 과정을 만들기 위해서 solidity로는 2 ~ 6의 과정을 함수로 만들 수 있다. 

### 2. Versus
----
위에서 말한 순서대로 과정이 이루어지기 위해서 ```require, modifier```를 적절히 사용해야한다. 제일 중요한 것은 2번 과정이라고 생각한다. Contract에 매치가 저장이 되어있는지 확인하는 modifier를 작성해보자. 당연히, 매치를 저장하는 함수도 필요하다. 

1. ```bool public versusExecuted```를 선언하고, 기본값을 false로 설정하자.(기본적으로 선언을 안하면 false라고 하는데, 혹시 모르니 해두는걸로..)

2. ```modifier onlyBeforeVersus```와 ```modifier onlyAfterVersus```를 만들자. 전자는 ```versusExectued == false```이어야 진행시키고, 후자는 ```true```인 경우에 진행시키게 하는 것이다.

3. ```function versus```를 설정한다. 두 팀의 이름을 저장하는 함수이다. 이 함수는 팀 이름을 받아서 저장한다. 저장하는 곳은 이 contract안에 ```bytes32 public team1```처럼 선언하자. 당연히 team2도 선언해야 한다. ```bytes32```는 **SetTeam.sol**에 있는 함수를 적절히 사용하면 될 것이다.

4. ```function versus```에서는 ```onlyBeforeVersus```가 적용되어야 한다. 또, owner만 실행할 수 있게 ```onlyOwner```도 적용되어야 한다.

```solidity
bytes32 public team1;
bytes32 public team2;

bool public versusExecuted = false;

modifier onlyBeforeVersus() {
  require(!versusExecuted, "Versus has already been executed!");
  _;
}
modifier onlyAfterVersus() {
  require(versusExecuted, "Versus has not been executed yet");
  _;
}

function versus(string calldata _team1, string calldata _team2) public onlyBeforeVersus onlyOwner{
  team1 = stringToBytes32(_team1);
  team2 = stringToBytes32(_team2);
  stringTeamName[team1] = _team1;
  stringTeamName[team2] = _team2;

  versusExecuted = true;
}
```

### 3. Vote
----
#### 3.1 Token.sol 추가
----
이제, user들이 베팅을 하는 함수를 만들어보자. **Token.sol**에서 사용한 userData가 이제 여기서 쓰이게 된다. 아직은 우리가 ```Struct User```에 balance와 voted만 있어서, 어떤 팀을 투표했는지에 대한 정보, 얼마나 돈을 넣었는가에 대한 정보도 필요하다. 그래서 **Token.sol**의 내용을 추가해야한다.

1. ```Struct User```에 어떤 팀에 베팅했는지 저장하는```teamName```과, 얼마를 베팅했는지 저장하는 ```voteBalance```를 입력하자.

2. **Token.sol** ```balanceOf```처럼 추가한 두 정보를 볼 수 있는 함수를 만들자. 각각 ```voteBalanceOf```, ```getUserVotedTeamName```의 이름으로 만들자.

3. ```logIn```함수에서 돈을 주는 과정을 보면, 우리가 추가한 정보도 입력해줘야 할 것이다. ```teamName```은 ```''```을 배정하고, ```voteBalance```는 ```0```을 배정하자.

```solidity
struct User {
  uint256 balance;    // user의 돈
  bool voted;         // 한 팀에 베팅하면, 추가 베팅을 못하게 하는 변수
  bytes32 teamName;     // user가 베팅한 팀명( hashed by function stringToBytes32() )
  uint voteBalance;   // 그 팀에 얼마를 박았는가?(박은 비율에 따라서 돈을 되돌려주기 때문에 설정했음)
}

// 주소에 따른 베팅금액 표시
function voteBalanceOf(address _address) view public returns(uint) {
  return userData[_address].voteBalance;
}
// 주소에 따른 베팅을 한 팀명 표시
function getUserVotedTeamName(address _address) view public returns(bytes32) {
  return userData[_address].teamName;
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
    teamName: '',
    voteBalance: 0
  });
  totalSupply -= 10 * (10 ** 18);
  return balanceOf(msg.sender);
}
```
#### 3.2 SetTeam.sol 추가
----
이번에는 팀과 관련된 값들을 추가해야한다. 팀에 얼마나 베팅되었는지 확인하기 위해서 teamWeight를 설정하고, 이 값을 확인할 수 있는 함수를 선언해야한다.

1. ```mapping으로 public teamWeight```를 선언하자. 팀 이름이 입력되면, 저장된 token의 양을 저장하는 용도이다.

2. ```function getTeamWeightByTeamName```을 선언하자. ```_teamName```을 입력받으면, 해당 팀의```teaWeight```값을 알려주게 하자.

```solidity
mapping(bytes32 => uint) public teamWeight;

function getTeamWeightByTeamName(string calldata _teamName) external view returns(uint) {
  return teamWeight[stringToBytes32(_teamName)];
}
```

#### 3.3 Vote.sol 추가
----
이제, ```function vote```를 만들 차례이다. 팀 이름과, 베팅하고 싶은 금액을 받아서 베팅을 한다. 

1. ```function vote()```에서 ```string```형식의 ```_teamName```과, 베팅 금액인 ```_amount```들을 인수로 받고, ```onlyAfterVersus```가 성립해야지 실행할 수 있게 하자.

2. 방금 **Token.sol**에서 나온 voted라는 변수를 여기서 쓰게 된다. voted가 false이어야지만 vote를 실행할 수 있다. 당연히 ```_amount```가 user의 balance보다 많아야 할 수 있게 하자.

3. ```bytes32 teamName```을 선언하고, 입력받은 ```_teamName```을 저장하자. ```require```문으로 **Vote.sol**의 ```team1, team2```둘 중 하나에 맞는 값인지 확인하자.

4. ```_amount```값은 user의 ```balance```에서 차감하고, ```teamWeight```에 추가하자. 그리고, user의 ```voteBalance```에 추가하자. 나중에 이긴 팀에 얼마나 베팅했는지 비율을 확인하기 위함이다.

5. 투표를 완료했으니, user의 ```voted```를 ```true```로 바꾸고, ```teamName```값을 ```function vote```안에서 정의한 ```teamName```을 저장하자.

6. 그냥 혹시 모르니 return하는 값은 true로 한다. 이유는 딱히 없다.

```solidity
function vote(string calldata _teamName, uint _amount) public onlyAfterVersus returns (bool) {
  require(!userData[msg.sender].voted, "You have already voted!");
  require(balanceOf(msg.sender) >= _amount, "Not enough tokens!");
        
  bytes32 teamName = stringToBytes32(_teamName);
  require(teamName == team1 || teamName == team2, "Invalid team name!");

  userData[msg.sender].balance -= _amount;
  teamWeight[teamName] += _amount;

  userData[msg.sender].voteBalance += _amount;

  userData[msg.sender].voted = true;
  userData[msg.sender].teamName = teamName;

  return true;
}
```

### 4. gameEnd
----
이제, 매치가 끝났을 때, 승 패를 정해주는 함수를 선언하자. 여기서 중요한 점은, 진 팀의 ```teamWeight```를 이긴 팀에 몰아줘야 하는 것이다. 그리고, 비율 계산을 하기 위해서, ```teamWeight```를 옮기기 전의 이긴 팀의 ```teamWeight```를 저장해두어야 한다. 점점 헷갈리기 시작하는데, 여기서 어떤 값들이 실제 ```token```에 해당하는지 명확하게 밝혀둘 필요가 있다. 

```totalSupply```, ```teamWeight```, ```balance```가 실제 ```token```에 해당하는 것이고, 나머지 변수들(예를 들어 ```User -> voteBalance``` 등)은 계산 용일 뿐이다. 이론적으로 처음 deploy한 ```totalSupply```에서 ```token```의 양은 유지가 된다.

1. 이긴 팀의 이름을 저장하는 ```teamNameWin```을 선언하자. 그리고 default 값은 ```stringToBytes32('none')```으로 하자. 

2. 잠시 **SetTeam.sol**로 넘어가서, 총 베팅된 돈을 저장하는 변수인 ```bettingTotalBalance```와, 이긴 팀에 저장됬던 돈을 저장하는 변수인 ```winnerTeamPureBalance```를 선언하자.

3. 다시 **Vote.sol**로 돌아와서, 지금까지 선언했던 변수들을 활용하도록 하자. ```function gameEnd```를 만들고, ```onlyAfterVersus```와```onlyOwner```이어야지 실행할 수 있게 하자.
입력받는 인수는 ```_teamNameWin```, ```_teamNameLose```이다. 물론, ```string```형식이다.

4. ```gameEnd```안에 ```bytes32 win```, ```bytes32 lose```를 선언하고, 각각 입력받은 인수들을 저장하자. 그리고, ```require```문으로 이 값들이 ```function versus()```에서 저장했던 ```team1, team2```에 있는 값인지 학인하도록 하자.

5. 이제, ```teamNameWin```에 ```win```을 저장하고, ```winnerTeamPuerBalance```값에 이긴 팀의 ```teamWegiht```를 저장하자. 그 후, 이긴 팀의 ```teamWeight```에 진 팀의 ```teamWeight```를 몰아넣고, 진 팀의 ```teamWeight```는 ```0```으로 초기화하자. 당연히 ```bettingTotalBalance```에  이긴 팀의 몰아넣은 ```teamWeight```를 저장하자.

6. 이긴 팀의 이름을 저장하기 위해서 ```mapping stringTeamName```에 ```teamNameWin```을 ```_teamNameWin```에 매칭하도록 하자.
```solidity
// SetTeam.sol
uint bettingTotalBalance = 0;
uint winnerTeamPureBalance = 0;
```


```solidity
// Vote.sol
bytes32 public teamNameWin = stringToBytes32('none');

function gameEnd(string calldata _teamNameWin, string calldata _teamNameLose) public onlyAfterVersus onlyOwner {
  bytes32 win = stringToBytes32(_teamNameWin);
  bytes32 lose = stringToBytes(_teamNameLose);
  require(win == team1 || win == team2);
  require(lose == team1 || lose == team2);
  
  teamNameWin = win;

  winnerTeamPureBalance = teamWeight[win];
  teamWeight[win] += teamWeight[lose];
  bettingTotalBalance = teamWeight[win];
  teamWeight[lose] = 0;

  stringTeamName[teamNameWin] = _teamNameWin;
}
```

### 5. returnBettingResult
----
이제, 돈을 받아가는 함수를 만들어야한다. **Token.sol**에서 나온 ```Struct User -> teamName```이 ```teamNameWin```과 같으면 돈을 받아가면 된다. 그리고, ```Struct User -> voted```를 다시 ```false```가 되어야지 나중에 또 베팅을 할 수 있을 것이다.

참고로, 비율은 user가 베팅한 값 / ```winnerTeamPureBalance```일 것이다.

1. ```function returnBettingResult```를 만들자. ```onlyAfterVersus```를 만족해야 하고, ```uint```값을 return하도록 하겠다. 

2. ```gameEnd```이후에 실행이 되어야 하기 때문에, ```teamNameWin```이 ```bytes32 -> 'none'```이 아니어야 실행할 수 있게 하자.

3. ```uint amountToReturn = 0;``` 을 선언하자. 이게 되돌려주는 돈을 의미한다.

4. 이긴 팀을 골랐을 경우를 확인하는 ```if```문을 쓰고, 비율을 반영해서 베팅한 값에 따른 돈을 받는 값을 설정하자. 이 값을 ```amountToReturn```에 저장하도록 하겠다. 이 값을 user의 ```balance```에 더하게 하고, ```teamWeight```에서 빼자. 이렇게 하면 베팅을 모두 받아오면 winner Team의 ```teamWeight```값이 0이 될 것이다.

5. 그리고, 이 함수를 실행하는 누구나 다시 베팅을 할 수 있도록, ```Struct user -> teamName, voteBalance, voted```값을 초기화해야 한다. 각각 ``` '', 0, false```로 설정하자.

6. 마지막 줄에 ```return amountToReturn;```을 쓰자. 베팅을 잘 한 user면 0이 아닌 값을 return할 것이고, 아니면 초기에 설정한 0을 return할 것이다.

```solidity
function returnBettingResult() public onlyAfterVersus returns(uint) {
  require(teamNameWin != stringToBytes32('none'));
  uint amountToReturn = 0;
  if (getUserVotedTeamName(msg.sender) == teamNameWin) {
    amountToReturn = (votedBalanceOf(msg.sender) / winnerTeamPureBalance) * bettingTotalBalance;
    userData[msg.sender].balance += amountToReturn;
    teamWeight[teamNameWin] -= amountToReturn;
  }
  userData[msg.sender].teamName = '';
  userData[msg.sender].voteBalance = 0;
  userData[msg.sender].voted = false;

  return amountToReturn;
}
```

### 6. returnBettingResultOver
----
이제, 다시 ```versus```를 시작하기 위해서 필요한 초기화 작업이다. ```teamNameWin```을 초기화 하고, ```returnBettingResult```를 실행하지 않은 경우 ```teamWeight```가 남아있을 테니 남은 값들을 ```totalSupply```로 옮겨야 한다. 그리고, ```versusExecuted```를 ```false```로 바꾸어야 한다.

1. ```function returnBettingResultOver```를 만들자. ```owner```만 사용 가능하고, ```onlyAfterVersus```이어야 한다. 

2. ```teamNameWin```이 초기 값인 ```bytes32 -> 'none'```이 아니어야 한다.

3. 위의 설명을 그대로 옮기면 된다.

4. 그리고, 나중에 사용할 수도 있으니 ```event BettingResultOver```를 만들고, 이 함수에서 ```emit```하는 것도 만들자.

* 수정 : ```emit```을 사용하는 것은 상당히 좋은 방법일 수 있으나, 나중에 React에서 사용할 때 조금 다른 방식으로 접근해야하기 때문에 이 프로젝트에서는 ```emit```을 사용하지 않았다.

```solidity
event BettingResultOver();

function returnBettingResultOver() public onlyOwner onlyAfterVersus {
  require(teamNameWin != stringToBytes32('none'));
  totalSupply += teamWeight[teamNameWin];
  teamWeight[teamNameWin] = 0;

  teamNameWin = stringToBytes32('none');
  versusExecuted = false;
}
```

### 7. 마무리 및 확인용
----
혹시 모를 나중을 대비한 보기 전용 함수들을 만들면 끝난다. 그리고 ```returnBettingResultOver```를 자동으로 실행되게 하는 상황도 만들어야한다. 앞에서 ```returnBettingResult```가 실행될 때, ```teamWeight[teamNameWin]```이 ```0```이 되면 모두가 받아갔다는 내용이 기억이나면, 이해가 될 것이다. 초기화의 조건이 이 경우가 되는 것이다.

모두가 받아가도 초기화하고, 어느 일정 시점에 ```owner```가 초기화시키면 된다는 것이다. 이 두 작업을 마무리하고 solidity내용을 끝내자.

1. ```function showVersus```를 만들자. 현재 ```versus```로 선언된 두 팀의 이름을 ```string```형식으로 알려주는 역할을 할 것이다.

2. ```function showWinnerTeam```을 만들자. 현재 ```teamNameWin```의 값을 확인할 수 있다.


* 참고로, 1, 2번 과정은 후에 **React**을 사용하면서 값이 잘 적용되었는지 확인하기 위해서 설정하는 것이다.

```solidity
function returnBettingResult() public onlyAfterVersus returns(uint) {
  require(teamNameWin != stringToBytes32('none'));
  uint amountToReturn = 0;
  if (getUserVotedTeamName(msg.sender) == teamNameWin) {
    amountToReturn = (votedBalanceOf(msg.sender) / winnerTeamPureBalance) * bettingTotalBalance;
    userData[msg.sender].balance += amountToReturn;
    teamWeight[teamNameWin] -= amountToReturn;
  }
  userData[msg.sender].teamName = '';
  userData[msg.sender].voteBalance = 0;
  userData[msg.sender].voted = false;

  return amountToReturn;
}

function showVersus() public view returns(string memory, string memory) {
  return(stringTeamName[team1], stringTeamName[team2]);
}
function showWinnerTeam() public view returns(string memory) {
  return(stringTeamName[teamNameWin]);
}
```

### 최종 코드들
여기에 쓰기 너무 길어서 Github에서 확인하기를 바란다. 보고 싶은 코드의 파일 이름을 클릭하면 확인할 수 있다.
<ul>

[Token.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Token.sol)

[SetTeam.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/SetTeam.sol)

[Vote.sol](https://github.com/Minkun00/Betting/blob/master/src/contracts/Vote.sol)

<ul>