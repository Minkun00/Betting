// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0; //>=0.8.18 <0.9.0
import './SetTeam.sol';
// Vote.sol

contract Vote is SetTeam {
    bytes32 team1;
    bytes32 team2;
    bytes32 teamNameWin = stringToBytes32('none');
    bool public versusExecuted = false;

    event BettingResultOver();

    modifier onlyBeforeVersus() {
        require(!versusExecuted, "Versus has already been executed");
        _;
    }

    modifier onlyAfterVersus() {
        require(versusExecuted, "Versus has not been executed yet");
        _;
    }

    function versus(string calldata _team1, string calldata _team2) public onlyBeforeVersus {
        team1 = stringToBytes32(_team1);
        team2 = stringToBytes32(_team2);
        versusExecuted = true;
    }

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

    function gameEnd(string memory _teamNameWin, string memory _teamNameLose) public onlyAfterVersus onlyOwner {
        bytes32 win = stringToBytes32(_teamNameWin);
        bytes32 lose = stringToBytes32(_teamNameLose);
        require(win == team1 || win == team2);
        require(lose == team1 || lose == team2);

        winnerTeamPureBalance = teamWeight[win];
        teamWeight[win] += teamWeight[lose];
        bettingTotalBalance = teamWeight[win];
        teamWeight[lose] = 0;
    }

    function returnBettingResult() public onlyAfterVersus {
        require(teamNameWin != stringToBytes32('none'));

        if (getUserVotedTeamName(msg.sender) == teamNameWin) {
            uint amountToReturn = (voteBalanceOf(msg.sender) / winnerTeamPureBalance) * bettingTotalBalance;
            userData[msg.sender].balance += amountToReturn;
            teamWeight[teamNameWin] -= amountToReturn;

            if (teamWeight[teamNameWin] == 0) {
                returnBettingResultOver();
            }
        }
        userData[msg.sender].teamName = '';
        userData[msg.sender].voteBalance = 0;
        userData[msg.sender].voted = false;
    }

    function returnBettingResultOver() public onlyOwner onlyAfterVersus {
        require(teamNameWin != stringToBytes32('none'));
        totalSupply += teamWeight[teamNameWin];
        teamWeight[teamNameWin] = 0;
        
        emit BettingResultOver();
        teamNameWin = stringToBytes32('none');

    }
}