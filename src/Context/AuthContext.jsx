import React, { createContext, useState, useEffect } from 'react';

export const userAuthenticate = createContext();

function AuthContextProvider({children}) {
 //the states thet will handle the account creation details:
  const [user, setUser] = useState("");
  const [userEmailAddress, setUserEmailAddress] = useState("");
  const [userHouseAddress, setUserHouseAdrress] = useState("");
  const [password, setPassword] = useState("");
  const [validatePassword, setValidationPassword] = useState("");
  const [authenticate, SetAuthenticate] = useState(()=>{
   const authToken =  localStorage.getItem("isAuthenticated") 
   return authToken === "true"; // stored this as a string bc the item that is got is also rendered as a string 
   //true means the iser is authenticated
   
  }); 
  
  useEffect(()=>{ // so here im setting the user's authentication status and saving it in the local storage.
    localStorage.setItem("isAuthenticated", authenticate.toString()); // updates the token accordingly
     console.log(authenticate);
  }, [authenticate]); // runs eveyrtime the authicate status changes or updates.

  function personalDetails(fullNames, IdNumber, createPassword, validatePassword){
   const userDetails = {
    fullNames,
    IdNumber,
    createPassword,
    validatePassword
  };
  localStorage.setItem("userDetails", JSON.stringify(userDetails)); // here im saving what the user will input into the local storage.
   console.log(userDetails.fullNames, userDetails.IdNumber, userDetails.createPassword, userDetails.validatePassword); // just for my peace of mind
   setUser(fullNames);
   setPassword(createPassword);
   setValidationPassword(validatePassword);
   SetAuthenticate(true);
   return true;
  }

  function personalAddress(houseAdress, city, postalCode, emailAddress){
  const personalAddressDeets = {
    houseAdress, 
    city,
    postalCode,
    emailAddress,
  };
  localStorage.setItem("personalAdressDeets", JSON.stringify(personalAddressDeets));// saving the adress details in the local storage.
  console.log(personalAddressDeets.houseAdress, personalAddressDeets.city, personalAddressDeets.postalCode, personalAddressDeets.emailAddress);
  setUserHouseAdrress(houseAdress);
  setUserEmailAddress(emailAddress);
  SetAuthenticate(true);
  return true;
  }

  
  return (
    <userAuthenticate.Provider value={{user, userEmailAddress, userHouseAddress, password, validatePassword,authenticate, personalAddress, personalDetails}}>
     {children}
    </userAuthenticate.Provider>
  )
}
export default AuthContextProvider;
