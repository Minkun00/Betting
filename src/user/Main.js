// Main.js
import React from 'react'
import { LogIn_, showOwner_ } from './Mainfunction'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleShowOwner = this.handleShowOwner.bind(this)
    }
    async handleLogIn() {
        const token = this.props.token
        const account = this.props.account
        await LogIn_(token, account)
    }

    async handleShowOwner() {
        const token = this.props.token
        await showOwner_(token)
    }


    render() {
        return (
            <div>
                <button onClick={this.handleLogIn}>LOGIN</button>
                <button onClick={this.handleShowOwner}>Show Owner</button>
            </div>
        )
    }
}

export default Main;