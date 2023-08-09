import React, { useState } from 'react';
import GetMatchData from './src/GetMatchData';
import Versus from './src/Versus';
import GameEnd from './src/GameEnd';
import ReturnBettingResultOver from './src/ReturnBettingResultOver';

function Owner({ ownerAddress, contract, account, onAppTeamData, onWLTeamDataSet, resetAppData})  {
  const [teamData, setTeamData] = useState([]);
  const [WLData, setWLData] = useState([]);

  // in owner.jsx
  const handleTeamSelected = (selectedTeamData) => {
    setTeamData([selectedTeamData]);
  };  

  // for app.jsx
  const handleAppTeamData = (teamData) => {
    console.log("Received team data in Owner:", teamData);
    onAppTeamData(teamData)
  }
  const handleWLTeamData = (WLTeamData) => {
    setWLData(WLTeamData)
    onWLTeamDataSet(WLTeamData)
  }
  const teamDatumReset = () => {
    setTeamData([])
    setWLData([])
    resetAppData()
  }
  

  
  return(
    <div>
      <GetMatchData onTeamSelected={handleTeamSelected}/>
      <Versus contract={contract} account={account} teamData={teamData} onAppTeamData={handleAppTeamData} />
      <GameEnd contract={contract} account={account} teamData={teamData} onWLTeamDataSet={handleWLTeamData}/>
      <ReturnBettingResultOver contract={contract} account={account} teamDatumReset={teamDatumReset}/>
    </div>
  )
}

export default Owner;
