import React from "react";
import { SetTeam_ } from "../function/Ownerfunction";

class SetTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamNameInput: "", 
      savedTeamNames: [], 
    };
  }

  componentDidMount() {
    const savedTeamNames = localStorage.getItem("savedTeamNames");
    if (savedTeamNames) {
      this.setState({ savedTeamNames: JSON.parse(savedTeamNames) });
    }
  }

  handleTeamNameChange = (event) => {
    this.setState({ teamNameInput: event.target.value });
  };

  handleSetTeamClick = async () => {
    const { contract, account } = this.props;
    const { teamNameInput, savedTeamNames } = this.state;

    if (teamNameInput.trim() === "") {
      window.alert("Please enter a valid team name");
      return;
    }
    await SetTeam_(contract, teamNameInput, account);
    const updatedTeamNames = [...savedTeamNames, teamNameInput];
    this.setState({ savedTeamNames: updatedTeamNames, teamNameInput: "" });
    localStorage.setItem("savedTeamNames", JSON.stringify(updatedTeamNames));
  };

  render() {
    const { teamNameInput, savedTeamNames } = this.state;

    return (
      <div>
        <input
          type="text"
          value={teamNameInput}
          onChange={this.handleTeamNameChange}
          placeholder="Team Name"
        />
        <button onClick={this.handleSetTeamClick}>Set Team</button>

        <div style={{ maxHeight: "200px", overflowY: "scroll", border: "1px solid #ccc", marginTop: "10px" }}>
          <ul>
            {savedTeamNames.map((teamName, index) => (
              <li key={index}>{teamName}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SetTeam;
