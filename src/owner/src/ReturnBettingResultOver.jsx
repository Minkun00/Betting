// ReturnBettingResultOver.jsx
import React from "react"
import { returnBettingResultOver_ } from "../function/Ownerfunction"

function ReturnBettingResultOver({contract, account }) {
    const handleReturnBettingResultOver = async() => {
        try {
            await returnBettingResultOver_(contract, account)
        } catch(error) {
            console.log(error)
            window.alert("return betting over error!")
        }
    }
    return(
        <div className = 'common-container'>
            <h2>RETURN BETTING RESULT OVER</h2>
            <button
                className = 'common-button' 
                onClick={() => handleReturnBettingResultOver()}>ACTIVATE</button>
        </div>    
    )
}
export default ReturnBettingResultOver;