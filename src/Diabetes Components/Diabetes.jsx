import React, { useState } from 'react'

function Diabetes() {
  const [diabetesType, setDiabetesType] = useState("");

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
    </div>
  )
}

export default Diabetes;
