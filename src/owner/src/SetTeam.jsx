import React from "react";
import { SetTeam_ } from "../function/Ownerfunction";

class SetTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNameInput: "", // State to store the team name entered by the user
    };
  }

  handleTeamNameChange = (event) => {
    this.setState({ teamNameInput: event.target.value });
  };

  handleSetTeamClick = async () => {
    const { setTeam, account } = this.props;
    const { teamNameInput } = this.state;

    if (teamNameInput.trim() === "") {
      window.alert("Please enter a valid team name");
      return;
    }

    // Execute the SetTeam_ function with the team name entered by the user
    await SetTeam_(setTeam, teamNameInput, account);
  };

  render() {
    const { teamNameInput } = this.state;

    return (
      <div>
        <input
          type="text"
          value={teamNameInput}
          onChange={this.handleTeamNameChange}
          placeholder="Team Name"
        />
        <button onClick={this.handleSetTeamClick}>Set Team</button>
      </div>
    );
  }
}

export default SetTeam;
