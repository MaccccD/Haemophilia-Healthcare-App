import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HealthConditionSetUp() {
  // set up the navigation here:
  const navigate = useNavigate();
  //const set up the different health conditions states:
  const [haemophilia, setHaemophilia] = useState(false);
  const [sugarDiabetic, setSugarDiabetic] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [ptsd, setPTSD] = useState(false);
  const [anxiety, setAnxiety] = useState(false);
  const [depression, setDepression] = useState(false);
  const [generic, setGeneric] = useState(false);

  //checking the health conditon fucntionality:
  function HandleHealthConditions(event){
    event.preventDefault();

    const selectedConditions = []; // an array that will store all the checkboxes that are ticked:

    if(haemophilia) selectedConditions.push("Haemophilia");
    if(sugarDiabetic) selectedConditions.push("Sugar Diabetic");
    if(hypertension) selectedConditions.push("Hypertension");
    if(ptsd) selectedConditions.push("PTSD");
    if(anxiety) selectedConditions.push("Anxiety");
    if(depression) selectedConditions.push("Depression");
    if(generic) selectedConditions.push("Generic'Other'");

    localStorage.setItem("selectedHealthConditions", JSON.stringify(selectedConditions));
    console.log("saved selected health conditions", selectedConditions);
    // then users will directed to the login page
    navigate("/Login");
  }
  return (
    // This is the 3rd part of the app where patients will get to choose a health condition they are direclty affected by:
    <div>
     <h1 className='heading'>Health Issue Details:</h1>
     <p className='content'>Please tick only the health issue(s) applicable to you:</p>
     <form onSubmit={HandleHealthConditions}>
      <label>
      <input type='checkbox' onChange={(e)=>setHaemophilia(e.target.checked)} className='healthCondition' required/>
       Haemophilia
      </label>
      <label>
      <input type='checkbox' onChange={(e)=> setSugarDiabetic(e.target.checked)} className='healthCondition'/>
       Sugar Diabetic
      </label>
      <label>
      <input type='checkbox' onChange={(e)=> setHypertension(e.target.checked)} className='healthCondition'/>
       Hypertension
      </label>
      <label>
      <input type='checkbox' onChange={(e)=> setPTSD(e.target.checked)} className='healthCondition'/>
       Post Traumatic Stress Disorder
      </label>
      <label>
      <input type='checkbox' onChange={(e)=> setAnxiety(e.target.checked)} className='healthCondiition'/>
       Anxiety
      </label>
      <label>
      <input type='checkbox' onChange={(e)=> setDepression(e.target.checked)}/>
       Depression
      </label>
      <label>
      <input type='checkbox' onChange={(e)=> setGeneric(e.target.checked)}/>
       Generic (Other)
      </label>
      <button className='createAccountBtn'>Create Account</button>
     </form>
    </div>
  )
}

export default HealthConditionSetUp;
