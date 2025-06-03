import React, { useState } from 'react'

function Appointments() {
  const [appointmentDates , setAppointmentDates] = useState(0);
  const [appoointemntTime, setAppointmentTime] = useState(0);
  const [appointmentLocation, setAppointmentLocation] = useState("");
  const [appointmentAbout, setAppointmentAbout] = useState("");


  function appointmentDetails(date, time, location, about){
  
  }
  
  return (
    <div className='appointments-Container'>
      <div className='appointments-Holder'>
        <p className='messages-Text'>Appointments:</p>
        

      </div>
    </div>
  )
}

export default Appointments;
