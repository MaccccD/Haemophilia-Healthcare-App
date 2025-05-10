import React, { useContext, useState } from 'react';
import { userAuthenticate } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


function AccountSetUpPage1() {
   //context usage here :
   const {personalDetails} = useContext(userAuthenticate);
   //navigation set up here:
   const navigate = useNavigate();
   //states set up :
   const [fullNames, setFullNames] = useState("");
   const [IdNumber, setIdNumber] = useState("");
   const [password, setPassword] = useState("");
   const [validatePassword, setValidatePassword] = useState("");

   //Handle Account creation functionality :
   function accountSetUp(event){
    event.preventDefault();
    if(fullNames && IdNumber && password && validatePassword.trim() && password === validatePassword){
      if(personalDetails(fullNames, IdNumber, password, validatePassword)){
       navigate("/AccountSetUpPage2");
      }
      else{
        alert("Passwords do not match! Please ensure every field had been correctly filled in.");
        setFullNames("");
        setIdNumber("");
        setPassword("");
        setValidatePassword("");
      }
    }
   }

   
  return (
     //first step of the Haemophilia Healthcare app  Account Creation Part 1:
     <div>
     <h1>Heyyyy, Welcome to the Heamophilia Healthcare App</h1>
     <p>Please Create your account down below:</p>
      <form onSubmit={accountSetUp}>
       <input type='text' placeholder='Enter Full Name & Surname' onChange={(e)=>setFullNames(e.target.value)} required/>
       <input type='text' placeholder='Enter ID Number' onChange={(e)=> setIdNumber(e.target.value)} required/>
       <input type='password' placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} required/>
       <input type='password' placeholder='Re-enter Password' onChange={(e)=> setValidatePassword(e.target.value)} required/>
       <button style={{backgroundColor: 'green', borderRadius: 16, width: 100, height: 50}}>Next</button>
     </form>
   </div>
  )
}

export default AccountSetUpPage1;
