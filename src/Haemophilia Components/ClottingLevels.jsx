import React, { useState, useEffect } from 'react'

function ClottingLevels() {
  const [clottingLevels, setClottingLevels] = useState([]);
   const [latestBloodClot, setLatestBloodClot]= useState(null);

   //factors affecting clotting levels:
   const [age, setAge] = useState(0);
   const [sex, setSex] = useState("");
   const [genetics, setGenetics] = useState("");
   const [medicalCondition, setMedicalCondition] = useState("");
   const [medications, setMedications] = useState("");
   const [diet, setDiet] = useState("");


    useEffect(()=>{
      const storedBleedLogs = JSON.parse(localStorage.getItem("bleedingLogs") || "[]");
      if(storedBleedLogs.length > 0){
       const lastBloodClotEntry = storedBleedLogs[storedBleedLogs.length - 1] //getting the selctedoption form the drop down
       const clottingPeriod = lastBloodClotEntry.bloodClot;
       setLatestBloodClot(clottingPeriod);
   
        }
     }, []);
   
  return (
    <div>
      <p className='content'>Based on your bleeding data, it took {latestBloodClot} for your blood to clot.</p>
      <p className='content'> Please fill in the following fields that also affect your blood clotting ability to generate a specific coagulation test:</p>
      <p className='content'> 1. How old are you ?:</p>
      <input type='number' min= "0" className='setUp' value={age} onChange={(d)=> setAge(d.target.value)} required/>

      <p className='content'>2. Please select your sexual orientiation:</p>
      <select value={sex} className='setUp' onChange={(s)=> setSex(s.target.value)}>
        <option value= "Male">Male</option>
        <option value= "Female">Female</option>
      </select>

      <p className='content'>3. Please select a genetic condition(s) you have (if any):</p>
      <input className='setUp' placeholder='Conditions like Fibrinogen deficiency, von Willebrand disease, Haemophilia, Factor V Leiden thrombophilia etc' onChange={(g)=> setGenetics(g.target.value)}/>
      <select value={genetics} className='setUp' onChange={(g)=> setGenetics(g.target.value)}>
        <option value= "Fibrinogen deficiency">Fibrinogen deficiency</option>
        <option value= "Von Willebrand disease">Von Willebrand disease</option>
      </select>


      <p>4. Set other Medical Condition(s) you have (if any)</p>

    

    </div>
  )
}

export default ClottingLevels;
