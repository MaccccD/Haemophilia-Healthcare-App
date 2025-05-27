import React, { useEffect, useState } from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';

function HaemophiliaLabResults() {

  const [latestBloodEntry, setLatestBloodEntry] = useState(null);
  const [latestBloodClot, setLatestBloodClotEntry] = useState(null);
  const [loading , setLoading] = useState(true);

  const storedbleedingLogs = JSON.parse(localStorage.getItem("bleedingLogs"), "[]")

  useEffect(()=>{
    const timerDelay = setTimeout(()=>{
      setLoading(false)
    },  2000);
     if(storedbleedingLogs.length > 0 ){

      const latestBloodCount = storedbleedingLogs[storedbleedingLogs.length - 1];
      const bleedingCount = latestBloodCount.bleedingCount;
      const bloodClot = latestBloodCount.bloodClot;
      setLatestBloodEntry(bleedingCount);
      setLatestBloodClotEntry(bloodClot);
      console.log(bleedingCount && bloodClot);
     }
    return ()=> clearTimeout(timerDelay);
  }, []);

  if(loading){
    return <LoadingScreen/>
  }

  const resultsToShow = ()=> {
    let variedResults = [];

    if(latestBloodEntry === null) return;

    if(latestBloodEntry <= 2 && latestBloodClot === "25 - 30 seconds"){

      variedResults = [
        {testConducted: "Complete Blood Count (CBC)"},
        {result: "Tested positive (+) for anemia due to blood loss and low red blodd cells."},
        {result2: "Tested negative (-) for non-intake of Blood Thinners, hence your clotting time is within normal means."},
        {recommendedMedication: "xyz"}
      ];
    }
      else if(latestBloodEntry <= 5 && latestBloodClot === "45 seconds"){
        variedResults = [
          {testConducted: "Activated Partial Thromboplastin Time (aPTT)"},
          {result: "Tested positive (+) for prolonged blood clotting time and detected Blodd Thinner medication"},
          {reuslt2: "Tested negative for anemia."},
          {recommendedMedication: "abc"}
        ];
      }


    }
  
  return (
    <div className='results-Container'>
      <p className='content'>Based on your logged blood count:{latestBloodEntry ?? "No blood count  entry was logged in"}  && blood clot duration : {latestBloodClot ?? "No blood clot entry was logged in!"}</p>
       <p className='content'>Here are your blood test results: </p>
       <button className='haemophiliaResults-Btn' onClick={resultsToShow}>Show Results</button>
    </div>
  )
}
export default HaemophiliaLabResults;
