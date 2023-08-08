// Ownerfunction.js

async function SetTeam_(_setTeam, _teamName, _account) {
    console.log('setTeam activate');
    try {
      await _setTeam.methods.setTeam(String(_teamName)).send({ from: _account })
      console.log(_teamName + " is in block chain")
    } catch (error) {
      console.log(error);
      window.alert('SetTeam Error!');
    }
}

async function Versus_(vote, teamName1, teamName2, account) {
    console.log("Versus activate")
    try {        
        await vote.methods.versus(String(teamName1), String(teamName2)).send({ from: account })
        console.log(teamName1 + ' vs ' + teamName2)
    } catch (error) {
        console.log(error)
        window.alert('Versus Error!')
    }
}

async function gameEnd_(vote, teamNameWin, teamNameLose, account) {
    console.log("Game End activate")
    try {
        await vote.methods.gameEnd(teamNameWin, teamNameLose).send({ from : account })
        console.log(`Win: ${teamNameWin} Lose: ${teamNameLose}`)
    } catch(error) {
        console.log(error)
        window.alert('gameEnd Error!')
    }
}

async function returnBettingResultOver_(vote, account) {
    console.log("returnBettingResultOver activate")
    try {
        await vote.methods.returnBettingResultOver().send({ from: account })
        console.log("return betting is over now")
    } catch(error) {
        console.log(error)
        window.alert('return betting result over error!')
    }
}

// 여기서 return 하는 versusExecuted 의 값으로 다른 함수들 실행 조건으로 사용
async function showVersusExecuted_(vote) {
    console.log("show versus executed activate")
    try {
        let versusExecuted = await vote.methods.showVersusExecuted().call()
        console.log(`versusExecuted : ${versusExecuted}`)
        return versusExecuted
    } catch(error) {
        console.log(error)
        window.alert("showVersusExecuted error")
    }
}

async function showMatchUpTeams_(vote) {
    try {
        let team1 = await vote.methods.showMatchUp1().call()
        let team2 = await vote.methods.showMatchUp2().call()
        console.log(`${team1} vs ${team2} in block chain`)
    } catch(error) {
        console.log(error)
    }
}

export {SetTeam_, Versus_, gameEnd_, returnBettingResultOver_, showVersusExecuted_, showMatchUpTeams_};
  