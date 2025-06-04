import React, { useState } from 'react'

function Anxiety() {

  const [mood, setMood] = useState("");
  const [anxietyAttacks, setAnxietyAttacks] = useState("");
  const [stressTypes, setStressTypes] = useState([]);
  const [traumas, setTraumas] = useState([]);
  const [personalityTrait, setPersonalityTrait] = useState("");
  const [selectedSymptoms, setSelectedSymptoms ] = useState([]);



const anxietyAttackTypes = [
  "Panick Attacks",
  "Social Anxiety",
  "Generalized Anxiety Disorder (GAD)",
  "Agoraphobia",
  "Separation Anxiety Disorder",
  "Selective Mutism"
];

const typesofStress = [
  "Acute stress",
  "Episodic Acute Stress",
  "Chronic Stress",
  "Physical Stress"
]

 const handleCheckboxChange = (stresses) =>{
 if(stressTypes.includes(stresses)){
  setStressTypes(stressTypes.filter(item => item !== stresses))
 }
 else{
  setStressTypes([... stressTypes, stresses])
 }
   }



  return (
    <div className='anxiety-Container'>
      <h1 className='subheading'>Anxiety Episodes</h1>
      <p className='content'>Please log in your different anxiety episodes:</p>


  
    <label className='content'>1. Current mood?</label><br/><br/>
      <select value={mood} className='setUp' onChange={(m)=> setMood(m.target.value)}>
        <option value="">Select Mood</option>
        <option value="Tired">Tired</option>
        <option value="Energetic">Energetic</option>
        <option value="Sad">Sad</option>
        <option value="Low Spirits">Low Spirits </option>
      </select>
      <br/><br/>

      <label className='content'> 2. Types of Anxiety  attacks you usually experience?</label><br/><br/>
      <select value={anxietyAttacks} className='setUp' onChange={(a)=> setAnxietyAttacks(a.target.value)}>
      <option value= "">Select Diet option ...</option>
      {anxietyAttackTypes.map((attack, index) => (
      <option key={index} value={attack}>{attack}</option>
      ))}
      </select>
      <br/><br/>
      <label className='content'>3. Types of stresses you have experienced recently?</label><br/><br/>
       {typesofStress.map((stress, index)=>{
        return (
        <label key={index} className='emphasized-Text'>
          <input type='checkbox'
          value={stress}
          checked = {stressTypes.includes(stress)}
          onChange={()=> handleCheckboxChange(stress)}/>
          {stress}
          </label>
    )
      })}

       <div className='summary'>
        <p className='content'> Your selected option:</p>  
        <ul >
          {stressTypes.length > 0 ? (
          stressTypes.map((stress, index)=> <li key={index} className='emphasized-Text'>{stress}</li>)
          ) : (
            <li className='content'>No stress option selected</li>
          )}
        </ul>
       </div> 
    </div>


  )
}

export default Anxiety;
