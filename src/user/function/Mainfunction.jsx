// Mainfunction.js
// 함수를 적어두지만, main.js에서 상황 제한을 걸어두는 것이 필요
// ex. vote 함수가 실행되기 위해서 versusExecuted = true 임을 확인하는 과정 필요
async function LogIn_(token, account) {
    console.log("login activate")
    try {
        await token.methods.logIn().send({from: account})
    } catch(error) {
        console.log(error)
        if (error.code === 4001) {
            window.alert("User denied the transaction")
        } else {
            window.alert("Already Login")
        }
    }
}

async function showOwner_(token) {
    console.log("show owner activate")
    try {
        let ownerAddress = await token.methods.showOwner().call()
        console.log(ownerAddress)
        window.alert(String(ownerAddress))
    } catch(error) {
        console.log(error)
        window.alert("Show owner function error")
    }
}

// return teamWeight
async function getTeamWeightByTeamName_(setTeam, teamName) {
    console.log("get team weight by team name activate")
    try {
        let teamWeight = await setTeam.methods.getTeamWeightByTeamName(teamName).call()
        console.log(`${teamName} : ${teamWeight}`)
        return teamWeight
    } catch(error) {
        console.log(error)
        window.alert("get Team weight by team name error")
    }
}

async function vote_(vote, teamName, amount, account) {
    console.log("vote activate")
    try {
        await vote.methods.vote(teamName, amount).send({ from: account })
        console.log(`user have voted for ${teamName}, ${amount}`)
    } catch(error) {
        console.log(error)
        window.alert("vote error")
    }
}

async function returnBettingResult_(vote, account) {
    console.log("return Betting Result activate")
    try {
        let amountToReturn = await vote.methods.returnBettingResult().send({ from: account })
        console.log(`got ${amountToReturn}`)
    } catch(error) {
        console.log(error)
        window.alert("returnBettingResult error")
    }
}

async function balanceOf_(contract, account) {
    console.log("balance of activate")
    try {
        let tokenBalance = await contract.methods.balanceOf(account).call()
        console.log(tokenBalance)
    } catch(error) {
        console.log(error)
        window.alert("balanceOf error!")
    }
}


export {LogIn_, showOwner_, getTeamWeightByTeamName_, vote_, returnBettingResult_, balanceOf_};