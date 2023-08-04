// SPDX-License-Identifier: MIT
pragma solidity >=0.8.18<0.9.0;
import './Token.sol';

contract SetTeam is Token {
    // 팀 관련 변수 접근은 모두 mapping으로 들어감
    // stringToBytes32(<Team Name>) 을 mapping에 넣어야 해당 값이 튀어나오게 했음.

    // team weight에 접근하는 mapping
    mapping(bytes32 => uint) public teamWeight;
    // team이 입력되었는지 확인용으로 만든 mapping
    mapping(bytes32 => bool) public teamSetted;

    uint bettingTotalBalance = 0;
    uint winnerTeamPureBalance = 0;

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
    
    // team 설정
    function setTeam(string calldata _teamName) external onlyOwner {
        require(bytes(_teamName).length > 0, "Team name cannot be empty");
        bytes32 teamNameHash = stringToBytes32((_teamName));
        require(!teamSetted[teamNameHash], "Team name already exists");

        teamSetted[teamNameHash] = true;
    }

    // team weight를 불러오기
    function getTeamWeightByTeamName(string calldata _teamName) external view returns (uint) {
        return teamWeight[stringToBytes32(_teamName)];
    }

}