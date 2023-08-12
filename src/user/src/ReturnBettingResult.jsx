import React  from "react";
import { returnBettingResult_ } from "../function/Mainfunction";
import '../../App.css'

function ReturnBettingResult({ contract, account }) {

    const returnBettingResult = async () => {
      await returnBettingResult_(contract, account);
    };
  
  
    return (
      <div>
        <button className = 'common-button' onClick={returnBettingResult}>ReturnBettingResult</button>
      </div>
    );
  }
  
  export default ReturnBettingResult;
  