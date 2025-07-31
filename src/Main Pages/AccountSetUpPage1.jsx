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

   //Handle Account creation functionality . I separated the logic for easier code readability:
   function accountSetUp(event){
    event.preventDefault();//by putting this here, i'm aware that it will cause the page to not reload and thus the fields will not be cleared out if the passwords are not matching.
    //checking if all the fields are correctly filled in
     if (!fullNames || !IdNumber || !password || !validatePassword.trim()) {
    alert("Please fill in all fields.");
    return;
  }
   //validating with the context im using :
  if (personalDetails(fullNames, IdNumber, password, validatePassword)) {
    navigate("/AccountSetUpPage2");
  }
//ensuring that if passwords do not match , players get the correct feedback
  if (password !== validatePassword) {
    alert("Passwords do not match! Please ensure every field is correctly filled in.");
    console.log("Passwords don't match!!!");
    setFullNames("");
    setIdNumber("");
    setPassword("");
    setValidatePassword("");
    return;
  }
 
   }

   

   
  return (
     //first step of the Haemophilia Healthcare app  Account Creation Part 1:
     <div className='wrapper'>
     <div className='account-Container'>
     <h1 className='heading'>Haemophilia Healthcare App</h1>
     <p className='content'>Please create your account down below:</p>
      <form onSubmit={accountSetUp}>
       <input type='text' placeholder='Enter Full Name & Surname' onChange={(event)=>setFullNames(event.target.value)} required className='login-Fields'/>
       <input type='text' placeholder='Enter 13 digit ID Number' onChange={(e)=> setIdNumber(e.target.value)} required className='login-Fields'/>
       <input type='password' placeholder='Enter Password' onChange={(e)=> setPassword(e.target.value)} required className='login-Fields'/>
       <input type='password' placeholder='Re-enter Password' onChange={(e)=> setValidatePassword(e.target.value)} required className='login-Fields'/>
       <button className='login-Btn'>Next</button>
     </form>
   </div>
   </div>
  )
}

export default AccountSetUpPage1;
