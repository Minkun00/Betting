import React, { useState } from "react";
import { gameEnd_ } from "../function/Ownerfunction";

function GameEnd({ contract, account, teamData }) {
  const [teamwin, setTeamWin] = useState(null);
  const [teamlose, setTeamLose] = useState(null);

  const handleGameEnd = async () => {
    if (teamwin && teamlose) {
        try{  
            await gameEnd_(contract, teamwin, teamlose, account);
            console.log(`Win: ${teamwin} Lose: ${teamlose}`);
        } catch(error) {
            console.log(error)
            window.alert('game end error!')
        }
    } else {
      window.alert("Please select both winning and losing teams.");
    }
  };

  const handleTeamSelection = (teamwin, teamlose) => {
    setTeamWin(teamwin)
    setTeamLose(teamlose)
  };

  return (
    <div>
      <h2>Game End</h2>
      <div>
        {teamData.map((team, index) => (
          <div key={index}>
            <button
              className={`team-button ${teamwin === team.team1.name ? "selected" : ""}`}
              onClick={() => handleTeamSelection(team.team1.name, team.team2.name)}>
              {team.team1.name}
            </button>
            <button
              className={`team-button ${teamwin === team.team2.name ? "selected" : ""}`}
              onClick={() => handleTeamSelection(team.team2.name, team.team1.name)}>
              {team.team2.name}
            </button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleGameEnd}>Game End</button>
      </div>
    </div>
  );
}

export default GameEnd;
