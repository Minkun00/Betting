// Versus.jsx
import React from "react";
import { Versus_ } from "../function/Ownerfunction";
import { saveDataToLocal } from "../function/LocalStorageService";

function Versus({ contract, account, teamData }) {
  const handleVersus = async (team1Name, team2Name) => {
    try {
      await Versus_(contract, team1Name, team2Name, account);
      // teamData가 배열일 경우에만 updateAppTeamData를 호출
      console.log(teamData);
    } catch (error) {
      console.log(error);
      window.alert("Versus Error!");
      return;
    }
    saveDataToLocal('versusTeamsData', teamData);
  }

  return (
    <div className = 'common-container'>
      <h2>Versus</h2>
      <ul>
        {teamData.map((team, index) => (
          <ul key={index}>
            <button
              className = 'common-button'
              onClick={() => handleVersus(team.team1.name, team.team2.name)}>
              {team.team1.name} vs {team.team2.name}
            </button>
          </ul>
        ))}
      </ul>
    </div>
  )
}

export default Versus;