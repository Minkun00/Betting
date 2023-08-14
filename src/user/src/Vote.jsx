import React, { useState } from "react";
import { vote_,balanceOf_ } from "../function/Mainfunction"
import '../../App.css'

function Vote({ contract, account, team1Name, team1URL, team2Name, team2URL}) {
    const [selectedTeamName, setSelectedTeamName] = useState('NOT SELECTED');
    const [amount, setAmount] = useState('0');

    const team1BackgroundColor = getBackgroundColor(team1Name);
    const team2BackgroundColor = getBackgroundColor(team2Name);
    
    const selectedTeamURL = 'NOT SELECTED' === selectedTeamName ? 'NOT SELECTED' : (selectedTeamName === team1Name ? team1URL : team2URL);
    const selectedTeamBackgroundColor = 'NOT SELECTED' === selectedTeamName ? 'rgb(255, 255, 255)' : (selectedTeamName === team1Name ? team1BackgroundColor : team2BackgroundColor);

    function getBackgroundColor(teamName) {
        switch (teamName) {
            case 'Gen.G':
                return 'rgb(0, 0, 0)';
            case 'T1':
                return 'rgb(0, 0, 0)';
            case 'kt Rolster':
                return 'rgb(0, 0, 0)';
            case 'Hanwha Life Esports':
                return 'rgb(62, 62, 62)';
            case 'Dplus Kia':
                return 'rgb(0, 0, 0)';
            case 'Liiv SANDBOX':
                return 'rgb(255, 201, 0)';
            case 'KWANGDONG FREECS':
                return 'rgb(231, 51, 18)';
            case 'OKSavingsBank BRION':
                return 'rgb(0, 73, 43)';
            case 'DRX':
                return 'rgb(17, 2, 163)';
            case 'Nongshim RedForce':
                return 'rgb(222, 32, 39)';
            default:
                return 'rgb(255, 255, 255)';
        }
    }


    const handleVote = async () => {
    try {
        await vote_(contract, selectedTeamName, amount, account);
        console.log(selectedTeamName);
        console.log(amount);
    } catch (error) {
        console.log(error);
        window.alert("vote Error!");
    }
    balanceOf_(contract, account)
  }

    const handleImageClick = (selectedTeamName) => {
        setSelectedTeamName(selectedTeamName);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    return (
        <React.Fragment>
            {team1Name == 'No data' ? (
                //match doesn't select
                <div className = 'vote-container' 
                    style={{backgroundColor: 'black', color:'white', alignItems: 'center', justifyContent: 'center', fontSize:'35px' }}>
                    No information for Vote. 
                </div>
            
            ) : (
                //match selected
                <div className = 'vote-container'>
                    <div className = 'vote-team-container' style={{ backgroundColor: team1BackgroundColor }}>
                        <img src={team1URL} className='vote-team-imageSize' alt={`Team logo of ${team1Name}`} 
                        onClick={() => handleImageClick(team1Name)} />
                    </div>

                    <div className='common-container' style={{flex: 1,
                        backgroundColor: 'white',
                        height: '350px',}}>

                        <div style={{ marginBottom: '10px', fontSize: '20px', alignSelf: 'center' }}>VS</div>  
                        &nbsp;
                        <div style={{textAlign: 'center'}}>Selected Team <br/>: {selectedTeamName}</div>
                        
                        {selectedTeamURL !== 'NOT SELECTED' ? (
                            <img src={selectedTeamURL} alt={`Selected team logo`} 
                                style={{ width: '50px', height: '50px', backgroundColor: selectedTeamBackgroundColor, padding: '10px' }} />
                        ) : (
                            <div style={{ width: '50px', height: '50px', padding: '10px'}}></div>
                        )}          

                        <div className='common-container' style={{ flexDirection:'row' }}>
                            <span>
                                amount :
                            </span>
                            <input type='text' placeholder='0' required
                                style={{ width: '30%', padding: '5px', border: '2px solid #ccc',
                                borderRadius: '5px', fontFamily: 'Chaney Ultra Extended', }} onChange={handleAmountChange} />
                        </div>

                        &nbsp;
                        <button type='submit' className='vote-button'
                            onClick={handleVote}>VOTE</button>
                    </div>

                    <div className = 'vote-team-container' style={{ backgroundColor: team2BackgroundColor }}>
                        <img src={team2URL} className='vote-team-imageSize' alt={`Team logo of ${team2Name}`} 
                        onClick={() => handleImageClick(team2Name)} />
                    </div>
                </div>
            )

        
        }
        </React.Fragment>
    );
}

export default Vote;