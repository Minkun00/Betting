import React  from "react";
import { LogIn_, showOwner_ } from "../function/Mainfunction";

function Login({ contract, account }) {

  const handleLogIn = async () => {
    await LogIn_(contract, account);
  };

  const handleShowOwner = async () => {
    await showOwner_(contract);
  };

  return (
    <div>
      <button onClick={handleLogIn}>LOGIN</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={handleShowOwner}>Show Owner</button>
    </div>
  );
}

export default Login;
