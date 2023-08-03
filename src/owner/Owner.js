// owner.js
import React from 'react';
import { SetTeam_ } from './Ownerfunction';

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '' // State to store the team name
    };
    this.handleSetTeam = this.handleSetTeam.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSetTeam() {
    const { setTeam, account } = this.props;
    const { teamName } = this.state;
    await SetTeam_(setTeam, teamName, account);
  }

  handleInputChange(event) {
    this.setState({ teamName: event.target.value }); // Update teamName state on input change
  }

  render() {
    const { account, ownerAddress } = this.props;
    const { teamName } = this.state;

    if (account === ownerAddress) {
      return (
        <div>
          <input
            type='text'
            placeholder='teamName'
            value={teamName}
            onChange={this.handleInputChange}
          ></input>
          <button onClick={this.handleSetTeam}>Set Team</button>
        </div>
      );
    } else {
      return <div>you are not the owner</div>;
    }
  }
}

export default Owner;
