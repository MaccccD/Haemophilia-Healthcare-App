import React, { useState } from 'react'

function Diabetes() {
  const [diabetesType, setDiabetesType] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState(0);
  const [insulinType, setInsulinType] = useState("");
  const [insulinDose, setInsulinDose] = useState(0);
  const [waterIntake, setWaterIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [mood, setMood] = useState("");
  const [phsyicalActivity, setPhyicalActvity] = useState("");




  return (
    <div className='diabetes-Container'>
      <h1 className='heading'>Sugar diabetes levels:</h1>
      <p className='content'> Please login your informagtion about your condition:</p>
     

     <label className='content'>1. Please indicate what type of diabetes you have ?</label><br/><br/>
     <select value={diabetesType} className='setUp' onChange={(t)=> setDiabetesType(t.target.value)}>
      <option value= "">Diabetes Options</option>
      <option value= "Type 1">Type 1</option>
      <option value="Type 2">Type 2</option>
     </select>
     <br/>

     <label className='content'>2. What is your current glocose level ?</label>
      <p className='content'>Blood Glucose Level: {`${glucoseLevel}`}</p>
       <button onClick={()=> setGlucoseLevel(prev => Math.min(prev + 1, 100))} className='bleed-Count'>+</button>
       <button onClick={()=> setGlucsoseLevel(prev=> Math.max(prev -1, 0))} className='bleed-Count'>-</button>
       <br/>
      <label className='content'>3. What type of insulin do you use ?</label>
      <select value={insulinType} className='setUIp' onChange={(i)=> setInsulinType(i.target.value)}>
        <option value= "">Select Option</option>
        <option value= "rapid-acting">Rapid Acting</option>
        <option value= "long-acting">Low Acting</option>
      </select>
      <br/>
      <label className='content'>3. What is your average insulin dose daily ?</label><br/>
      <input type='range' placeholder='Dosage (units)' value={insulinDose} onChange={(i)=> setInsulinDose(i.target.value)}/>

      </div>
  )
}

export default Diabetes;
