import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

function Settings() {
   const [doctorAppointments, setDoctorAppointments] = useState(true);
  const [showLabResults, setShowLabResults] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');
  const [fontSize, setFontSize] = useState('12');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const accountSettings = [
    {id: 1, 
    emailTitle: "Change Email Address"
    },
    {id: 2,
     passwordTitle: "Change Password(s)"
    }
  ];

  const notificationsSettings = [
    {
      id: 1,
      doctorsAppointment: "Doctor's Appointment",
      labResults: "Show Lab Results on Home"
    }
  ];

  const overallAppSettings = [
    {
      id: 1,
      language: "Language",
      fontSize: "Font-size",
      mode: "Dark Mode"

    }
  ]
    
  
  return (
    <div className='settings-Container'>
      <div className='setting-Holder'>
      <h1 className='settings-Heading'>Settings</h1>

      <div className="settings-section">
        <h2 className="section-title">Account</h2>
        <div className="settings-item">
          <span className="settings-label">Change email address</span>
          <ChevronRight className="chevron-icon" size={20} />
        </div>
        <div className="settings-item">
          <span className="settings-label">Change password(s)</span>
          <ChevronRight className="chevron-icon" size={20} />
        </div>
      </div>

     
      <div className="settings-section">
        <h2 className="section-title">Notifications</h2>
        <div className="settings-item">
          <span className="settings-label">Doctor's appointments</span>
          <div 
            className={`toggle-switch ${doctorAppointments ? 'active' : ''}`}
            onClick={() => setDoctorAppointments(!doctorAppointments)}
          >
            <div className="toggle-slider"></div>
          </div>
        </div>
        <div className="settings-item">
          <span className="settings-label">Show Lab Results on home</span>
          <div 
            className={`toggle-switch ${showLabResults ? 'active' : ''}`}
            onClick={() => setShowLabResults(!showLabResults)}
          >
            <div className="toggle-slider"></div>
          </div>
        </div>
      </div>

      
      <div className="settings-section">
        <h2 className="section-title">App Settings</h2>
        <div className="settings-item">
          <span className="settings-label">Language</span>
          <select 
            className="settings-dropdown" 
            value={language} 
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <div className="settings-item">
          <span className="settings-label">Font-size</span>
          <select 
            className="settings-dropdown" 
            value={fontSize} 
            onChange={handleFontSizeChange}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option>
            <option value="18">18</option>
          </select>
        </div>
        <div className="settings-item">
          <span className="settings-label">Dark Mode</span>
          <div 
            className={`toggle-switch ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="toggle-slider"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Settings;
