import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Anxiety() {

  const [mood, setMood] = useState("");
  const [anxietyAttacks, setAnxietyAttacks] = useState("");
  const [stressTypes, setStressTypes] = useState([]);
  const [traumas, setTraumas] = useState("");
  const [societalPressure, setSocietalPressure] = useState("");
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPagge] = useState(false);

  const navigate = useNavigate();

  function NavigateNextPage (){
   navigate("/Depression");
   setNextPage(true);
  }

  function GoBack(){
    navigate("/HealthMetriocs");
    setPrevPagge(true);
  }




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
  "Physical Stress",
  "post-traumatic stress disorder"
]

const exmaplesofTraumas = [
  "childhood trauma",
  "Acts of Violence",
  "Accidents",
  "medical Events"
]

const exmaplesofSocietyPressures = [
  "Social Media validation",
  "Body dysmorphia",
  "Substance Abuse Peer Pressure",
  "Materilaistic Validation"

]

 const handleCheckboxChange = (stresses) =>{
 if(stressTypes.includes(stresses)){
  setStressTypes(stressTypes.filter(item => item !== stresses))
 }
 else{
  setStressTypes([... stressTypes, stresses])
 }
  }
  const handleSave = () =>{
    if(!mood || !anxietyAttacks| !stressTypes || !traumas || !societalPressure){
      alert("Please fill in all the fields before saving the entry")
    }

    alert("Anxiety Episode logged in successfully");
    setMood("");
    setAnxietyAttacks("");
    setStressTypes("");
    setTraumas("");
    setSocietalPressure("");
    
  }





  return (
    <div className='anxiety-Container'>
      <h1 className='subheading'>Anxiety Episodes</h1>
      <p className='content'>Please log in your different anxiety episodes:</p>


  
    <label className='content'>1. Current mood?</label><br/><br/>
      <select value={mood} className='setUp' onChange={(m)=> setMood(m.target.value)}>
        <option value="">Select Current Mood...</option>
        <option value="Tired">Tired</option>
        <option value="Energetic">Energetic</option>
        <option value="Sad">Sad</option>
        <option value="Low Spirits">Low Spirits </option>
      </select>
      <br/><br/>

      <label className='content'> 2. Types of anxiety  attacks you usually experience?</label><br/><br/>
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
        <p className='content'> Your selected option(s):</p>  
        <ul >
          {stressTypes.length > 0 ? (
          stressTypes.map((stress, index)=> <li key={index} className='emphasized-Text'>{stress}</li>)
          ) : (
            <li className='content'>No stress option selected</li>
          )}
        </ul>
       </div> 
       <br/>

       <label className='content' > 4. Please select the type of trauma you have recently experienced:</label><br/><br/>
       <select className='setUp' value={traumas} onChange={(m)=> setTraumas(m.target.value)}>
        <option value= "">Select Option ...</option>
        {exmaplesofTraumas.map((trauma, index)=>{
          <option key={index} value={trauma}>{trauma}</option>
        })}
       </select>
       <br/><br/>

       <label className='content'>5. What form of societal pressure have you experienced the most ? </label><br/><br/>
       <select className='setUp' value={societalPressure} onChange={(s)=> setSocietalPressure(s.target.value)}>
        <option value=""> Select Option ...</option>
        {exmaplesofSocietyPressures.map((pressure, index)=>{
          <option key={index} value={pressure}>{pressure}</option>
        })}
       </select>
        <br/><br/>
       <button onClick={handleSave} className='nextBtn'> Save Entry</button>
       <br/><br/>

        <button onClick={GoBack} className='prevBtn'>Previous</button>

        <button onClick={NavigateNextPage} className='nextButton'>Next</button>

       


    </div>


  )
}

export default Anxiety;
