import React, { useState } from 'react';
import GetMatchData from './src/GetMatchData';
import Versus from './src/Versus';
import GameEnd from './src/GameEnd';
import ReturnBettingResultOver from './src/ReturnBettingResultOver';

function Owner({ contract, account, updateAppTeamData, appTeamData, appWLData, updateAppWLData, resetAppData })  {
  const [teamData, setTeamData] = useState([]);
  const [WLData, setWLData] = useState([]);

  const handleTeamSelected = (selectedTeamData) => {
    setTeamData([selectedTeamData]);
  };
  const handleWLTeamData = (WLTeamData) => {
    setWLData(WLTeamData)
  }
  const teamDatumReset = () => {
    setTeamData([])
    setWLData([])
    resetAppData()
  }

  
  return(
    <div>
      <GetMatchData onTeamSelected={handleTeamSelected}/>
      <Versus contract={contract} account={account} teamData={teamData} updateAppTeamData={updateAppTeamData} />
      <GameEnd contract={contract} account={account} teamData={teamData} onWLTeamDataSet={handleWLTeamData}/>
      <ReturnBettingResultOver contract={contract} account={account} teamDatumReset={teamDatumReset}/>
    </div>
  )
}

export default Owner;
