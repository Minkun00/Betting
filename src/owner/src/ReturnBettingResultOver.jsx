// ReturnBettingResultOver.jsx
import React from "react"
import { returnBettingResultOver_ } from "../function/Ownerfunction"

function ReturnBettingResultOver({contract, account, teamDatumReset}) {
    const handleReturnBettingResultOver = async() => {
        try {
            await returnBettingResultOver_(contract, account)
            teamDatumReset([])
        } catch(error) {
            console.log(error)
            window.alert("return betting over error!")
        }
    }
    return(
        <div>
            <h2>RETURN BETTING RESULT OVER</h2>
            <button onClick={() => handleReturnBettingResultOver()}>ACTIVATE</button>
        </div>    
    )
}
export default ReturnBettingResultOver;