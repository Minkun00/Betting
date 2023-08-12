import React, { useState } from 'react';
import GetMatchData from './src/GetMatchData';
import Versus from './src/Versus';
import GameEnd from './src/GameEnd';
import ReturnBettingResultOver from './src/ReturnBettingResultOver';
import '../App.css'
import './Owner.css'

function Owner({ ownerAddress, contract, account })  {
  const [teamData, setTeamData] = useState([]);

  // in owner.jsx
  const handleTeamSelected = (selectedTeamData) => {
    setTeamData([selectedTeamData]);
  };  

  
  return(
    <div className = 'common-container'>
      <GetMatchData onTeamSelected={handleTeamSelected}/>
      <Versus contract={contract} account={account} teamData={teamData}  />
      <GameEnd contract={contract} account={account} teamData={teamData}/>
      <ReturnBettingResultOver contract={contract} account={account} />
    </div>
  )
}

export default Owner;
