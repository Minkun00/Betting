// Versus.jsx
import React from "react";
import { Versus_ } from "../function/Ownerfunction";

function Versus({ teamData, contract, account, updateMatchData }) {
  const handleVersus = async (team1Name, team2Name) => {
    try {
      await Versus_(contract, team1Name, team2Name, account);
      // 실행 후, 결과를 updateMatchData 함수를 통해 App 컴포넌트에 전달
      updateMatchData({
        homeTeam: team1Name,
        awayTeam: team2Name,
        // ... (homeTeamImageURL, awayTeamImageURL 등)
      });
    } catch (error) {
      console.log(error);
      window.alert("Versus Error!");
    }
  };

  return (
    <div>
      <h2>Versus</h2>
      <ul>
        {teamData.map((team, index) => (
          <ul key={index}>
            <button
              onClick={() => handleVersus(team.team1.name, team.team2.name)}
            >
              {team.team1.name} vs {team.team2.name}
            </button>
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default Versus;
