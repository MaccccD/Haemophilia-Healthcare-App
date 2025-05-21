import React from 'react';
import { useState } from 'react';
function BleedingData() {
  const [bleedingCount, setBleedingCount] = useState(0);

function IncreaseBleedingCount(){
setBleedingCount(bleedingCount + 1);
if(bleedingCount >= 5){
  setBleedingCount(0);
}
// save the count logged in by the user in the stroage because ill use it to generate results based on it:
  localStorage.setItem("bleedingCount", JSON.stringify(bleedingCount));
  console.log(bleedingCount);

}

function DecreaseBleedCount(){
  setBleedingCount(bleedingCount - 1);
  if(bleedingCount <= 0){
    setBleedingCount(0);
  }
  // save the count logged in by the user in the stroage because ill use it to generate results based on it:
  localStorage.setItem("bleedingCount", JSON.stringify(bleedingCount));
  console.log(bleedingCount);


} 

  return (
    <div>
      <p className='content'>Please log on your bleeding  data episodes: below:</p>
      
      <p className='content'>1. How often have you bled today?</p>
      <p className='content'>Bleeding Count: {`${bleedingCount}`}</p>
       <button onClick={IncreaseBleedingCount}>Increment Bleed Count</button>
       <button onClick={DecreaseBleedCount}>Decrease Bleeding Count</button>
    </div>
  )
}

export default BleedingData;
