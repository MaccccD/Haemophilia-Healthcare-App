import React, { useState } from 'react'

function Depression() {

  const [depressionSymptoms, setDepressionSymptoms] =  useState([]);
  const [surroundingsSymptoms, setSurroundingSymptoms] = useState([]);
  const [personalityTraits, setPersonalityTraits] = useState("");
  const [copingMechanism, setCopingMechanism] = useState("");

  
  
 const emotionalSymptoms = [
  "Persistent Sadness",
  "Irritability",
  "Anger",
  "Frustration",
  "Feelings of worthlessness",
  "Suicidal thoughts",

 ]

 const behaviouralSymptoms  = [
  "Changes in sleep pattens ",
  "Changes in appetite",
  "Fatigue or low energy",
  "Difficulty Concentrating",
  "Increased restlesness",
  "Slowed thinking "

 ];

 const examplesofCopingMechanism = [
  "Listening to Music",
  "Isolation",
  "Smoking",
  "Drinking",
  "Praying"
 ]


  const handleFirstCheckbox = (symptoms) =>{
 if(depressionSymptoms.includes(symptoms)){
  setDepressionSymptoms(depressionSymptoms.filter(item => item !== symptoms))
 }
 else{
  setDepressionSymptoms([... depressionSymptoms, symptoms])
 }
   }

   const handleSecondCheckBox = (characteristics) =>{
 if(surroundingsSymptoms.includes(characteristics)){
  setSurroundingSymptoms(surroundingsSymptoms.filter(item => item !==  characteristics))
 }
 else{
  setSurroundingSymptoms([... surroundingsSymptoms, characteristics])
 }
   }




  return (
    <div className='depression-Container'>
      <h1 className='subheading'>Depression Episodes</h1>
      <p className='content'>Please log in your different depression episodes:</p>
      <br/>

      <label className='content'>1. What type of emotional sytmopms do you usually experience ?</label><br/><br/>
      {emotionalSymptoms.map((symptoms, index)=> {
        return(
          <label key={index} className='emphasized-Text'>
          <input type='checkbox'
          value={symptoms}
          checked = {depressionSymptoms.includes(symptoms)}
          onChange={()=> handleFirstCheckbox(symptoms)}/>
          {symptoms}
          </label>
        )
      })}

       <div className='summary'>
        <p className='content'> Your selected option(s):</p>  
        <ul >
          {depressionSymptoms.length > 0 ? (
          depressionSymptoms.map((symptoms, index)=> <li key={index} className='emphasized-Texts'>{symptoms}</li>)
          ) : (
            <li className='content'>No emotinal symptom option selected</li>
          )}
        </ul>
       </div> 
       <br/><br/>

       <label className='content'>2. What types of behavioural symptoms do you  usually experience ?</label><br/><br/>
        {behaviouralSymptoms.map((characteristics, index)=>{
          return (
            <label key={index} className='emphasized-Text'>
          <input type='checkbox'
          value={characteristics}
          checked = {surroundingsSymptoms.includes(characteristics)}
          onChange={()=> handleSecondCheckBox(characteristics)}/>
          {characteristics}
          </label>
          )
        })}
           <div className='summary'>
        <p className='content'> Your selected option(s):</p>  
        <ul >
          {surroundingsSymptoms.length > 0 ? (
          surroundingsSymptoms.map((characteristic, index)=> <li key={index} className='emphasized-Text'>{characteristic}</li>)
          ) : (
            <li className='content'>No behavioural symptom option selected</li>
          )}
        </ul>
       </div> 
       <br/><br/>

       <label className='content'>3. What kind of personality trait do you feel resonates with you the most ?</label><br/><br/>
       <select className='setUp' value={personalityTraits} onChange={(p)=> setPersonalityTraits(p.target.value)}>
        <option value="">Select Option...</option>
        <option value= "low self esteem">Low self esteem</option>
        <option value= "pessimisim ">Pessimism</option>
        <option value="Ambivert">Ambivert</option>
        <option value="neuroticism">Neuroticism</option>
        <option value="Shyness">Shyness</option>
       </select>
       <br/><br/>

       <label className='content'>4. What is your coping mechanism ?</label><br/><br/>
       <select className='setUp' value={copingMechanism} onChange={(c)=> setCopingMechanism(c.target.value)}>
        <option value=""> Select Option ...</option>
        {examplesofCopingMechanism.map((cope, index)=>{
          <option key={index} value={cope}>{cope}</option>
        })}
       </select>
       
    </div>
  )
}

export default Depression;
