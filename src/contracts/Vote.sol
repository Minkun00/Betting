// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0; //>=0.8.18 <0.9.0
import './SetTeam.sol';
// Vote.sol

contract Vote is SetTeam {
    // vote.sol에서 function versus( )에서 정해지는 두 팀
    // 이 두 팀의 게임에 대한 결과에 따라 betting result 과정을 거친다
    bytes32 public team1;  
    bytes32 public team2;
    // 이긴 팀의 이름을 저장, default : 'none'
    bytes32 public teamNameWin = stringToBytes32('none');
    // versus과정 이후에 모든 과정들을 실행할 수 있게 modifier 작성했는데, 그걸 위한 bool 변수
    // versus 전 : false , versus 후 : true , returnBettingResultOver() 실행되면 다시 false...
    bool public versusExecuted = false;
    // returnBettingResult()에서 returnBettingResultOver가 자동 실행될 경우를 대비해서
    // react에서 인식하게 하기 위함.(추가적 returnBettingResultOver 실행 방지용)
    event BettingResultOver();
    // versus 실행 전
    modifier onlyBeforeVersus() {
        require(!versusExecuted, "Versus has already been executed");
        _;
    }
    // versus 실행 후
    modifier onlyAfterVersus() {
        require(versusExecuted, "Versus has not been executed yet");
        _;
    }
    // team1, team2 저장
    function versus(string calldata _team1, string calldata _team2) public onlyBeforeVersus {
        team1 = stringToBytes32(_team1);
        team2 = stringToBytes32(_team2);
        stringTeamName[team1] = _team1;
        stringTeamName[team2] = _team2;

        versusExecuted = true;
    }
    // vote 과정 (전과 동일)
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
    // game end : 전과 동일
    function gameEnd(string calldata _teamNameWin, string calldata _teamNameLose) public onlyAfterVersus onlyOwner {
        bytes32 win = stringToBytes32(_teamNameWin);
        bytes32 lose = stringToBytes32(_teamNameLose);
        require(win == team1 || win == team2);
        require(lose == team1 || lose == team2);
        teamNameWin = win;
        winnerTeamPureBalance = teamWeight[win];
        teamWeight[win] += teamWeight[lose];
        bettingTotalBalance = teamWeight[win];
        teamWeight[lose] = 0;
        stringTeamName[teamNameWin] = _teamNameWin;
    }
    // 이상적으로 모든 user들이 돈을 받아갔으면 retrunBettingResultOver()자동 실행
    function returnBettingResult() public onlyAfterVersus returns(uint) {
        require(teamNameWin != stringToBytes32('none'));
        uint amountToReturn = 0;
        if (getUserVotedTeamName(msg.sender) == teamNameWin) {
            amountToReturn = (voteBalanceOf(msg.sender) / winnerTeamPureBalance) * bettingTotalBalance;
            userData[msg.sender].balance += amountToReturn;
            teamWeight[teamNameWin] -= amountToReturn;

            if (teamWeight[teamNameWin] == 0) {
                returnBettingResultOver();
            }
        }
        userData[msg.sender].teamName = '';
        userData[msg.sender].voteBalance = 0;
        userData[msg.sender].voted = false;
        return amountToReturn;
    }
    // 이 함수가 실행되어야지 다시 versus()함수를 실행 가능함
    function returnBettingResultOver() public onlyOwner onlyAfterVersus {
        require(teamNameWin != stringToBytes32('none'));
        totalSupply += teamWeight[teamNameWin];
        teamWeight[teamNameWin] = 0;
        
        emit BettingResultOver();
        teamNameWin = stringToBytes32('none');
        versusExecuted = false;
    }


    // main.jsx용. versus에 어떤 팀들이 입력되었는지 확인하기 위함
    function showVersus() public view returns(string memory, string memory) {
        return(stringTeamName[team1], stringTeamName[team2]);
    }
    function showWinnerTeam() public view returns(string memory) {
        return(stringTeamName[teamNameWin]);
    }
}