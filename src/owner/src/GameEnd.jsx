// GameEnd.jsx
import React from "react"
import { gameEnd_ } from "../function/Ownerfunction"

class GameEnd extends React.Component {
    

    handleGameEnd = async() => {
        const { contract, account } = this.props
        const { winnerTeam, loserTeam } = this.state;

        await gameEnd_(contract, winnerTeam, loserTeam, account)
        console.log(`Win : ${winnerTeam}, Lose : ${loserTeam}`)
    }

    setWinnerLoserTeam = (_winnerTeam, _loserTeam) => {
        this.setState({
            winnerTeam: _winnerTeam,
            loserTeam: _loserTeam
        });
    }

    constructor() {
        super()
        this.state ={
            winnerTeam: null,
            loserTeam: null
        }
        
    }
    
    render() {
        const { homeTeam, awayTeam } = this.props

        return(
            <div>
                <div>
                    <button onClick={() => this.setWinnerLoserTeam(homeTeam, awayTeam)}> {homeTeam} </button>
                    <button onClick={() => this.setWinnerLoserTeam(awayTeam, homeTeam)}> {awayTeam} </button>
                </div>
                <div>
                    <button onClick={this.handleGameEnd}>GAME END</button>
                </div>
            </div>
        )
    }
}
export default GameEnd;
