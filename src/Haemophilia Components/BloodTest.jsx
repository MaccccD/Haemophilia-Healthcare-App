import React from 'react';
import { useState, useEffect } from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';
import { useNavigate } from 'react-router-dom';


function BloodTest() {
 
  const [tests, setTests] = useState([]);
  const [latestEntry, setLatestEntry]= useState(null);
  const [loading, setLoading] = useState(false); //loading state to let users now data is being fetched
  const [nextPage, setNextPage] = useState(false);
  const [prevPage, setPrevPagge] = useState(false);
  

  const navigate = useNavigate();

  function NavigateNextPage (){
   navigate("/ClottingLevels");
   setNextPage(true);
  }

  function GoBack(){
    navigate("/BleedingData");
    setPrevPagge(true);
  }
    //so when the component mounts; it retrieves what was the stored bleed count from the bleeding data that was logged in and saved already
  useEffect(()=>{
    const storedBleedLogs = JSON.parse(localStorage.getItem("bleedingLogs") || "[]");
    console.log(storedBleedLogs);
    const timerDelay = setTimeout(()=>{
    setLoading(false);
     }, 2000)
    if(storedBleedLogs.length > 0){
     const lastEntry = storedBleedLogs[storedBleedLogs.length - 1] //getting the most stored bleed count
     const bleedingCount = lastEntry.bleedingCount;
     setLatestEntry(bleedingCount);
     }
     return () => clearTimeout(timerDelay);
  }, []);

  if(loading){
    return <LoadingScreen/>
  }
  //when i want to show the tests on btn click:
    const bloodTestsToShow=()=>{
    //in here i just wanted to simulate a dynamic  example of blood tests the user may need to take based on the scale of the bleeding count from the previous bleeding episode they would have logged in;
    let recommendedTests = [];

    if(latestEntry === null) return;

    if(latestEntry <= 2){
      
      recommendedTests = [
       {
        testName: "Complete Blood Count (CBC)",
        purpose: "Basic screening for anemia or infections caused by blood loss.",
       }
    ];
    
    } else if(latestEntry <= 5){
      recommendedTests = [{
        testName: "CBC",
        purpose: "Detects low red blood cells from ongoing bleeding.",
      }, 
      {
       testName: "Activated Partial Thromboplastin Time (aPTT)",
       purpose: "Measures clotting time, relevent for Haemophilia.",
      },
    ]
    }
    else{
      recommendedTests =[ 
       {
        testName: "Factor VII Activity Test",
        purpose: "Key Test for Haemophilia A diagnosis."
       },
       {
        testName: "aPTT",
        purpose: "Evaluates clotting efficiency.",
       },
       {
        testName: "Prothrombin Time (PT)",
        purpose: "Checks overall clotting ability.",
       },
       {
        testName: "Von Willebrand Factor Antigen",
        purpose: "Differentiates similar clotting disorders.",
       }, {
        testName: "CBC",
        purpose: "Assesses blood loss effects."
       }
    ];
    }
    //storing recommnded tests in the state variable
    setTests(recommendedTests);
  };

  return (
    <div className='bloodTest-Container'>
      <h1 className='subheading'> Recommended blood tests:</h1><br/>
      <p className='content'> 
        Based  on your bleeding log (Count: {latestEntry ?? "No Entry was retrieved"}), the following tests are recommended to take: 
      </p>
      <button onClick={bloodTestsToShow} className='bloodTests-Btn'>Show Blood Tests</button>

      {tests.length > 0 && (
        <table className='table'>
          <thead>
            <tr>
              <th className='sub-heading'>Test Name</th>
              <th className='sub-heading'>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index)=>{
              return(
                <tr key={index}>
                  <td className='content'>{test.testName}</td>
                  <td className='content'>{test.purpose}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      <br/><br/>
        <button onClick={GoBack} className='prevBtn'>Previous</button>

        <button onClick={NavigateNextPage} className='nextButton'>Next</button>

    </div>
  )
}

export default BloodTest;
