// Main.js
import React from 'react'
import * as main from './Mainfunction'
class Main extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleShowOwner = this.handleShowOwner.bind(this)
    }
    async handleLogIn() {
        const { token, account } = this.props
        await main.LogIn_(token, account)
    }

    async handleShowOwner() {
        const { token } = this.props
        await main.showOwner_(token)
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