import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';

function DiabetesResults() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const diabetesRecords = "https://api.fda.gov/drug/label.json?search=indications_and_usage:diabetes&limit=5";

  useEffect(()=>{
     const fetchData = async () => {
      try {
        const response = await axios.get(diabetesRecords);
        
        console.log('FDA API Response:', response.data);
        setData(response.data.results || []);
        setError(null);
      } catch (error) {
        console.error('FDA API Error:', error);
        setError(error.response?.data?.error?.message || error.message || 'Failed to fetch FDA iabetes related data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const timerDelay = setTimeout(()=>{
      setLoading(false);
    }, 2500)


    return ()=> clearTimeout(timerDelay);

  }, []);


  if(loading){
   return <LoadingScreen/>
  }

  // Show error state
  if (error) {
    return (
      <div className='diabetesResults-Container'>
        <h1 className='subheading'>Sugar Diabetes Medication Results</h1>
        <p className='content' style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }



  return (
     <div className='diabetesResults-Container'>
      <h1 className='subheading'>Sugar Diabetes Medication Results</h1>
      <p className='content'>Top 5 Diabetes Medications from FDA:</p>
      
      {data && data.length > 0 ? (
        <div>
          {data.map((drug, index) => (
            <div key={index} className='first-Div'>
              <h3>
                {drug.openfda?.brand_name?.[0] || drug.openfda?.generic_name?.[0] || 'Diabetes Medication'}
              </h3>
              
              <div>
                {drug.openfda?.manufacturer_name?.[0] && (
                  <p className='content'>
                    <strong> Made by:</strong> {drug.openfda.manufacturer_name[0]}
                  </p>
                )}
                
                {drug.openfda?.route?.[0] && (
                  <p className='content'>
                    <strong> How to take:</strong> {drug.openfda.route.slice(0, 2).join(', ')}
                  </p>
                )}
                
                {drug.active_ingredient && drug.active_ingredient.length > 0 && (
                  <p className='content'>
                    <strong> Main ingredient:</strong> {drug.active_ingredient[0]}
                  </p>
                )}
                
                {drug.purpose && (
                  <div>
                    <p className='content'>
                      <strong>What it's for:</strong>
                    </p>
                    <p className='emphasized-Text'>
                      {drug.purpose[0].length > 150 
                        ? drug.purpose[0].substring(0, 150) + '...' 
                        : drug.purpose[0]
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='content'>No diabetes medications found.</p>
      )}
    </div>
  );
}

export default DiabetesResults;
