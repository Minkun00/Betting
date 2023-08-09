import React, { useState, useEffect } from "react";
import { LogIn_, showOwner_ } from "../function/Mainfunction";

function Login({ contract, account }) {
  const [loginCheck, setLoginCheck] = useState(localStorage.getItem("loginCheck") || "0");

  useEffect(() => {
    localStorage.setItem("loginCheck", loginCheck);
  }, [loginCheck]);

  const handleLogIn = async () => {
    await LogIn_(contract, account);
    setLoginCheck("1");
  };

  const handleShowOwner = async () => {
    await showOwner_(contract);
  };

  return (
    <div>
      {loginCheck === "0" && (
        <button onClick={handleLogIn}>LOGIN</button>
      )}&nbsp;&nbsp;&nbsp;
      <button onClick={handleShowOwner}>Show Owner</button>
    </div>
  );
}

export default Login;
