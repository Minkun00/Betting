import React from 'react';
import Login from './src/Login';
import Vote from './src/Vote';

function Main({ contract, account, tokenBalance, appTeamData, appWLData, vote }) {
  return (
    <React.Fragment>
      <Login
        contract={contract}
        account={account}
      />
      <p>
        {appTeamData.length > 0 ? (
          `${appTeamData[0].team1.name} vs ${appTeamData[0].team2.name}`
        ) : (
          'No team data'
        )}
      </p>
      <p>
        win: {appWLData.win ? appWLData.win : 'No win data'} lose: {appWLData.lose ? appWLData.lose : 'No lose data'}
      </p>
      <Vote 
        contract={contract}
        account={account}
        team1Name={appTeamData.length > 0 ? appTeamData[0].team1.name : 'No data'}
        team1URL={appTeamData.length > 0 ? appTeamData[0].team1.image : 'No data'}
        team2Name={appTeamData.length > 0 ? appTeamData[0].team2.name : 'No data'}
        team2URL={appTeamData.length > 0 ? appTeamData[0].team2.image : 'No data'} 
      />
    </React.Fragment>
  );
}

export default Main;
