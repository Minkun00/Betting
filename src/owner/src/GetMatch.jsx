// GetMatch.js
import React from 'react';
import match from './LCK_MATCH.json';
import { Versus_, showMatchUpTeams_, showVersusExecuted_ } from '../function/Ownerfunction';

function getSchedule() {
  const matchdata = [];
  if (
    match &&
    match.props &&
    match.props.initialState &&
    match.props.initialState.schedule &&
    match.props.initialState.schedule.monthSchedule
  ) {
    const monthSchedule = match.props.initialState.schedule.monthSchedule;

    for (const schedule of monthSchedule) {
      if (schedule.schedules) {
        const groupName = schedule.groupName;
        const scheduleData = schedule.schedules.map((match) => ({
          groupName,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          homeTeamImageURL: match.homeTeam.imageUrl,
          awayTeamImageURL: match.awayTeam.imageUrl,
        }));
        matchdata.push(...scheduleData);
      }
    }
  }
  return matchdata;
}

class GetMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMatch: null,
      isVersusButtonShown: false, // State to track whether the VERSUS button should be shown
    };
  }

  handleMatchSelection = (index) => {
    this.setState((prevState) => ({
      selectedMatch: prevState.selectedMatch === index ? null : index,
      isVersusButtonShown: prevState.selectedMatch === index ? false : true, // Show the VERSUS button if the checkbox is checked
    }));
  };

  handleVersusClick = async () => {
    const selectedMatchData = getSchedule()[this.state.selectedMatch];
    if (selectedMatchData) {
      const { vote, account, onVersusMatchData } = this.props;
      console.log(vote)
      const { homeTeam, awayTeam, homeTeamImageURL, awayTeamImageURL } = selectedMatchData;
      // Execute the Versus_ function passing the required arguments
      await Versus_(vote, homeTeam, awayTeam, account); // Replace vote and account with the actual valuesx
      onVersusMatchData({homeTeam, homeTeamImageURL, awayTeam, awayTeamImageURL})
    }
  };

  handleShowMatchUp = async () => {
    const { vote } = this.props
    await showMatchUpTeams_(vote)
  }

  handleShowVersusExecuted = async() => {
    const { vote } = this.props
    await showVersusExecuted_(vote)
  }

  render() {
    const matchData = getSchedule();
    const { selectedMatch, isVersusButtonShown } = this.state;

    return (
      <div>
        <div style={{ overflowY: 'scroll', height: '400px' }}>
          {matchData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>홈 팀</th>
                  <th>원정 팀</th>
                  <th>선택</th>
                </tr>
              </thead>
              <tbody>
                {matchData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.groupName}</td>
                    <td>{item.homeTeam}</td>
                    <td>{item.awayTeam}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedMatch === index}
                        onChange={() => this.handleMatchSelection(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}        
      </div>
      {selectedMatch !== null && isVersusButtonShown && (
        <button onClick={this.handleVersusClick}>VERSUS</button>
      )}
      {/*확인용 버튼*/}
      <button onClick={this.handleShowMatchUp}>show matchup in console</button>
      <button onClick={this.handleShowVersusExecuted}>show versusExecuted</button>
      </div>
    )
  }
}

export { GetMatch, getSchedule };