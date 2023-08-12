import React  from "react";
import { LogIn_, showOwner_ } from "../function/Mainfunction";
import '../../App.css'

function Login({ contract, account }) {

  const handleLogIn = async () => {
    await LogIn_(contract, account);
  };

  const handleShowOwner = async () => {
    await showOwner_(contract);
  };

  return (
    <div className = 'common-container component-spacing'>
      <button className = 'common-button' onClick={handleLogIn}>LOGIN</button>
      &nbsp;&nbsp;&nbsp;
      <button className = 'common-button' onClick={handleShowOwner}>Show Owner</button>
    </div>
  );
}

export default Login;
