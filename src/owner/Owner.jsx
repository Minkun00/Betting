// Owner.jsx
import React, { useState } from 'react';
import GetMatchData from './src/GetMatchData';
import Versus from './src/Versus';

function Owner({ contract, account }) {
  const [teamData, setTeamData] = useState([]);

  const handleTeamSelected = (selectedTeamData) => {
    setTeamData([selectedTeamData]);
  };
  
  return(
    <div>
      <GetMatchData onTeamSelected={handleTeamSelected}/>
      <Versus contract={contract} account={account} teamData={teamData}/>
    </div>
  )
}

export default Owner;
