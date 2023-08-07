// Main.js
import React from 'react';
import Login from './src/Login';

class Main extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Login
                    token={this.props.vote}
                    account={this.props.account}
                />
            </React.Fragment>
        );
    }
}

export default Main;
