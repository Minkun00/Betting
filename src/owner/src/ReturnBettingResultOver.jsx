// ReturnBettingResultOver.jsx
import React from "react"
import { returnBettingResultOver_ } from "../function/Ownerfunction"

class ReturnBettingResultOver extends React.Component {
    constructor(props) {
        super(props)
    }
    
    handleReturnBettingResultOver = async() => {
        const { vote, account } = this.props
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

export default ReturnBettingResultOver