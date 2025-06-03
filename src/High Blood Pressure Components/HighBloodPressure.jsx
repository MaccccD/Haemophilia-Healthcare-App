import React, { useState } from 'react'

function HighBloodPressure() {

  const [diet, setDiet] = useState([]);
  const [phsyicalActivity, setPhysicalActivity] = useState("");
  const [alcoholConsumption, setAlcoholConsumption] = useState();
  const [tobaccoUse, setTobbacoUse] = useState("");
  const [stressLevels, setStressLevels] = useState("");
  const [weight, setWeight] = useState(0);
 

  const dietOptions = [
    "Exessive Salt Intake",
    " High Saturated Fats & trans fats",
    "Low Intake OF Fruits & vegetables",
  ]


  return (
    <div className='bloodPressure-Container'>
      <h1 className='heading'>High Blood Pressure levels:</h1>
      <p className='content'> Please log in your entry:</p>


      <label className='content'>1. Please select your diet Intake ?</label><br/><br/>
     <select value={diet} className='setUp' onChange={(t)=>setDiet(t.target.value)}>
      <option value= "">Diabetes Options: </option>
      <option value= "Type 1">Type 1</option>
      <option value="Type 2">Type 2</option>
     </select>
     <br/><br/>
    </div>
  )
}

export default HighBloodPressure;
