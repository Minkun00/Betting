// ReturnBettingResultOver.jsx
import React from "react"
import { returnBettingResultOver_ } from "../function/Ownerfunction"

class ReturnBettingResultOver extends React.Component {

    
    handleReturnBettingResultOver = async() => {
        const { vote, account, initVersusMatchData } = this.props
        await returnBettingResultOver_(vote, account)
        console.log(`Return Betting Over`)
        initVersusMatchData()
    }

    render() {
        return(
            <div>
                <button onClick={this.handleReturnBettingResultOver}>Return Over</button>
            </div>
        )
    }
}

export default ReturnBettingResultOver;