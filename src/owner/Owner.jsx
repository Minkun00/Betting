// Owner.js
import React from 'react';
import {GetMatch} from './src/GetMatch';
import GameEnd from './src/GameEnd'
import SetTeam from './src/SetTeam';

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
  render() {
    const { homeTeamURL, awayTeamURL } = this.state
    const { account, ownerAddress } = this.props;
    if (account === ownerAddress) {
      return (
        <React.Fragment>
          <SetTeam
          vote={this.props.vote}
          account={this.props.account}/>

          <GetMatch 
          vote={this.props.vote}
          account={this.props.account}
          onVersusMatchData={this.handleVersusMatchData} 
          />

          <GameEnd 
          vote={this.props.vote}
          account={this.props.account}
          homeTeam={this.state.homeTeam}
          awayTeam={this.state.awayTeam}/>

          <img src={homeTeamURL} alt="HOME TEAM"/>
          <img src={awayTeamURL} alt="AWAY TEAM"/>
        </React.Fragment>
      );
    } else {
      return <div>you are not the owner</div>;
    }
  }
}

export default Owner;
