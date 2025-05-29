import React, { useState } from 'react'

function JointPainTracker() {
  const [painTrakcer, setPainTracker] = useState("");
  return (
    <div className='jointTracker-Container'>
      <p className='content'>Here is your joint pain tracker:</p>
    </div>
  )
}

export default JointPainTracker;
