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
  const [showRiskTable, setShowRiskTable] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState(null);
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

  const BloodPressureRiskLevelResults = () => {
    let score = 0;
    let factors = [];

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

    if (unhealthyDiets.includes(latestDietEntry)) {
      score += 2;
      factors.push({
        factor: "Diet",
        condition: latestDietEntry,
        score: "+2",
        status: "Unhealthy"
      });
    } else if (healthyDiets.includes(latestDietEntry)) {
      score -= 1;
      factors.push({
        factor: "Diet",
        condition: latestDietEntry,
        score: "-1",
        status: "Healthy"
      });
    } else if (latestDietEntry) {
      factors.push({
        factor: "Diet",
        condition: latestDietEntry,
        score: "0",
        status: "Neutral"
      });
    }

    // Alcohol risk score
    if (latestAlcoholConsume === "Heavy drinker") {
      score += 2;
      factors.push({
        factor: "Alcohol",
        condition: "Heavy drinker",
        score: "+2",
        status: "High Risk"
      });
    } else if (latestAlcoholConsume === "Occasional Drinker") {
      score += 1;
      factors.push({
        factor: "Alcohol",
        condition: "Occasional Drinker",
        score: "+1",
        status: "Moderate Risk"
      });
    } else if (latestAlcoholConsume) {
      factors.push({
        factor: "Alcohol",
        condition: latestAlcoholConsume,
        score: "0",
        status: "Low Risk"
      });
    }

    // Physical Activity risk score
    if (latestPhysicalAct === "None") {
      score += 1;
      factors.push({
        factor: "Physical Activity",
        condition: "None",
        score: "+1",
        status: "Sedentary"
      });
    } else if (latestPhysicalAct) {
      score -= 2;
      factors.push({
        factor: "Physical Activity",
        condition: latestPhysicalAct,
        score: "-2",
        status: "Active"
      });
    }

    // Smoking risk score
    if (latestSmokerEntry && latestSmokerEntry.length > 0 && !latestSmokerEntry.includes("None")) {
      score += 2;
      factors.push({
        factor: "Smoking",
        condition: Array.isArray(latestSmokerEntry) ? latestSmokerEntry.join(', ') : latestSmokerEntry,
        score: "+2",
        status: "Smoker"
      });
    } else {
      factors.push({
        factor: "Smoking",
        condition: "Non-smoker",
        score: "0",
        status: "Non-smoker"
      });
    }

    // Stress risk score
    if (latestStressEntry && parseInt(latestStressEntry) > 60) {
      score += 1;
      factors.push({
        factor: "Stress Level",
        condition: `${latestStressEntry}% (High)`,
        score: "+1",
        status: "High Stress"
      });
    } else if (latestStressEntry) {
      factors.push({
        factor: "Stress Level",
        condition: `${latestStressEntry}% (Normal)`,
        score: "0",
        status: "Normal Stress"
      });
    }

    // Weight risk score
    if (latestWeightEntry) {
      const weightNum = parseFloat(latestWeightEntry);
      if (weightNum > 90) {
        score += 2;
        factors.push({
          factor: "Weight",
          condition: `${latestWeightEntry}kg (>90kg)`,
          score: "+2",
          status: "High Risk"
        });
      } else if (weightNum > 80) {
        score += 1;
        factors.push({
          factor: "Weight",
          condition: `${latestWeightEntry}kg (80-90kg)`,
          score: "+1",
          status: "Moderate Risk"
        });
      } else {
        factors.push({
          factor: "Weight",
          condition: `${latestWeightEntry}kg (<80kg)`,
          score: "0",
          status: "Normal Weight"
        });
      }
    }
    // Final Evaluation
    let riskLevel, riskColor;
    if (score <= 1) {
      riskLevel = "Low Risk";
      riskColor = "#00FF00";
    } else if (score <= 4) {
      riskLevel = "Moderate Risk";
      riskColor = "orange";
    } else {
      riskLevel = "High Risk";
      riskColor = "red";
    }

    const assessment = {
      totalScore: score,
      riskLevel,
      riskColor,
      factors
    }
    setRiskAssessment(assessment);
    setShowRiskTable(true);

  }


  return (
    <div className='bloodPressureResults-Container'>
      <h1 className='subheading'>High Blood Pressure Risk Scoring System</h1>
      <p className='content'>Here are your blood pressure risk scores based on the data logged in the bigh blood pressure section:</p>
       <button onClick={BloodPressureRiskLevelResults} className='haemophiliaResults-Btn'>Calculate my risk score</button>
       <br/><br/>

       {showRiskTable && riskAssessment && (
        <div>
          <h2 className='emphasied-Text'>
            Your Risk Level: {riskAssessment.riskLevel}
          </h2>
          <p className='emphasized-Text'>Total Score: {riskAssessment.totalScore}</p>
          
          <table className='risk-table'>
            <thead>
              <tr>
                <th className='subheading'>Factor</th>
                <th className='subheading'>Your Data</th>
                <th className='subheading'>Score</th>
                <th className='subheading'>Status</th>
              </tr>
            </thead>
            <tbody>
              {riskAssessment.factors.map((factor, index) => (
                <tr key={index}>
                  <td>{factor.factor}</td>
                  <td>{factor.condition}</td>
                  <td>
                    {factor.score}
                  </td>
                  <td>{factor.status}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total Score:</strong></td>
                <td style={{color: riskAssessment.riskColor}}>
                  <strong>{riskAssessment.totalScore}</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="3"><strong>Risk Level:</strong></td>
                <td style={{color: riskAssessment.riskColor}}>
                  <strong>{riskAssessment.riskLevel}</strong>
                </td>
              </tr>
            </tfoot>
          </table>

          <div  className= "riskLevelGuide">
            <h3>Risk Level Guide:</h3>
            <p><strong className='lowRisk'>Low Risk (0-1):</strong> Your lifestyle factors support healthy blood pressure</p>
            <p><strong className='moderateRisk'>Moderate Risk (2-4):</strong> Some factors may contribute to elevated blood pressure</p>
            <p><strong className='highRisk'>High Risk (5+):</strong> Multiple factors may significantly increase blood pressure risk</p>
          </div>
        </div>
      )}

      {storedbloodPressureLogs.length === 0 && (
        <div className='pressureUnavailable'>
          <p>No blood pressure data found. Please log your data in the High Blood Pressure section first.</p>
        </div>
      )}


        <br/><br/>
        <button onClick={GoBack} className='prevBtn'>Previous</button>

        <button onClick={NavigateNextPage} className='nextButton'>Health Metrics</button>
    </div>
  )
}

export default BPResults;
