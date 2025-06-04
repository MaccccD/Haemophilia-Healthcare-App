import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';


// retriveing existing details
const username = JSON.parse(localStorage.getItem("userDetails")) || { fullNames: "Guest" };
const storedAge = JSON.parseInt(localStorage.getItem("age"), 10);
const DiabetesType = JSON.parse(localStorage.getItem("DiabetesType"));


  //mock diabetes pateint record data:

  const mockPatientRecords = [
    {
      id: "PT001",
      name: username.fullNames,
      age: storedAge,
      diabetesType: DiabetesType,
      diagnosisDate: "2025-06-04",
      lastCheckup: "2025-05-31",
      bloodSugar: {
        current: 145,
        target: "80 - 140",
        status: "Slightly higher"
      },
      hba1c: {
         current: 7.2,
         target: "<7.0",
         status: " needs improvement"
      },
      medications: ["Metformin 500mg", "Glipizide 5mg"],
      lastReading: "2024-12-01",
      notes: "Patient showing good compliance with mediction. Blood sugar levels are improving with diet changes."}
  ]

function DiabetesResults() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(()=>{
    const loadMockDta = () =>{
     setTimeout(()=>{
      setData(mockPatientRecords)
      setLoading(false);
    }, 2000)

    };
    loadMockDta();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        case 'good':
          return "#22c55e";// green
        case 'slighlty high':
          case 'needs improvement':
            return '#f59e0b';//amber
            case'high':
            case 'need attention':
              return '#ef4444'; //red
            default:
              return '#6b7280';
    }
  };

  if(loading){
    return <LoadingScreen/>
  }




  return (
    <div className='diabetesResults-Container'>
      <h1 className='subheading'>Sigar Diabetes Patient Records</h1>
      <p className='content'>Recent patent diabetes monitoring results:</p>
        {data && data.length > 0 ? (
        <div>
          {data.map((patient, index) => (
            <div key={patient.id}>
              <h3>
                 {patient.name} - {patient.diabetesType}
              </h3>
              
              <div className='diabetes-Age'>
                <p className='content'>
                  <strong> Age:</strong> {patient.age} years old | 
                  <strong> Diagnosed:</strong> {new Date(patient.diagnosisDate).toLocaleDateString()}
                </p>
                
                <p className='content'>
                  <strong> Current Blood Sugar:</strong> {patient.bloodSugar.current} mg/dL 
                  <span>
                    {getStatusColor(patient.bloodSugar.status)}
                  </span>
                </p>
                
                <p className='content'>
                  <strong> HbA1c Level:</strong> {patient.hba1c.current}% 
                  <span>
                    {getStatusColor(patient.hba1c.status)}
                  </span>
                </p>
                
                <p className='content'>
                  <strong> Current Medications:</strong> {patient.medications.join(', ')}
                </p>
                
                <p className='content'>
                  <strong> Last Checkup:</strong> {new Date(patient.lastCheckup).toLocaleDateString()} | 
                  <strong> Last Reading:</strong> {new Date(patient.lastReading).toLocaleDateString()}
                </p>
                
                <div>
                  <p className='content'>
                    <strong> Doctor's Notes:</strong>
                  </p>
                  <p className='emphasizedDiabetes-Text'>
                    {patient.notes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='content'>No patient records found.</p>
      )}
    </div>
  )
}

export default DiabetesResults;
