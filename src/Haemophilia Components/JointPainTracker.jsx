import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LoadingScreen from '../Main Components/LoadingScreen';

function JointPainTracker() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [customDate, setCustomDate] = useState("")
  const [jointsAffected, setAffectedJoints] = useState("");
  const [painSeverity, setPainSeverity] = useState(0);
  const [swelling, setSwelling] = useState(false);
  const [mobility, setMobility] = useState("");
  const [filledFields, setFilledFields] = useState(true);
  const [painData, setPainData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
   const retrievedData =  JSON.parse(localStorage.getItem("JointPaintData")) || [];
   console.log(retrievedData);
   const timerDelay = setTimeout(()=>{
    setLoading(false);
   }, 2000)

   const formattedData = retrievedData.map((entry, index)=>({
    name: entry.customDate || entry.selectedTimeframe || `Entry ${index + 1}`, //shpw on the x-axis
    severity: parseInt(entry.painSeverity), //shows on the y-axis
   }));
   //pass the forated data into the chart data state array variable:
   setChartData(formattedData);
    //cleanup func:
    return () => clearTimeout(timerDelay);
  }, []);
  if(loading){
    return <LoadingScreen/>
    }


  const handleDateChange = (event) => { // handling changes from the date picker
    setCustomDate(event.target.value);
    console.log("Custom date selected", event.target.value)

  }

  const handleTimeFrameChange = (event) => {
    setSelectedTimeframe(event.target.value);

    if(event.target.value !== "custom"){
      setCustomDate(""); // clearing the date if the picked wasn't the custom one
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
    return date.toISOString().split("T")[0];
  };

  const handleSwelling = () =>{
    setSwelling(prev => !prev);
  };

  const handleJointPainTracker = () =>{ // here i'm basically uodating the chart based on the entry data that was oogged by ye user to show them their jont pain trends
    if(!selectedTimeframe  || (selectedTimeframe === "custom" && !customDate) || !jointsAffected || !painSeverity || !swelling || !mobility){
      alert("Please fill out all the various fields first !");
      setFilledFields(false);
      return;
    };
    const jointPainLog = {
    date: getFinalDate(),
    jointsAffected,
    painSeverity: Number(painSeverity), //converting this to a number.
    swelling,
    mobility,
  }
    const updatedJointPainLogs = [...painData, jointPainLog]; // adding what the users logged in and storig in the state array available
    setPainData(updatedJointPainLogs)
    localStorage.setItem("JointPainData", JSON.stringify(updatedJointPainLogs));

  const formattedData = updatedJointPainLogs.map((entry, index) => ({
  name: entry.date || `Entry ${index + 1}`,
  severity: parseInt(entry.painSeverity),
  }));
  setChartData(formattedData);

  //clearing the fields after an entry has been saved :
  setSelectedTimeframe("today");
  setAffectedJoints("");
  setMobility("");
  setCustomDate("");
  setSwelling(false);
  setPainSeverity(5);
  setFilledFields(true);

  };

  return (
    <div className='jointTracker-Container'>
      <h1 className='heading'> Joint bleeding (hermathosis tracker):</h1>
      <p className='content'>Please fill in your joint pain episode entry below</p>

      <label className='content'>1. Date of last joint  pain event:</label><br/><br/>
      <select value={selectedTimeframe} className='setUp' onChange={handleTimeFrameChange}>
        <option value="">Select the correct pain event period:</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="2">2 days ago</option>
        <option value="3">3 days ago</option>
        <option value="custom" className='setUp'>Pick a date</option>
      </select>
      {selectedTimeframe === "custom" && (
        <input type='date' value={customDate} onChange={handleDateChange}/>
      )}

      <p className='emphasized-Text'><strong>Selected Date: {getFinalDate()}</strong></p>

      <label className='content'>2. Which joints were affected by the pain felt?</label><br/><br/>
      <select value={jointsAffected} className='setUp' onChange={(d)=> setAffectedJoints(d.target.value)}>
       <option value= "">Select option below:</option>
       <option value= "Ankles">Knees (Hinge)</option>
       <option value= "Elbows">Elbows (Hinge)</option>
       <option value= "neck & wrist">Wrist(Pivot)</option>
       <option value="Shoulders & Hips">Shoulders & Hips(Ball & Socket)</option>
      </select>
       <br/><br/>
      <label className='content'>3. Pain Severity? (Between 1- 10; 1 = Worst , 10= Not that severe)</label><br/><br/>
      <input type='range' className='setUp' min="1" max= "10" value={painSeverity} onChange={(t)=> setPainSeverity(t.target.value)} required/>
      <br/>
      <p className='emphasized-Text'> Selected Severity : {painSeverity}</p>
      <label className='content'>4. Swelling Present ?</label><br/><br/>
      <label className='toggle-switch'><br/>
      <input type='checkbox' checked= {swelling}  onChange={handleSwelling} />
      <span className='slider'/>
      </label>
      <p>{swelling ? "Yes" : "No"}</p>
     
     <label className='content'>5. Mobility Affected?</label><br /><br/>
     <select className='setUp' value={mobility} onChange={(m)=> setMobility(m.target.value)}>
      <option value= "">Select option below:</option>
      <option value="none">None</option>
      <option value="limited">Limited</option>
      <option value="Walking difficulty">Walking difficulty</option>
     </select>
      <br /><br/>
      <button onClick={handleJointPainTracker} className='nextBtn'>Save Entry</button>

      <h2 className='heading'>Pain Severity Trend (Chart)</h2>
      {chartData.length > 1 ? (
         <ResponsiveContainer width="100%" height={250}>
         <LineChart data={chartData}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis domain={[1, 10]} reversed /> {/* I  reversed so 1 is at the top (worst) */}
         <Tooltip />
         <Line type="monotone" dataKey="severity" stroke="#00FF00" activeDot={{ r: 8 }} />
         </LineChart>
         </ResponsiveContainer>
      ): (
     <p className='content'>Not enough data to show trend. Add another entry first !!</p>
      )}
    </div>
  )
}

export default JointPainTracker;
