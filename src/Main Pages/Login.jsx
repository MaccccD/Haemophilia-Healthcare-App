import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    function HandleRegistration(registered){
        if(registered){
            navigate("/Home")
        }
        else{
            navigate("/AccountSetUpPage1");
        }
    }
  return (
    <div>
      <h1> This is your login page , rightr after you've created your account</h1>
    </div>
  )
}

export default Login;
