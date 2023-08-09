import React from "react";
import { Versus_ } from "../function/Ownerfunction";

function Versus({ teamData, contract, account }) {
  const handleVersus = (team1Name, team2Name) => {
    console.log(team1Name, team2Name)
    // 실행하려는 Versus_ 함수에 contract와 account를 전달하여 실행
    Versus_(contract, team1Name, team2Name, account);
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
