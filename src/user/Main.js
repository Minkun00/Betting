// Main.js
import React from 'react'
import { LogIn_, showOwner_ } from './Mainfunction'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.token = props.token
        this.vote = props.vote
        this.ownerAddress = props.ownerAddress
        this.account = props.account
        this.tokenBalance = props.tokenBalance
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleShowOwner = this.handleShowOwner.bind(this)
    }
    async handleLogIn() {
        const token = this.token
        const account = this.account
        await LogIn_(token, account)
    }

    async handleShowOwner() {
        const token = this.token
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