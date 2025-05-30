import React, { useState } from 'react'

function JointPainTracker() {
  const [painTrakcer, setPainTracker] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [painEvent, setPainEvent] = useState(0);
  const[customDate, setCustomDate] = useState("")
  const[jointsAffected, setAffectedJoints] = useState("");
  const [painDuration, setPainDuration] = useState(0);
  const[swelling, setSwelling] = useState("");
  const [mobility, setMobility] = useState("");
  const[trigger, setTrigger] = useState("");


  const handleDateChange = (event) => { // handling changes from the date picker
    setCustomDate(event.target.value);
    console.log("Custom date selected", event.target.value)

  }

  const handleTimeFrameChange = (event) => {
    setSelectedTimeframe(event.target.value);

    if(event.target.value != "custom"){
      setCustomDate(""); // clering the date if the picked wasn't the custom one
    }
  }

  const getFinalDate = ()=>{ // getting final date based on what the user selected.
    if(selectedTimeframe === "custom") return customDate;
    console.log(customDate);

    const today = new Date();
    let daysAgo = 0;

    switch(selectedTimeframe){
       case "today":
        daysAgo = 0;
        break;
       case "yesterday":
        daysAgo = 1;
        break;
       case "2":
        daysAgo = 2;
        break;
       case "3":
        daysAgo = 3;
        break;
        default:
        daysAgo = 0;
    }

    const date = new Date(today);
    date.setDate(today.getDate()  - daysAgo);
    return date.toISOString().split("T")[0]; // to sho the yyy/mm/dd format.
  };

  return (
    <div className='jointTracker-Container'>
      <h1 className='heading'> Joint bleeding (hermathosis tracker):</h1>
      <p className='content'>Please fill in your joint pain episode entry below</p>

      <label className='content'>1. Date of Last Pain Event:</label><br/><br/>
      <select value={selectedTimeframe} className='setUp' onChange={handleTimeFrameChange}>
        <option value= "">Please select the correct pain event period:</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="2">2 days ago</option>
        <option value="3">3 days ago</option>
        <option value="custom" className='setUp'>Pick a date</option>
      </select>
      {selectedTimeframe === "custom" && (
        <input type='date' value={customDate} onChange={handleDateChange}/>
      )}

      <p><strong>Selected Date: {getFinalDate()}</strong></p>

      <label className='content'>2. Which joints were affected by the pain felt?</label><br/><br/>
      < select value={jointsAffected} className='setUp' onChange={(d)=> setAffectedJoints(d.target.value)}>
       <option value= ""> Select option below:</option>
       <option value= "Ankles">Knees (Hinge)</option>
       <option value= "Elbows">Elbows (Hinge)</option>
       <option value= "neck & wrist">Wrist(Pivot)</option>

      </select>
    </div>
  )
}

export default JointPainTracker;
