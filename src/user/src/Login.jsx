// Login.js
import React from "react"
import { LogIn_, showOwner_ } from "../function/Mainfunction"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginCheck: localStorage.getItem("loginCheck") || "0"
        }
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleShowOwner = this.handleShowOwner.bind(this)
    }
    async handleLogIn() {
        const { contract, account } = this.props
        await LogIn_(contract, account)
        this.setState({ loginCheck: "1" },() => {
            localStorage.setItem("loginCheck", "1")
        })
    }

    async handleShowOwner() {
        const { contract } = this.props
        await showOwner_(contract)
    }


    render() {
        const { loginCheck } = this.state
        return (
            <div>
                {loginCheck === 0 && (
                    <button onClick={this.handleLogIn}>LOGIN</button>
                )}&nbsp;&nbsp;&nbsp;
                <button onClick={this.handleShowOwner}>Show Owner</button>
            </div>
        )
    }
}

export default Login;