import React, { useEffect, useState } from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';

function HaemophiliaLabResults() {

  const [latestBloodEntry, setLatestBloodEntry] = useState(null);
  const [latestBloodClot, setLatestBloodClotEntry] = useState(null);
  const [loading , setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const storedbleedingLogs = JSON.parse(localStorage.getItem("bleedingLogs") || "[]");

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

     if(latestBloodEntry === null) {
      alert ("No Blood entry was logged in!");
      return;
     }

       const clotDurationSecs = parseInt(latestBloodClot.replace("/[^\d]/g", ""));

     // Blood count independent evaluton:
     if(latestBloodEntry <= 2){
      variedResults.push(
        {label: "Test Conducted", value: "Complete Blood Count (CBC).", severity: "mild"},
         {label: "Result", value: "Tested positive (+) for anemia due to blood loss, low platelet count &  low red blood cells.", severity:"mild"},
         {label: "Treatment Options", value: "Iron supplements, B12, Corticosteroids or IVIG.", severity: "mild"}
      );
    }
      else if(latestBloodEntry <= 5){
        variedResults.push(
          {label: "Observation", value: "Moderate bleeding activity detected. Further evaluation recommended."}
        );
      }
      else if(latestBloodEntry >= 6) {
        variedResults.push(
          {label: "Warning", value: "Excessive bleeding frequency. Possible  hemorrhagic disorder.", severity: "severe"}
        );
      }

      //Blood clot independent evaluation :
      if(clotDurationSecs <= 30){
        variedResults.push(
          {label: "Blood Clotting", value: "Normal (25 - 30 seconds)", severity: "mild"}
        );
      } else if(clotDurationSecs <= 45){
        variedResults.push(
          {label:"Test Conducted", value: "Activated Partial Thromboplastin Time (aPTT).", severity: "moderate"},
          {label:"Result", value: "Tested positive (+) for prolonged blood clotting time and detected Blood Thinner medication.", severity: "moderate"},
          {label:"Blood Clotting", value: "Moderate (45 seconds).", severity: "moderate"},
          {label:"Diagnosis", value: "Haemophilia A.", severity: "moderate"},
          {label:"Treatment Options", value: "Replacement therapy (Factor VIII or IX concentrates), Desmopressin (mild Hem A).", severity: "moderate"}
        );
      }else if(clotDurationSecs >= 60){
        variedResults.push(
         {label:"Test Conducted", value: "Fibrinogen level test."}, 
          {label:"Result", value: "Tested positive (+) for excessive bleeding or hemorrhage.", severity: "severe"}, 
          {label:"Other Findings", value: "Tested positive (+) for thrombophilia (Inherited), i.e. excessive clotting.", severity: "severe"},
          {label: "Blood Clotting", value: "High risk (60 seconds - 2 minutes).", severity: "severe"},
          {label:"Treatment Options", value: "Anticoagulants (Blood Thinners)."}
        );

        if(variedResults.length === 0){
          variedResults.push(
            {label: "Note",
              value: "Results inconclusive or did not match known thresholds"
            }
          );
        }
      }
      setResults(variedResults);
      console.log("Showing Results:", variedResults);
    }
     return (
    <div className='results-Container'>
      <h1 className='heading'>Haemophilia Results:</h1>
      <p className='content'>Based on your logged blood count: {latestBloodEntry ?? "No blood count  entry was logged in"}  & blood clot duration : {latestBloodClot ?? "No blood clot entry was logged in!"}.</p>
       <p className='content'>Here are your blood test results: </p>
       <button onClick={resultsToShow} className='haemophiliaResults-Btn'>Show Results</button> 
       {results.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
            <th className='subheading'>Category</th>
            <th className='subheading'>Details</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index)=>{
             return (
              <tr key={index}>
               <td className= {`content result-cell ${result.severity || ''}`}>{result.label}</td>
               <td className={`content result-cell ${result.severity || ''}`}>{result.value}</td>
              </tr>
             );
            })}
          </tbody>
        </table>
        )}
    </div>
  );
}
export default HaemophiliaLabResults;
