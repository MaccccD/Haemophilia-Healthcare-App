import React, { useState } from 'react'

function Anxiety() {

  const [mood, setMood] = useState("");
  const [panickAttack, setPaicAttack] = useState("");
  const [stressTypes, setStressTypes] = useState([]);
  const [traumas, setTraumas] = useState([]);
  const [personalityTrait, setPersonalityTrait] = useState("");
  const [selectedSymptoms, setSelectedSymptoms ] = useState([]);





  return (
    <div className='anxiety-Container'>
      <p className='content'>Please log in your different anxiety episodes:</p>
    </div>
  )
}

export default Anxiety;
