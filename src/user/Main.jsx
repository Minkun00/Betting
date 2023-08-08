// Main.js
import React from 'react';
import Login from './src/Login';

class Main extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Login
                    contract={this.props.contract}
                    account={this.props.account}
                />
            </React.Fragment>
        );
    }
}

export default Main;
