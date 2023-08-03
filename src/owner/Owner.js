// owner.js
import React from 'react';
import * as owner from './Ownerfunction'

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '' ,        // for 'setTeam'
      teamName1: '',        // for 'Versus'
      teamName2: ''
    };
    this.handleSetTeam = this.handleSetTeam.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleSetTeam() {
    const { setTeam, account } = this.props;
    const { teamName } = this.state;
    await owner.SetTeam_(setTeam, teamName, account);
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
