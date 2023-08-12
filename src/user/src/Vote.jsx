import React, { useState } from "react";
import { vote_,balanceOf_ } from "../function/Mainfunction"
import '../../App.css'

function Vote({ contract, account, team1Name, team1URL, team2Name, team2URL}) {
    const [selectedTeamName, setSelectedTeamName] = useState('NOT SELECTED');
    const [amount, setAmount] = useState('0');

    const team1BackgroundColor = getBackgroundColor(team1Name);
    const team2BackgroundColor = getBackgroundColor(team2Name);
    
    // const winTeamURL = selectedTeamName === team1Name ? team1URL : team2URL;
    // const winTeamBackgroundColor = selectedTeamName === team1Name ? team1BackgroundColor : team2BackgroundColor;

    const selectedTeamURL = 'NOT SELECTED' === selectedTeamName ? 'NOT SELECTED' : (selectedTeamName === team1Name ? team1URL : team2URL);
    const selectedTeamBackgroundColor = 'NOT SELECTED' === selectedTeamName ? 'rgb(255, 255, 255)' : (selectedTeamName === team1Name ? team1BackgroundColor : team2BackgroundColor);


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

    const handleInputChange = (event) => {
        setAmount(event.target.value);
    };

    function getBackgroundColor(teamName) {
        switch (teamName) {
            case 'Gen.G':
                return 'rgb(0, 0, 0)';
            case 'T1':
                return 'rgb(228, 0, 43)';
            case 'kt Rolster':
                return 'rgb(0, 0, 0)';
            case 'Hanwha Life Esports':
                return 'rgb(255, 107, 1)';
            case 'Dplus KIA':
                return 'rgb(0, 0, 0)';
            case 'Liiv SANDBOX':
                return 'rgb(255, 201, 0)';
            case 'KWANGDONG FREECS':
                return 'rgb(231, 51, 18)';
            case 'OKSavingsBank BRION':
                return 'rgb(0, 73, 43)';
            case 'DRX':
                return 'rgb(17, 2, 163)';
            case 'DRX':
                return 'rgb(222, 32, 39)';
            default:
                return 'rgb(255, 255, 255)';
        }
    }

    return (
        <React.Fragment>
            <div className = 'component-spacing'style={{height: '350px', width: '100%', display: 'flex' }}>
                <div style={{ flex: 3, backgroundColor: team1BackgroundColor, height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={team1URL} alt="Image" style={{ width: '150px', height: '150px' }} 
                    onClick={() => handleImageClick(team1Name)} />
                    
                </div>

                <div style={{ flex: 1, backgroundColor: 'white', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{textAlign: 'center'}}>select <br/>: {selectedTeamName}</div>
                    {selectedTeamURL !== 'NOT SELECTED' && (
                        <img src={selectedTeamURL} style={{ width: '50px', height: '50px', backgroundColor: selectedTeamBackgroundColor, padding: '10px' }} />
                    )}                    
                    <div>amount : {amount}</div>
                    <div style={{ marginBottom: '10px' }}>VS</div>
                    <input type='text' placeholder='0' required
                    onChange={handleInputChange} />
                    <button type='submit' className='vote-button'
                    onClick={handleVote}>VOTE</button>
                </div>

                <div style={{ flex: 3, backgroundColor: team2BackgroundColor, height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={team2URL} alt="Image" style={{ width: '150px', height: '150px' }} 
                    onClick={() => handleImageClick(team2Name)} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default Vote;