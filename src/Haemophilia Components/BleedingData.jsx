import React from 'react';
import { useState } from 'react';

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

    alert("Bleeding episode Logged! Yay!");
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
    <div>
      <h2 className='subheading'>Please log on your bleeding episodes below:</h2>
    
      <p className='content'>1. How often have you bled today?</p>
      <p className='content'>Bleeding Count: {`${bleedingCount}`}</p>
       <button onClick={()=> setBleedingCount(prev => Math.min(prev + 1, 100))} className='nextBtn'>+</button>
       <button onClick={()=> setBleedingCount(prev=> Math.max(prev -1, 0))} className='nextBtn'>-</button>

       <p className='content'>2. How long does it take for your blood to clot when your bleeding ?</p>
       <select className='setUp' onChange={(b)=> setBloodClot(b.target.value)} value={bloodClot}>
         <option value="">Select period below:</option>
        <option value= "5 minutes">25 - 30 seconds</option>
        <option value= "25 muntes">45 seconds</option>
        <option value= "45 minutes">60 seconds</option>
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

       <p className='content'>9. Additional Notes:</p>
       <textarea value={notes}   className= "setUp" onChange={(e)=> setNotes(e.target.value)} rows= "4" required/>

        <br /><br />

        <button onClick={handleSave} className='nextBtn'>Save Entry</button>

    </div>
  )
}

export default BleedingData;
