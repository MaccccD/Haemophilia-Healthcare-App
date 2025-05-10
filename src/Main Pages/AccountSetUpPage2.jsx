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

  function accountSetUpP2(event){
   event.preventDefault();
   if(houseAddress && city && postalCode && emailAddress.trim()){
    if(personalAddress(houseAddress, city, postalCode, emailAddress)){
      navigate("/HealthConditionSetUp");
    }
    else{
      alert("Incorrect Address credentials!! Please ensure that evry field is filled in correctly");
      setHouseAddress("");
      setCity("");
      setPostalCode("");
      setEmailAddress("");
    }
   }
  }
  return (
    //Second step of the Haemophilia Helathcare App Accountt creation Part 2:
    <div>
      <h1>Heyyyy, Welcome to the Heamophilia Healthcare App: Creating  Account Part 2</h1>
       <form onSubmit={accountSetUpP2}>
        <input type='text' placeholder='Enter House Address' onChange={(e)=>setHouseAddress(e.target.value)} required/>
        <input type='text' placeholder='Enter City' onChange={(e)=> setCity(e.target.value)} required/>
        <input type='text' placeholder='Enter Postal Code' onChange={(e)=> setPostalCode(e.target.value)} required/>
        <input type='text' placeholder='Enter preferred email address' onChange={(e)=> setEmailAddress(e.target.value)} required/>
        <button style={{backgroundColor: 'green', borderRadius: 16, width: 100, height: 50}}>Next</button>
      </form>
    </div>
  )
}

export default AccountSetUpPage2;
