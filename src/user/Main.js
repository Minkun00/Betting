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

    handleShowOwner() {
        showOwner_(this.ownerAddress)
    }


    render() {
        return (
            <div>
                <button onClick={this.handleLogIn}>LOGIN</button>
                <button onClick={this.handleShowOwner}>Show Owner</button>
                <p>balance : {this.tokenBalance}</p>
            </div>
        )
    }
}

export default Main;