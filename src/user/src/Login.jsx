// Login.js
import React from "react"
import { LogIn_, showOwner_ } from "../function/Mainfunction"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleShowOwner = this.handleShowOwner.bind(this)
    }
    async handleLogIn() {
        const { contract, account } = this.props
        await LogIn_(contract, account)
    }

    async handleShowOwner() {
        const { contract } = this.props
        await showOwner_(contract)
    }


    render() {
        return (
            <div>
                <button onClick={this.handleLogIn}>LOGIN</button>&nbsp;&nbsp;&nbsp;
                <button onClick={this.handleShowOwner}>Show Owner</button>
            </div>
        )
    }
}

export default Login;