import React, { useState } from 'react'

function Settings() {
  const [toggleAppointments, setToggleAppoints] = useState(false);



  const handleAppointmentsToggle = () =>{
    setToggleAppoints(prev => !prev);
  }
  return (
    <div className='settings-Container'>
      <h1 className='heading'>Settings:</h1>

      <label className='notif-Container'>Notifications</label>
    </div>
  )
}

export default Settings;
