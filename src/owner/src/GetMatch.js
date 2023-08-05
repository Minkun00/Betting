import React from 'react';
import match from './LCK_MATCH.json';
import { Versus_ } from '../function/Ownerfunction';

class GetMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMatch: null,
    };
  }

  getSchedule() {
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

  handleMatchSelection = (index) => {
    this.setState((prevState) => ({
      selectedMatch: prevState.selectedMatch === index ? null : index,
    }));

    // Log selected teams
    const selectedMatchData = this.getSchedule()[index];
    if (selectedMatchData) {
      console.log('홈 팀:', selectedMatchData.homeTeam);
      console.log('원정 팀:', selectedMatchData.awayTeam);
    }
  };

  handleVersus = async () => {
    const { vote } = this.props;
    const { selectedMatch } = this.state;
    const matchData = this.getSchedule(); // Add this line to define matchData

    if (selectedMatch !== null) {
      const selectedMatchData = matchData[selectedMatch];

      if (selectedMatchData) {
        await Versus_(
          vote,
          selectedMatchData.homeTeam,
          selectedMatchData.awayTeam,
          this.props.account
        );

        // Send team logos to Owner.js
        this.props.onSendTeamLogos(
          selectedMatchData.homeTeamImageURL,
          selectedMatchData.awayTeamImageURL
        );
      }
    }
  };

  render() {
    const matchData = this.getSchedule();
    const { selectedMatch } = this.state;

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
        {selectedMatch !== null && (
          <button onClick={this.handleVersus}>VERSUS</button>
        )}
      </div>
    );
  }
}

export default GetMatch;
