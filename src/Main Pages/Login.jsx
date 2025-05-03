import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    function HandleRegistration(registered){
        if(!registered){
            navigate("/AccountSetUpPage1")
        }
        else{
            navigate("/Home");
        }
    }
  return (
    <div>
      <h1>Your login page babyyy</h1>
    </div>
  )
}

export default Login;
