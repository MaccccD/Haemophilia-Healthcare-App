import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HealthMetrics() {
    const navigate = useNavigate();
    const[selectedConditions,setSelectedConditions] = useState([]);

    // setting up the ease retrieval of the selcted conditions when this components mounts so the slected health cinditions are obtained
    useEffect(()=>{
      const stored = JSON.parse(localStorage.getItem("selectedHealthConditions"));
      if(Array.isArray(stored)){
        setSelectedConditions(stored); // storing  whats on  the local storage in the state variable as well during mounting
        console.log(stored);
      }
    }, []) // only want the conditions to mounts once, hence its empty here!
    
    // Config of what to show under each health conditon selected condition
   const healthConditionPages = {
     "Haemophilia": [
      { name: "Bleeding Data", route: "/BleedingData" },
      { name: "Blood Tests", route: "/BloodTests" },
      { name: "Clotting Levels", route: "/ClottingLevels" },
      { name: "Haemophilia Lab Results", route: "/HaemophiliaLabResults" },
      { name: "Joint Pain Tracker", route: "/JointPainTracker" }
    ],
    
     "Sugar Diabetic": [
      {name: "Diabetes Levels", route: "/Diabetes Components/Diabetes"},
      {name: "Diabetes Lab Results", route: "/Diabetes Components/DiabetesResults"}  
    ],
    
    "Hypertension" : [
      {name: "High Blood pressure levels", route: "/High Blood Pressure Components/HighBloodPressure"},
      {name: "BP Results", route: "/High Blood Pressure Components/BPResults"}
    ],
  
     "PTSD": [
      {name: "PTSD", route: "/Mental Health Components/PTSD"}
    ],

     "Anxiety": [
      {name: "Anxiety", route: "/Mental Health Components/Anxiety"}
    ],
  
     "Depression": [
      {name: "Depression", route: "/Mental Health Components/Depression"}
    ],

     "Generic'Other'": [
      {name: "Mental Health Results", route: "/Mental Health Components/MentalHealthResults"}
    ]
  };
  
  //The relevant health condition btns based on what health conditions was selcted and saved to the local storage
    const renderButtons = () => {
    return selectedConditions.flatMap(condition => // flat map here flattens the results of the state variables array into one level depth to get one flat array of btns
      healthConditionPages[condition]?.map((page, index) => (
        <button
          key={`${condition}-${index}`}
          className='bleedingData'
          onClick={() => navigate(page.route)}
        >
          {page.name}
        </button>
      )) || []
    );
  };

  return (
    <div>
      <h1 className='heading'>Heyy, All things about your health!!</h1>
       {selectedConditions.length > 0 && renderButtons().length > 0 ? (
        renderButtons()
      ) : (
        <p>No health metrics available for your current conditions.</p>
      )}
    </div>
  )
}

export default HealthMetrics;
