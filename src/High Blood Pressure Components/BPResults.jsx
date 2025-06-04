import React, { useState, useEffect } from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';
import { useNavigate } from 'react-router-dom';


function BPResults() {

  const storedbloodPressureLogs = JSON.parse(localStorage.getItem("bloodPressureLogs") || "[]");
  const [latestDietEntry, setLatestDietEntry] = useState(null);
  const [latestPhysicalAct, setLatestPhysicalAct] = useState(null);
  const[latestAlcoholConsume, setLatestAlcoholConsume] = useState(null);
  const [latestSmokerEntry, setLatestSmokerEntry] = useState(null);
  const [latestStressEntry, setLatestStressEntry] = useState(null);
  const [latestWeightEntry, setLatestWeightEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPagge] = useState(false);

  const navigate = useNavigate();

  function NavigateNextPage (){
   navigate("/HealthMetrics");
   setNextPage(true);
  }

  function GoBack(){
    navigate("/HighBloodPressure");
    setPrevPagge(true);
  }



   useEffect(()=>{
    const timerDelay = setTimeout(()=>{
      setLoading(false)
    },  2000);
     if(storedbloodPressureLogs.length > 0 ){

      const latestBP= storedbloodPressureLogs[storedbloodPressureLogs.length - 1];
      const recentDiet = latestBP.diet;
      const recentPhysicalAct = latestBP.physicalActivity;
      const recentAlcoholCon = latestBP.alcoholConsumption;
      const recentStressLevel = latestBP.stressLevels;
      const recentWeight = latestBP.weight;
      const recentSmokerSelect = latestBP.smokerOptions;

      setLatestDietEntry(recentDiet);
      setLatestPhysicalAct(recentPhysicalAct);
      setLatestAlcoholConsume(recentAlcoholCon);
      setLatestStressEntry(recentStressLevel);
      setLatestWeightEntry(recentWeight);
      setLatestSmokerEntry(recentSmokerSelect);
     }
    return ()=> clearTimeout(timerDelay);
  }, []);

  if(loading){
    return <LoadingScreen/>
  }

  const BloodPressureRiskLevelResults =()=>{
     let score = 0;

  // Diet risk
  const unhealthyDiets = [
    "High Saturated Fat Intake (e.g. fatty meats, butter)",
    "High Trans Fat Intake (e.g. fried snacks, baked goods)",
    "Low Fruit and Vegetable Intake",
    "High Sugar Intake (e.g. soda, sweets)"
  ];
  const healthyDiets = [
    "Whole Grain Consumption",
    "Low-Fat Dairy Products",
    "Lean Protein Intake (e.g. chicken, fish, legumes)",
    "Reduced Red Meat Consumption",
    "Limiting Processed Foods",
    "Drinking Plenty of Water"
  ];
  if (unhealthyDiets.includes(latestDietEntry)) score += 2;
  if (healthyDiets.includes(latestDietEntry)) score -= 1;

  // Alcohol risk score
  if (latestAlcoholConsume === "Heavy drinker") score += 2;
  else if (latestAlcoholConsume === "Occasional Drinker") score += 1;

  // Physical Activity risk score
  if (latestPhysicalAct === "None") score += 1;
  else score -= 2;

  // Smoking risk score
  if (latestSmokerEntry.length > 0 && !latestSmokerEntry.includes("None")) score += 2;

  // Stress risk score
  if (parseInt(latestStressEntry) > 60) score += 1;

  // Weight risk score
  const weightNum = parseFloat(latestWeightEntry);
  if (weightNum > 90) score += 2;
  else if (weightNum > 80) score += 1;

  // Final Evaluation
  if (score <= 1) return "Low Risk"; // green color
  else if (score <= 4) return "Moderate Risk";//amber ''
  else return "High Risk"; // red ';

  }


  return (
    <div className='bloodPressureResults-Container'>
      <h1 className='subheading'>High Blood Pressure Risk Scoring System</h1>
      <p className='content'>Here are your blood pressure risk scores based on the data logged in the bigh blood pressure section:</p>
       <button onClick={BloodPressureRiskLevelResults} className='haemophiliaResults-Btn'>Show Risk System</button> 
      <table className='risk-table'>
        <thead>
          <tr>
            <th className='subheading'>Factor</th>
            <th className='subheading'>Condition</th>
            <th className='subheading'>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Diet</td>
            <td>Unhealthy (e.g. High fat/sugar low, low veggies etc.)</td>
            <td>+2</td>
          </tr>
          <tr>
          <td>Diet</td>
          <td>Healthy (e.g. Lean protein water)</td>
          <td>-1</td>
          </tr>
          <tr>
            <td>Alcohol</td>
            <td>Heavy drinker</td>
            <td>+2</td>
          </tr>
          <tr>
            <td>Alcohol</td>
            <td>Occasional drinker</td>
            <td>+1</td>
          </tr>
           <tr>
        <td>Physical Activity</td>
        <td>None</td>
        <td>+1</td>
      </tr>
      <tr>
        <td>Physical Activity</td>
        <td>Regular (e.g. walking, gym, yoga)</td>
        <td>-2</td>
      </tr>
      <tr>
        <td>Smoking</td>
        <td>Any smoker type</td>
        <td>+2</td>
      </tr>
      <tr>
        <td>Stress</td>
        <td>Above 60</td>
        <td>+1</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>Above 90kg</td>
        <td>+2</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>80kg – 90kg</td>
        <td>+1</td>
      </tr>
        </tbody>
         <tfoot>
      <tr>
        <td colSpan="2"><strong>Total Score Meaning:</strong></td>
        <td>
          <div>
            <div><strong>0 – 1:</strong> Low Risk</div>
            <div><strong>2 – 4:</strong> Moderate Risk</div>
            <div><strong>5+ :</strong> High Risk</div>
          </div>
        </td>
      </tr>
    </tfoot>
      </table>


        <br/><br/>
        <button onClick={GoBack} className='prevBtn'>Previous</button>

        <button onClick={NavigateNextPage} className='nextButton'>Health Metrics</button>
    </div>
  )
}

export default BPResults;
