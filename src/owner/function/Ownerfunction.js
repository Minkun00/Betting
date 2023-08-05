// Ownerfunction.js

async function SetTeam_(setTeam, teamName, account) {
    console.log('setTeam activate');
    try {
      await setTeam.methods.setTeam(teamName).send({ from: account })
      console.log(teamName + " is in block chain")
    } catch (error) {
      console.log(error);
      window.alert('SetTeam Error!');
    }
}

async function Versus_(vote, teamName1, teamName2, account) {
    console.log("Versus activate")
    try {
        await vote.methods.versus(teamName1, teamName2).send({ from: account })
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

export {SetTeam_, Versus_, gameEnd_, returnBettingResultOver_};
  