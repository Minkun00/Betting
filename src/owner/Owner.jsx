import React, { useState } from 'react';
import GetMatchData from './src/GetMatchData';
import Versus from './src/Versus';

function Owner() {
  const [teamData, setTeamData] = useState([]);

  const handleTeamSelected = (selectedTeamData) => {
    setTeamData([selectedTeamData]);
  };
  
  return(
    <div>
      <GetMatchData onTeamSelected={handleTeamSelected} />
      <Versus teamData={teamData}/>
    </div>
  )
}

export default Owner;
