import React from 'react';
import Login from './src/Login';
import Vote from './src/Vote';
import { getDataFromLocal } from '../owner/function/LocalStorageService';
import ReturnBettingResult from './src/ReturnBettingResult';
import '../App.css'

function Main({ contract, account, tokenBalance }) {
  const versusData = getDataFromLocal('versusTeamsData');

  // team1과 team2 데이터를 가져오기
  const team1Data = (versusData && versusData[0]?.team1) || { name: 'No data', image: 'No data' };
  const team2Data = (versusData && versusData[0]?.team2) || { name: 'No data', image: 'No data' };

  return (
    <div className = 'common-container'>
    <React.Fragment>
      <Login
        contract={contract}
        account={account}
      />
      <Vote 
        contract={contract}
        account={account}
        team1Name={team1Data.name}
        team1URL={team1Data.image}
        team2Name={team2Data.name}
        team2URL={team2Data.image}
      />
      <ReturnBettingResult
        contract={contract}
        account={account}
      />
    </React.Fragment>
    </div>
  );
}


export default Main;
