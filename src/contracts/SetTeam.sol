// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22<0.9.0;
import './Token.sol';

contract SetTeam is Token {
    mapping(bytes32 => uint) public teamWeight;
    mapping(bytes32 => bool) public teamSetted;

    uint bettingTotalBalance = 0;
    uint winnerTeamPureBalance = 0;

    bytes32 team1;
    bytes2 team2;

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
    
    function setTeam(string calldata _teamName) external onlyOwner {
        require(bytes(_teamName).length > 0, "Team name cannot be empty");
        bytes32 teamNameHash = stringToBytes32((_teamName));
        require(!teamSetted[teamNameHash], "Team name already exists");

        teamSetted[teamNameHash] = true;
    }

    function getTeamWeightByTeamName(string calldata _teamName) external view returns (uint) {
        return teamWeight[stringToBytes32(_teamName)];
    }

}