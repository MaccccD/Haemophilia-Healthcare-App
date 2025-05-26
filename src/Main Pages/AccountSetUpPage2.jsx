import React, { useContext, useState } from 'react';
import { userAuthenticate } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AccountSetUpPage2() {
  //context usage here:
  const {personalAddress} = useContext(userAuthenticate);
   //navuagtion set up here :
   const navigate = useNavigate();
  //states set up :
  const [houseAddress, setHouseAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  //Handle Account creation functionality part 2 . I separated the logic for easier code readability:
  function accountSetUpP2(event){
     event.preventDefault();
     if(!houseAddress || !city || !postalCode || !emailAddress.trim()){
      alert("Please fill out all the fields correctly!");
      setHouseAddress("");
      setCity("");
      setPostalCode("");
      setEmailAddress("");
      return
   }
   if(personalAddress(houseAddress, city, postalCode, emailAddress)){
       navigate("/HealthConditionSetUp");
       return;
   }

  //  if(houseAddress && city && postalCode && emailAddress.trim()){
  //   if(personalAddress(houseAddress, city, postalCode, emailAddress)){
  //     navigate("/HealthConditionSetUp");
  //   }
  //   else{
  //     alert("Incorrect Address credentials!! Please ensure that evry field is filled in correctly");
  //     setHouseAddress("");
  //     setCity("");
  //     setPostalCode("");
  //     setEmailAddress("");
  //   }
  //  }
  }
  return (
    //Second step of the Haemophilia Helathcare App Accountt creation Part 2:
    <div>
      <div className='wrapper'>
       <div className='account-Container'>
      <h1 className='heading'>Haemophilia Healthcare App</h1>
      <p className='content'>Please continue creating your account down below:</p>
       <form onSubmit={accountSetUpP2}>
        <input type='text' placeholder='Enter House Address' onChange={(e)=>setHouseAddress(e.target.value)} className='login-Fields' required/>
        <input type='text' placeholder='Enter City' onChange={(e)=> setCity(e.target.value)} className='login-Fields' required/>
        <input type='text' placeholder='Enter Postal Code' onChange={(e)=> setPostalCode(e.target.value)} className='login-Fields' required/>
        <input type='text' placeholder='Enter preferred email address' onChange={(e)=> setEmailAddress(e.target.value)} className='login-Fields' required/>
        <button className='login-Btn'>Next</button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default AccountSetUpPage2;
