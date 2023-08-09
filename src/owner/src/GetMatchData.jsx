import React, { useState } from 'react';
import axios from 'axios';
import { saveDataToLocal, getDataFromLocal } from '../function/LocalStorageService';

function GetMatchData({ onTeamSelected }) {
  const [localData, setLocalData] = useState(getDataFromLocal('matchData') || null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleFetchData = (token) => {
    setIsLoading(true);

    const apiUrl = 'https://esports-api.lolesports.com/persisted/gw/getSchedule';
    const headers = {
      'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'
    };

    const params = {
      hl: 'ko-KR',
      ...(token && { pageToken: token })
    };

    axios.get(apiUrl, { headers, params })
      .then(response => {
        setLocalData(response.data);
        saveDataToLocal('matchData', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSelectRow = (event) => {
    setSelectedRow(event);
  };

  const handleSetMatch = () => {
    if (!selectedRow) {
      alert("Please select a row.");
      return;
    }
  
    const selectedTeamData = {
      team1: {
        name: selectedRow.match.teams[0].name,
        image: selectedRow.match.teams[0].image
      },
      team2: {
        name: selectedRow.match.teams[1].name,
        image: selectedRow.match.teams[1].image
      }
    };
  
    onTeamSelected(selectedTeamData);
    setSelectedRow(null);
  };
  
  const lckEvents = localData?.data?.schedule?.events?.filter(event => event.league?.name === 'LCK');

  return (
    <div className="GetMatchData">
      {!localData ? (
        <button onClick={() => handleFetchData()}>Fetch Data</button>
      ) : (
        <div>
          {localData.data.schedule.pages.newer && (
            <button onClick={() => handleFetchData(localData.data.schedule.pages.newer)} disabled={isLoading}>
              Fetch Newer Data
            </button>
          )}
          {localData.data.schedule.pages.older && (
            <button onClick={() => handleFetchData(localData.data.schedule.pages.older)} disabled={isLoading}>
              Fetch Older Data
            </button>
          )}
        </div>
      )}
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        lckEvents && (
          <div>
            <table className="event-table">
              <tbody>
                {lckEvents.map(event => (
                  <tr key={event.match.id} onClick={() => handleSelectRow(event)}>
                    <td>
                    <input
                    type="checkbox"
                    checked={selectedRow === event}
                    onChange={() => handleSelectRow(event)}
                    />
                    </td>
                    <td>{event.startTime}</td>
                    <td>
                      <img
                        src={event.match.teams[0].image}
                        alt={event.match.teams[0].name}
                        style={{ maxWidth: '2em', maxHeight: '2em', border: '1px solid black', background: 'grey' }}
                      />
                    </td>
                    <td>{event.match.teams[0].name}</td>
                    <td>
                      <img
                        src={event.match.teams[1].image}
                        alt={event.match.teams[1].name}
                        style={{ maxWidth: '2em', maxHeight: '2em', border: '1px solid black', background: 'grey' }}
                      />
                    </td>
                    <td>{event.match.teams[1].name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="button-container">
              <button onClick={handleSetMatch}>Set Match</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GetMatchData;
