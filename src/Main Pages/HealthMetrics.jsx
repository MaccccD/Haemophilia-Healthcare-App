import { image } from 'd3';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BleedingIcon from "../Images/BleedingData.png";
import BloodTestIcon from "../Images/BloodTests.png";
import ClottingLevelsIcon from "../Images/ClottingLevels.png";
import TestsResultsIcon from "../Images/Resultsss.png";
import JointPainIcon from "../Images/JointPainTracker.png";
import DiabetesIcon from "../Images/Diabetes.png";
import BloodPressureIcon from "../Images/BloodPressure.png";
import MentalHealthIcon from "../Images/MentalHealth.png";
import ptsdIcon from "../Images/PTSD.png";
import anxietyIcon from "../Images/Anxieetyyy.png";
import depressionIcon from "../Images/Depression.png";
import LoadingScreen from '../Main Components/LoadingScreen';


function HealthMetrics() {
    const navigate = useNavigate();
    const[selectedConditions,setSelectedConditions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    //loading state:
    const [loading, setLoading] = useState(true);

    function HandleSearch(e){
    setSearchQuery(e.target.value) ; //updating the search query state variable with whatever the user is typing in the search bar
    }

    // setting up the ease retrieval of the selected conditions when this components mounts so the selected health conditions are obtained
    useEffect(()=>{
      const stored = JSON.parse(localStorage.getItem("selectedHealthConditions"));
      const timerDelay = setTimeout(()=>{
       setLoading(false);
      }, 2000)
      if(Array.isArray(stored)){
        setSelectedConditions(stored); // storing  whats on  the local storage in the state variable as well during mounting
        console.log(stored);
      }
      return () => clearTimeout(timerDelay);
    }, []) // only want the conditions to mounts once, hence its empty here!

    
       if(loading){
       return <LoadingScreen/>
        }
    
    // Config of what to show under each health conditon selected condition
   const healthConditionPages = {
     "Haemophilia": [
      { name: "Bleeding Data", route: "/BleedingData", image: BleedingIcon},
      { name: "Blood Tests", route: "/BloodTest", image: BloodTestIcon},
      { name: "Clotting Levels", route: "/ClottingLevels", image: ClottingLevelsIcon},
      { name: "Haemophilia Lab Results", route: "/HaemophiliaLabResults", image: TestsResultsIcon},
      { name: "Joint Pain Tracker", route: "/JointPainTracker", image: JointPainIcon},
    ],
    
     "Sugar Diabetic": [
      {name: "Diabetes Levels", route: "/Diabetes", image: DiabetesIcon},
      {name: "Diabetes Lab Results", route: "/DiabetesResults", image: TestsResultsIcon}  
    ],
    
    "Hypertension" : [
      {name: "High Blood P. levels", route: "/HighBloodPressure", image: BloodPressureIcon},
      {name: "BP Results", route: "/BPResults", image: TestsResultsIcon}
    ],
  
     "PTSD": [
      {name: "PTSD", route: "/PTSD", image:ptsdIcon}
    ],

     "Anxiety": [
      {name: "Anxiety", route: "/Anxiety", image: anxietyIcon}
    ],
  
     "Depression": [
      {name: "Depression", route: "/Depression", image: depressionIcon}
    ],

     "Generic'Other'": [
      {name: "Mental Health Results", route: "/MentalHealthResults", image: MentalHealthIcon}
    ]
  };
  //The relevant health condition btns based on what health conditions was selcted and saved to the local storage
    const renderButtons = () => {
    return selectedConditions.flatMap(condition => // flat map here flattens the results of the state variables array into one level depth to get one flat array of btns
       (healthConditionPages[condition] || [])
      .filter(page => //in here "filter" ensures that the search query (so what is typed) includes the page's name (what's the actual result of the buttons that are rendered)
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) // making whats being typed lowercase to avoid case mismatch when searching for the actual health metric
      )
      .map((page, index) => (
        <button
          key={`${condition}-${index}`}
          className='bleedingData'
          onClick={() => navigate(page.route)}
        >
          <img src= {page.image}
           alt={page.name} className='metric-Image'/>
           <span className='title-Text'>{page.name}</span>
        </button>
      ))
  );
  };

 
  return (
    <div className='health-Container'>
      <div className='health-Card'>
      <h1 className='health-Text'>Health Metrics:</h1>
       <input type='search' placeholder='Search...' className='search' onChange={HandleSearch}/>
       {selectedConditions.length > 0 && renderButtons().length > 0 ? (
        <div className='buttonsWrapper'>
          {renderButtons()}
        </div>
      ) : (
        <p className='unavailable-Text'>No health metrics available for your current conditions.</p>
      )}
      </div>
      </div>
  )
}

export default HealthMetrics;
