import { index } from 'd3';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HighBloodPressure() {

  const [diet, setDiet] = useState([]);
  const [phsyicalActivity, setPhysicalActivity] = useState("");
  const [alcoholConsumption, setAlcoholConsumption] = useState();
  const [stressLevels, setStressLevels] = useState(0);
  const [weight, setWeight] = useState(0);
  const [smokerOptions, setSmokerOptions] = useState([]);
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPagge] = useState(false);

  const navigate = useNavigate();

  function NavigateNextPage (){
   navigate("/BPResults");
   setNextPage(true);
  }

  function GoBack(){
    navigate("/Diabetes");
    setPrevPagge(true);
  }

 const handleSave = () =>{
  if(!diet || !phsyicalActivity || !alcoholConsumption || !stressLevels ||!weight){
    alert("Please complete all fields in the entry to submit to the doctor!");
    return;
  }
  alert ("High Blood Pressure Entry logged successfully");
  setDiet("");
  setPhysicalActivity("");
  setAlcoholConsumption("");
  setStressLevels("");
  setWeight("");
 }

  const dietOptions = [
 "High Saturated Fat Intake (e.g. fatty meats, butter)",
  "High Trans Fat Intake (e.g. fried snacks, baked goods)",
  "Low Fruit and Vegetable Intake",
  "High Sugar Intake (e.g. soda, sweets)",
  "Whole Grain Consumption",
  "Low-Fat Dairy Products",
  "Lean Protein Intake (e.g. chicken, fish, legumes)",
  "Reduced Red Meat Consumption",
  "Limiting Processed Foods",
  "Drinking Plenty of Water",

  ]

  const alcoholOptions = [
    "None",
    "Occasional Drinker",
    "Heavy drinker",
  ]


  const physicalActOptions = [
    "Running",
    "Walking",
    "Gym",
    "Yoga",
    "Pilates",
    "None"
  ]

  const typeofSmoker = [
    "Cigarette Smoker",
    "Vaper ",
    "Weed smoker ",
    "None"

  ]



  const bloodPressureLogs =
    {
      diet,
      phsyicalActivity,
      alcoholConsumption,
      stressLevels,
      weight,
      smokerOptions

    }
   const existingLogs = JSON.parse(localStorage.getItem("bloodPressureLogs")) || [];
    const updatedLogs = [...existingLogs, bloodPressureLogs];
    localStorage.setItem("bloodPressureLogs", JSON.stringify(updatedLogs));
  

  const handleCheckboxChange = (smoker) =>{
 if(smokerOptions.includes(smoker)){
  setSmokerOptions(smokerOptions.filter(item => item !== smoker))
 }
 else{
  setSmokerOptions([... smokerOptions, smoker])
 }
   }

  return (
    <div className='bloodPressure-Container'>
      <h1 className='heading'>High Blood Pressure levels:</h1>
      <p className='content'> Please log in your entry:</p>


      <label className='content'>1. Please select your diet Intake ?</label><br/><br/>
       <select value={diet} className='setUp' onChange={(d)=> setDiet(d.target.value)}>
    <option value= "">Select Diet option ...</option>
  {dietOptions.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))}
  </select>
     <br/><br/>

     <label className='content'>2. Please indicate  your alcohol consumption , (if any) :</label><br/><br/>
     <select value={alcoholConsumption} className='setUp' onChange={(a)=> setAlcoholConsumption(a.target.value)}>
      <option value= "">Select Option ...</option>
      {alcoholOptions.map((alcohol, index) =>(
        <option key={index} value={alcohol}>{alcohol}</option>
      ))}
     </select>
     <br/><br/>

     <label className='content'>3. Types of physical activities you engage in :</label><br/><br/>
     <select value={phsyicalActivity} className='setUp' onChange={(p)=> setPhysicalActivity(p.target.value)}>
      <option value= "">Select Option ...</option>
      {physicalActOptions.map((option, index)=>(
        <option key={index} value={option}>{option}</option>
     )) }
     </select>
     <br/><br/>

     <label className='content'>4. Type of Smoker (if any)</label><br/><br/>
      {typeofSmoker.map((smoker, index)=>{
        return (
        <label key={index} className='emphasized-Text'>
          <input type='checkbox'
          value={smoker}
          checked = {smokerOptions.includes(smoker)}
          onChange={()=> handleCheckboxChange(smoker)}/>
          {smoker}
        </label>
        )
      })}

       <div className='summary'>
        <p className='content'> Your selected option:</p>  
        <ul >
          {smokerOptions.length > 0 ? (
            smokerOptions.map((smoker, index)=> <li key={index} className='emphasized-Text'>{smoker}</li>)
          ) : (
            <li className='content'>No smoking option selected</li>
          )}
        </ul>
       </div>
       <br/> 
       <label className=' content'>5. Please indicate your stress levels:</label><br/><br/>
       <input type='range' className='setUp' placeholder='stress Indicator' value={stressLevels} onChange={(s)=> setStressLevels(s.target.value)}/>
       <br/>
       <p className='content'>Stress Level: {stressLevels}</p>

       <br/>
       <label className='content'> 6. How much do you weigh ?</label><br/><br/>
       <input type='number' className='setUp' placeholder='Weight in KG' value={weight} onChange={(w)=> setWeight(w.target.value)}/>
       <br/><br/>
       <button onClick={handleSave} className='nextBtn'> Save Entry</button>
       <br/><br/>

        <button onClick={GoBack} className='prevBtn'>Previous</button>

        <button onClick={NavigateNextPage} className='nextButton'>Next</button>
      

    </div>
  )
}

export default HighBloodPressure;
