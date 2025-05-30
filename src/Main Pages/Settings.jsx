import React, { useState } from 'react';

function Settings() {
  const [toggleAppointments, setToggleAppoints] = useState(false);
  const [theme, setCurrentTheme] = useState("DarkMode") 

  function toggleTheme(){
    if(theme === "DarkMode"){
      setCurrentTheme("LightMode")
    } else{
      setCurrentTheme("DarkMode");
    }
  }

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
