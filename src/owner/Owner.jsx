// Owner.js
import React from 'react';
import {Versus} from './src/Versus';
import GameEnd from './src/GameEnd'
import SetTeam from './src/SetTeam';
import ReturnBettingResultOver from './src/ReturnBettingResultOver';

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: null,
      awayTeam: null,
      homeTeamURL: null,
      awayTeamURL: null
    }
  }
  // GetMatch에서 VERSUS버튼을 누르면 versus에 들어간 값들을 owner.js에 저장함
  handleVersusMatchData = (matchData) => {
    console.log(`DATA : ${matchData}`)
    this.setState({
      homeTeam: matchData.homeTeam,
      awayTeam: matchData.awayTeam,
      homeTeamURL: matchData.homeTeamImageURL,
      awayTeamURL: matchData.awayTeamImageURL
    })
  }
  handleInitVersusMatchData = () => {
    console.log(`DATA init`)
    this.setState({
      homeTeam: null,
      awayTeam: null,
      homeTeamURL: null,
      awayTeamURL: null
    })
  }
  render() {
    const { homeTeam, homeTeamURL, awayTeam, awayTeamURL } = this.state
    const { account, ownerAddress } = this.props;
    if (account === ownerAddress) {
      return (
        <React.Fragment>
          <SetTeam
          vote={this.props.vote}
          account={this.props.account}/>

          <Versus 
          vote={this.props.vote}
          account={this.props.account}
          onVersusMatchData={this.handleVersusMatchData} 
          />

          <GameEnd 
          vote={this.props.vote}
          account={this.props.account}
          homeTeam={this.state.homeTeam}
          awayTeam={this.state.awayTeam}/>
          {homeTeam !== null && awayTeam !== null && (  // null이 아닐 때에만 출력
            <div>
              <p>homeTeam: {homeTeam}</p>
              <p>awayTeam: {awayTeam}</p>
              <img src={homeTeamURL} alt="HOME TEAM" />
              <img src={awayTeamURL} alt="AWAY TEAM" />
            </div>
          )}

          <ReturnBettingResultOver
          vote={this.props.vote}
          account={this.props.account}
          initVersusMatchData={this.handleInitVersusMatchData}/>
        </React.Fragment>
      );
    } else {
      return <div>you are not the owner</div>;
    }
  }
}

export default Owner;
