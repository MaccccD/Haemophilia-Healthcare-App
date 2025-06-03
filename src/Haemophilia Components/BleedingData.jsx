import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BleedingData() {
  //State variables for the different typesof bleeding data :
  const [bleedingCount, setBleedingCount] = useState(0);
  const [intensity, setIntensity] = useState("");
  const [bloodClot, setBloodClot] = useState("");
  const [site, setSite] = useState("");
  const [duration, setDuration] = useState("");
  const [trigger, setTrigger] = useState("");
  const [treatment, setTreatment] = useState("");
  const [painLevel, setPainLevel] = useState(1);
  const [notes, setNotes] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPagge] = useState(false);

  const navigate = useNavigate();

  function NavigateNextPage (){
   navigate("/BloodTest");
   setNextPage(true);
  }

  function GoBack(){
    navigate("/HealthMetrics");
    setPrevPagge(true);
  }

  const handleSave =()=>{
    if (!notes || !intensity || !site || !duration || !trigger || !treatment) {
    alert("Please fill in all required fields before saving.");
    return; // ensuring that the blood episode entry entry does not save unless all the fields have been filled.
    }
    const bleedingLog = {
      bleedingCount,
      bloodClot,
      intensity,
      site,
      duration,
      trigger,
      treatment,
      painLevel,
      notes,
      date: new Date().toLocaleDateString('en-GB'),
    };

    //saving this data into the local storage bc i'm using it to genrate results:
    const existingLogs = JSON.parse(localStorage.getItem("bleedingLogs")) || [];
    const updatedLogs = [...existingLogs, bleedingLog];
    localStorage.setItem("bleedingLogs", JSON.stringify(updatedLogs));

    alert("Bleeding episode Logged!");
    //clear all the field(s) after each bleeding episode entry:
    setBleedingCount("");
    setIntensity("");
    setSite("");
    setDuration("");
    setTrigger("");
    setTreatment("");
    setPainLevel("");
    setNotes("");

  };

  return (
    <div className='bleeding-Container'>
      <h2 className='heading'>Bleeding episodes Entry:</h2><br/>
      <p className='content'>1. How often have you bled today?</p>
      <p className='content'>Bleeding Count: {`${bleedingCount}`}</p>
       <button onClick={()=> setBleedingCount(prev => Math.min(prev + 1, 100))} className='bleed-Count'>+</button>
       <button onClick={()=> setBleedingCount(prev=> Math.max(prev -1, 0))} className='bleed-Count'>-</button>

       <p className='content'>2. How long does it take for your blood to clot when your bleeding ?</p>
       <select className='setUp' onChange={(b)=> setBloodClot(b.target.value)} value={bloodClot}>
         <option value="">Select period below:</option>
        <option value= "25-30 seconds">25 - 30 seconds</option>
        <option value= "45 seconds">45 seconds</option>
        <option value= "60 seconds">60 seconds</option>
       </select>


       <p className='content'>3.  Bleeding Intensity:</p>
       <select className='setUp' onChange={(e) => setIntensity(e.target.value)} value={intensity}>
        <option value="">Select Intensity below:</option>
        <option value= "Light">Light</option>
        <option value= "Moderate">Moderate</option>
        <option value="Severe">Severe</option>
       </select>

       <p className='content'>4. Bleeding Site:</p>
       <input type='text' className='setUp' placeholder='e.g: Nose, Joint, Ears, etc.' value={site} onChange={(e)=> setSite(e.target.value)} required/>

       <p className='content'>5. Bleeding Duration (minutes):</p>
       <input type='number' min= "0" className='setUp' value={duration} onChange={(d)=> setDuration(d.target.value)} required/>

       <p className='content'>6. What triggered it?:</p>
       <input type='text' placeholder='spontaneous,physical activity etc.' className='setUp' value={trigger} onChange={(t)=> setTrigger(t.target.value)} required/>

       <p className='content'>7. Treatment taken?:</p>
       <input type='text' className='setUp' placeholder= "e.g: Factor VIII"value={treatment} onChange={(e)=>setTreatment(e.target.value)} required/>

       <p className='content'>8. Pain Level (1-10):</p>
       <input type='range' placeholder='1 being the worst, 10 being the least' className='setUp' min="1" max= "10" value={painLevel} onChange={(e)=> setPainLevel(e.target.value)} required/>
       <p>Pain level : {painLevel}</p>

       <p className='content'>9. Additional Notes:</p>
       <textarea value={notes}   className= "setUp" onChange={(e)=> setNotes(e.target.value)} rows= "4" required/>

        <br /><br />

        <button onClick={handleSave} className='nextBtn'>Save Entry</button><br/><br/>

        <button onClick={GoBack} className='prevBtn'>Previous</button>

        <button onClick={NavigateNextPage} className='nextButton'>Next</button>


    </div>
  )
}

export default BleedingData;
