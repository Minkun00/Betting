// Mainfunction.js
export async function LogIn_(token, account) {
    console.log("login activate")
    try {
        await token.methods.logIn().send({from: account})
    } catch(error) {
        if (error.code === 4001) {
            window.alert("User denied the transaction")
        } else {
            window.alert("Already Login")
        }
    }
}

export async function showOwner_(token) {
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