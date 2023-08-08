// Owner.js
import React from 'react';
import {GetMatch} from './src/GetMatch';
import GameEnd from './src/GameEnd'
import SetTeam from './src/SetTeam';

class Owner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHomeTeam: '',
      selectedAwayTeam: '',
      selectedHomeTeamImageURL: '',
      selectedAwayTeamImageURL: '',
    };
    this.handleSelectMatch = this.handleSelectMatch.bind(this);
  }

  handleSelectMatch(homeTeam, awayTeam, homeTeamImageURL, awayTeamImageURL) {
    this.setState({
      selectedHomeTeam: homeTeam,
      selectedAwayTeam: awayTeam,
      selectedHomeTeamImageURL: homeTeamImageURL,
      selectedAwayTeamImageURL: awayTeamImageURL,
    });
  }

  render() {
    const { account, ownerAddress } = this.props;
    const { selectedHomeTeam, selectedAwayTeam } = this.state;

    if (account === ownerAddress) {
      return (
        <React.Fragment>
          <SetTeam
          setTeam={this.props.vote}/>

          <GetMatch 
          vote={this.props.vote}
          onSelectMatch={this.handleSelectMatch}
          account={this.props.account} 
          onSendTeamLogos={(homeURL, awayURL) => 
              this.setState({ selectedHomeTeamImageURL: homeURL, selectedAwayTeamImageURL: awayURL })} />

          {selectedHomeTeam && selectedAwayTeam && (
            <div>
              <ul>
                선택된 홈 팀: {selectedHomeTeam}
              </ul>
              <ul>
                선택된 원정 팀: {selectedAwayTeam}
              </ul>
            </div>
          )}

          <GameEnd 
          selectedHomeTeam={selectedHomeTeam} 
          selectedAwayTeam={selectedAwayTeam} 
          vote={this.props.vote}
          account={this.props.account}/>
        </React.Fragment>
      );
    } else {
      return <div>you are not the owner</div>;
    }
  }
}

export default Owner;
