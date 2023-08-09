import React from 'react';
import Login from './src/Login';

function Main({ contract, account, tokenBalance, appTeamData, appWLData }) {
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
    </React.Fragment>
  );
}

export default Main;
