import React, { useState } from 'react'

function Diabetes() {
  const [diabetesType, setDiabetesType] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState(0);
  const [insulinType, setInsulinType] = useState("");
  const [insulinDose, setInsulinDose] = useState(0);
  const [waterIntake, setWaterIntake] = useState("");
  const [carbsIntake, setCarbsIntake] = useState(0);
  const [mood, setMood] = useState("");
  const [phsyicalActivity, setPhysicalActvity] = useState("");

    const symptomsOptions = [
       "Dizziness", 
       "Thirsty", 
       "Frequent Urination",
       "Fatigue", 
       "Blurred Vision"
      ];
     const [selectedSymptoms, setSelectedSymptoms] = useState([]);


    const handleCheckboxchange = (symptom) =>{
       if(selectedSymptoms.includes(symptom)){
        setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom)); // ensuring that after a symptom has sbeen checked , it get filtered out so only the options that have ben checked remain.
       }
       else{
        setSelectedSymptoms([...selectedSymptoms, symptom]) // adding the checked symptom onto the array state using the sperad operator.
       };
    }

    const saveInfo = () =>{
      if(!diabetesType || !glucoseLevel || !!insulinDose || !insulinType || !waterIntake || !carbsIntake || !mood || !phsyicalActivity){
        alert("Please ensure evry field is correclty");
        return;
      }
    }

  


  return (
    <div className='diabetes-Container'>
      <h1 className='heading'>Sugar diabetes levels:</h1>
      <p className='content'> Please log in your entry:</p>
     
     <label className='content'>1. Please indicate what type of diabetes you have ?</label><br/><br/>
     <select value={diabetesType} className='setUp' onChange={(t)=> setDiabetesType(t.target.value)}>
      <option value= "">Diabetes Options: </option>
      <option value= "Type 1">Type 1</option>
      <option value="Type 2">Type 2</option>
     </select>
     <br/><br/>

     <label className='content'>2. What is your current glocose level ?</label>
      <p className='content'>Blood Glucose Level: {`${glucoseLevel}`}</p>
       <button onClick={()=> setGlucoseLevel(prev => Math.min(prev + 1, 100))} className='bleed-Count'>+</button>
       <button onClick={()=> setGlucoseLevel(prev=> Math.max(prev -1, 0))} className='bleed-Count'>-</button>
       <br/>
      <label className='content'>3. What type of insulin do you use ?</label><br/><br/>
      <select value={insulinType} className='setUp' onChange={(i)=> setInsulinType(i.target.value)}>
        <option value= "">Select Option :</option>
        <option value= "rapid-acting">Rapid Acting</option>
        <option value= "long-acting">Low Acting</option>
      </select>
      <br/><br/>
      <label className='content'>4. What is your average insulin dose daily ?</label><br/><br/>
      <input type='range' placeholder='Dosage (units)' min="1" max= "10" value={insulinDose} onChange={(i)=> setInsulinDose(i.target.value)}/>
      <p>Average Insulin Dose: {insulinDose}</p>
      <br/><br/>

      <label className='content'>5. What is your average  water intake ??</label><br/>
      <select className='setUp' value={waterIntake} onChange={(w)=> setWaterIntake(w.target.value)}>
        <option value="">Select Option:</option>
        <option value="01 glass a day">1 glass a day</option>
        <option value="02 glasses a day">02 glasses a day</option>
        <option value="08 glasses a day">08 glasses a day</option>
      </select>
      <br/><br/>

      <label className='content'>5. What is your carbs intake within your diet ?</label><br/><br/>
      <input type='range' placeholder='carbs intake' value={carbsIntake} onChange={(c)=> setCarbsIntake(c.target.value)}/>
      <br/>
      <p className='content'>Carbs Intake: {carbsIntake}</p>
      <br/><br/>
      
      <label className='content'>6. What are your current symptoms?</label><br/><br/>
      {symptomsOptions.map((symptom, index)=>{
        return(
          <label key={index}  className='emphasized-Text'>
            <input type='checkbox' 
            value={symptom} 
            checked = {selectedSymptoms.includes(symptom)} 
            onChange={()=> handleCheckboxchange(symptom)}/>
            {symptom}
          </label>
        )
      })}

       <div className='summary'>
        <p className='content'> Your selected symptoms:</p>  
        <ul >
          {selectedSymptoms.length > 0 ? (
            selectedSymptoms.map((symptom, index)=> <li key={index} className='emphasized-Text'>{symptom}</li>)
          ) : (
            <li className='content'>No symptoms selected</li>
          )}
        </ul>
       </div>
      <br/>
      <label className='content'>7. Current mood?</label><br/><br/>
      <select value={mood} className='setUp' onChange={(m)=> setMood(m.target.value)}>
        <option value="">Select Mood</option>
        <option value= "Tired">Tired</option>
        <option value="Energetic">Energetic</option>
        <option value="Shaky">Shaky</option>
        <option value="Light-headed">Light Headed</option>
      </select>
      <br/><br/>

      <label className='content'>8. Physical Activity completed today?</label><br/><br/>
      <input type='text' placeholder='Walking, Running, etc.' className='setUp' value={phsyicalActivity} onChange={(p)=> setPhysicalActvity(p.target.value)}/>


      




      </div>
  
  );
}

export default Diabetes;
