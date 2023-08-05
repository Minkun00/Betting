import React from 'react';
import GetMatch from './src/GetMatch';

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
          <GetMatch onSelectMatch={this.handleSelectMatch} onSendTeamLogos={(homeURL, awayURL) => this.setState({ selectedHomeTeamImageURL: homeURL, selectedAwayTeamImageURL: awayURL })} />
          {selectedHomeTeam && selectedAwayTeam && (
            <div>
              선택된 홈 팀: {selectedHomeTeam}
              선택된 원정 팀: {selectedAwayTeam}
            </div>
          )}
        </React.Fragment>
      );
    } else {
      return <div>you are not the owner</div>;
    }
  }
}

export default Owner;
