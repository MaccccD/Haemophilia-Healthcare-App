import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Login() {
   // state variables for loggin functonality:
   const [fullnames, setFullNames] = useState("");
   const [emailaddress, setEmailAddress] = useState("");
   const [password, setPassword] = useState("");
  //navigation set up:
   const navigate = useNavigate();


     function HandleRegistration(event){
      event.preventDefault();
      //retrieve what's stored in the local storage from Account Set Up Pages:
      const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
      const savedAddressDetails = JSON.parse(localStorage.getItem("personalAdressDeets"));

      // validate  login logic:
      if(fullnames.trim().toLowerCase() === savedUserDetails.fullNames.trim().toLowerCase() &&
          emailaddress.trim().toLowerCase() === savedAddressDetails.emailAddress.trim().toLowerCase() &&
          password.trim() === savedUserDetails.createPassword.trim()
      ){
        navigate("/Home"); // so if the details used to login match the ones used to create the accoint, navigat user to the home dashboard page
      }
      else{
        alert("Login details do not match with account set up details. Please ensure that all fields match what used to create the account!")
        setFullNames("");
        setEmailAddress("");
        setPassword("");
      }
    }
  return (
    <div className='wrapper'>
    <div className='login-Container'>
      <h1 className='heading'>Login:</h1>
      <p className='content'>Please enter your login details below:</p>
      <form onSubmit={HandleRegistration}>
       <input type='text' placeholder='Enter Full Name & Surname' onChange={(e)=>setFullNames(e.target.value)} required className='login-Fields'/>
       <input type='text' placeholder='Enter email address' onChange={(e)=> setEmailAddress(e.target.value)} required className='login-Fields'/>
       <input type='password' placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} required className='login-Fields'/>
       <button className='login-Btn'>Login</button>
     </form>
    </div>
    </div>
  )
}

export default Login;
