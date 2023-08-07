// GameEnd.js
import React from "react"
import { gameEnd_ } from "../function/Ownerfunction"

class GameEnd extends React.Component {
    constructor(props) {
        super(props)
    }

    handleGameEnd = async() => {
        const { vote, selectedHomeTeam, selectedAwayTeam, account } = this.props
        await gameEnd_(vote, selectedHomeTeam, selectedAwayTeam, account)
        console.log(`Win : ${selectedHomeTeam}, Lose : ${selectedAwayTeam}`)
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
