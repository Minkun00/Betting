// GameEnd.jsx
import React from "react"
import { gameEnd_ } from "../function/Ownerfunction"

class GameEnd extends React.Component {
    handleGameEnd = async() => {
        const { contract, homeTeam, awayTeam, account } = this.props
        await gameEnd_(contract, homeTeam, awayTeam, account)
        console.log(`Win : ${homeTeam}, Lose : ${awayTeam}`)
    }
    
    render() {
        return(
            <div>
                <button onClick={this.handleGameEnd}>GAME END</button>
            </div>
        )
    }
}
export default GameEnd;
