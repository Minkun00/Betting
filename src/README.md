# React 연동
solidity code를 완성했다면, 이제는 사용자가 접근할 유저 인터페이스를 react를 이용해 구성할 차례이다.

이 페이지는 간단히 Metamask와 연동하고, 작성한 solidity code의 정보에 접근하는 과정에 대해 작성해 둔 글이다.

<br/>

프로젝트를 진행하게 된다면 이 페이지만 보는 것이 아니라 더 나아가서 심화적인 react 공부가 필요할 것이다.

# #1.  Metamask 연동
우리는 Ethereum 블록체인과 상호작용하기 위해 web3 라이브러리를 사용할 것이다. 

web3 라이브러리를 불러오고, Metamask와 연동하는 과정이 필요하다.

<br/>
코드의 내용은 다음과 같다.

```
import Web3 from 'web3';

async function loadWeb3() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('No ethereum browser detected!');
      }
    } catch (error) {
      window.alert(error);
    }
  }
  ```
1. window.ethereum이 존재하는 경우 즉, web3 인터페이스가 지원되는 경우 Web3 객체를 생성하고, enable 함수를 호출해 사용자에게 계정 접근 권한을 요청한다.
(이 때 Metamask를 통해 사용자 승인을 요구하는 팝업이 뜨면서 사용자가 승인하게 되면 해당 계정을 사용하여 Ethereum 네트워크와 상호작용 할 수 있다.)

2. window.web3 객체가 존재하는 경우에는 이미 승인이 완료된 상황이므로 currentProvider을 이용해서 현재 사용자로 web3를 생성한다. 

3. 사용자가 승인하지 않는다면 이더리움 브라우저가 감지되지 않았음을 사용자에게 알린다.
 (메타마스크가 설치되지 않았거나 Web3를 지원하지 않는 브라우저를 사용하면 자동으로 이더리움 브라우저가 감지되지 않았음을 알리게 된다.)


# #2. contract(계약) 정보 받아오기
Metamask의 연동이 되었다면, 이제는 우리가 작성한 solidity code를 이용해야 할 시간이다.

Contract의 정보를 받아와서 함수나 변수에 접근하는 과정을 진행해야한다.

<br/>
코드의 내용은 다음과 같다.

```import Contracts from './truffle_abis/Vote.json';

async function loadContracts() {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setAccount(account);

      const networkId = await web3.eth.net.getId();
      const contractData = Contracts.networks[networkId];

      if (contractData) {
        const contract = new web3.eth.Contract(Contracts.abi, contractData.address);
        setContract(contract);
      } else {
        window.alert(
          'Vote contract not deployed to detect network! Please check your metamask network'
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
```
1. 먼저, contract의 정보나 만들어놓은 함수들에 접근하기 위해 스마트 컨트랙트 ABI 가져와야 한다.
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;따라서 truffle_abis 폴더에 있는 json file을 import 해주어야 한다.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;여기서는 Vote.sol이 SetTeam.sol과 Token.sol 코드를 의존하고 있기 때문에 Vote.sol을 통해 만들어진 Vote.json 파일만 가져오도록 하겠다.


2. 다시 한 번 Web3 객체를 생성하고 getAccounts 함수를 통해 Metamask에 등록되어있는 계정의 목록을 받아온다.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;이 때 Ganache를 이용해 10개의 계정을 동시에 등록할 수 있다.

3. web3.eth.net.getId 함수를 통해 Ganache 네트워크 id인 5777을 받아올 수 있다.
   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Vote.json](https://github.com/Minkun00/Betting/blob/master/src/truffle_abis/Vote.json) 파일을 확인해보면, 


```
"networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0xD30E2173C4e6A52A3C02A332Dfc6b4b8Ea3e1980",
      "transactionHash": "0xb67b6e64df5abc80c069618907db0c460020de9875006afec4f508737509c7a3"
    }
  },
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contract의 networks가 5777인 스마트 컨트랙트의 네트워크 정보를 가져온다.

4. contractData가 존재한다면, Contract 객체를 만들어주고, contract 자체를 setContract 함수를 통해 저장해주면 된다.

5. 오류 상황이 발생했다면 적절한 처리를 통해 사용자에게 원인을 알린다.


# #3. contract 함수 사용하기
받아온 Contract 정보를 이용하여 solidity 코드에서 정의한 함수를 호출하여 웹에서 실행한다.

contract의 함수를 호출하는 데에는 두 가지 방법이 존재한다.

### 1. call 함수로 Contract 함수 호출 ([/src/App.jsx](https://github.com/Minkun00/Betting/blob/master/src/App.jsx) : Line 28-29 참조))
```
const userBalance = await contract.methods.balanceOf(account).call();
const ownerAddress = await contract.methods.showOwner(account).call();
```
위와 같이 call 함수로 호출할 때에는 블록체인의 상태를 변경하지 않고 '읽기'작업만 이루어지는 함수를 호출하는 방법이다.

호출이 빠르고 contract의 상태 변경이 없어 가스 비용이 낮은 호출 방법이다.

### 2. send 함수로 Contract 함수 호출 ([/src/user/function/Mainfunction.jsx](https://github.com/Minkun00/Betting/blob/master/src/user/function/Mainfunction.jsx) : Line 46 참조))
```
await vote.methods.vote(teamName, amount).send({ from: account })
```
send 함수로 호출할 때에는 트랜잭션을 생성하여 블록체인 contract의 상태 변경을 유발해 가스 비용이 높은 방법이다.


따라서 상황을 잘 구분하여 두 가지 방법을 적절하게 활용하는 것이 중요하다.

<br/><br/><br/>
## 최종 코드
이제 위의 단계들을 통해 스마트 컨트랙트를 작성하고 Metamask와 연동하여 React 앱과 상호작용할 준비가 되었다.

실제로 프로젝트를 개발하는 과정에서는 코드를 조금씩 수정하고 보완하며 원하는 기능을 추가해보면서 더욱 실질적인 경험을 쌓아보시기 바란다.

최종적인 UI 설계는 Github에서 확인하기를 바란다. 보고 싶은 코드의 파일 이름을 클릭하면 확인할 수 있다.
<ul>

[App.jsx](https://github.com/Minkun00/Betting/blob/master/src/App.jsx)

<ul>
