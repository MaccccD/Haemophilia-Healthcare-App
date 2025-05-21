import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HealthMetrics() {
    const navigate = useNavigate();
    const[selectedConditions,setSelectedConditions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    function HandleSearch(e){
    setSearchQuery(e.target.value) ; //updating the search query state variable with whatever the user is typing in the search bar
    }

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
      { name: "Bleeding Data", route: "/BleedingData"},
      { name: "Blood Tests", route: "/BloodTest" },
      { name: "Clotting Levels", route: "/ClottingLevels" },
      { name: "Haemophilia Lab Results", route: "/HaemophiliaLabResults" },
      { name: "Joint Pain Tracker", route: "/JointPainTracker" }
    ],
    
     "Sugar Diabetic": [
      {name: "Diabetes Levels", route: "/Diabetes"},
      {name: "Diabetes Lab Results", route: "/DiabetesResults"}  
    ],
    
    "Hypertension" : [
      {name: "High Blood pressure levels", route: "/HighBloodPressure"},
      {name: "BP Results", route: "/BPResults"}
    ],
  
     "PTSD": [
      {name: "PTSD", route: "/PTSD"}
    ],

     "Anxiety": [
      {name: "Anxiety", route: "/Anxiety"}
    ],
  
     "Depression": [
      {name: "Depression", route: "/Depression"}
    ],

     "Generic'Other'": [
      {name: "Mental Health Results", route: "/MentalHealthResults"}
    ]
  };
  
  //The relevant health condition btns based on what health conditions was selcted and saved to the local storage
    const renderButtons = () => {
    return selectedConditions.flatMap(condition => // flat map here flattens the results of the state variables array into one level depth to get one flat array of btns
       (healthConditionPages[condition] || [])
      .filter(page => //in here "filter" ensures that the search query (so what is typed) includes the page's name (what's the actual result of the bttuons that are rendered)
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) // making whats being typed lowercase to avoid case mismatch when searching for the actual health metric
      )
      .map((page, index) => (
        <button
          key={`${condition}-${index}`}
          className='bleedingData'
          onClick={() => navigate(page.route)}
        >
          {page.name}
        </button>
      ))
  );
  };

 
  return (
    <div>
      <h1 className='heading'>Heyy, All things about your health!!</h1>
       <input type='search' placeholder='Search...' className='search' onChange={HandleSearch}/>
       {selectedConditions.length > 0 && renderButtons().length > 0 ? (
        renderButtons()
      ) : (
        <p className='content'>No health metrics available for your current conditions.</p>
      )}
    </div>
  )
}

export default HealthMetrics;
