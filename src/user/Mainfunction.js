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

export function showOwner_(ownerAddress) {
    window.alert(String(ownerAddress))
}