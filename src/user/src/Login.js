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
        const { token, account } = this.props
        await LogIn_(token, account)
    }

    async handleShowOwner() {
        const { token } = this.props
        await showOwner_(token)
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