import React, { useState } from 'react'

function Appointments() {
  const [appointments , setAppointments] = useState([
    {id: 1,
      date: "2025-07-04",
      time: "09h00- 10h00",
      location: "Milpark Hospital",
      about: "Bleeding Data Consultation"
    },
    {
      id: 2,
      date: "2025-07-15",
      time:"12h00-13h00",
      location: "Bara Hospital, Msotra",
      about: "Clotting Levels Data Review"
    },
    {
     id: 3,
     date: "2025-07-15",
     time: "11h00-12h30",
     location: "N17 Hospital",
     about: "Mental Health Therapy Session"
    },
    {id: 4,
     date: "2025-07-25",
     time: "07h30-09h30",
     location: "Parkland Hospital",
     about: "Diabetes Health Results Review"
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(6);
  const [currentYear, setCurrentYear] = useState(2025);
 
  // Get number of days in a given month/year
const getDaysinMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get the first day of the month (0 = Sunday, 6 = Saturday)
const getfirstDayofMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

// Generate calendar day cells
const generateCalendarDays = () => {
  const daysinMonth = getDaysinMonth(currentYear, currentMonth);
  const firstDayofMonth = getfirstDayofMonth(currentMonth, currentYear);
  const days = [];

  // Add empty cells before the first day
  for (let i = 0; i < firstDayofMonth; i++) {
    days.push({ day: null, isCurrentMonth: false });
  }

  // Add actual days of the month
  for (let day = 1; day <= daysinMonth; day++) {
    days.push({ day, isCurrentMonth: true });
  }

  return days;
};

// Check if a given day has an appointment
const hasAppointment = (day) => {
  if (!day) return false;
  const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return appointments.some(apt => apt.date === dateString);
};

// Get appointment for a given day
const getAppointmentforDate = (day) => {
  if (!day) return null;
  const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return appointments.find(apt => apt.date === dateString);
};

// Handle clicking on a date in the calendar
const handleDateClick = (day) => {
  if (!day) return;
  const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  setSelectedDate(dateString);
};

// Get selected appointment based on selected date
const selectedAppointment = selectedDate ?
  appointments.find(apt => apt.date === selectedDate) : null;

// Format a date string for display
const formatDateDisplay = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
};

// Optional: Month and day name arrays if needed elsewhere
const monthNames = [
  'January', "February", "March",
  "April", "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const days = [
  "Sunday", "Monday",
  "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];
  
  return (
    <div className="appointments-Container">
      <div className='appointments-Holder'>
      <h1 className="appointments-Text">
        Appointments
      </h1>
      <div className="calendar-container">
        <div className="month-header">
          <button 
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className="nav-button"
          >
            ‹
          </button>
          
          <h2 className="month-title">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          
          <button 
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className="nav-button"
          >
            ›
          </button>
        </div>

        {/* Day Headers */}
        <div className="day-headers">
          {days.map(day => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {generateCalendarDays().map((dayObj, index) => (
            <button
              key={index}
              onClick={() => handleDateClick(dayObj.day)}
              disabled={!dayObj.isCurrentMonth}
              className={`calendar-day ${
                !dayObj.isCurrentMonth ? 'disabled' : ''
              } ${
                hasAppointment(dayObj.day) ? 'has-appointment' : ''
              } ${
                selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}` ? 'selected' : ''
              }`}
            >
              {dayObj.day}
            </button>
          ))}
        </div>
      </div>

      {selectedAppointment && (
        <div className="appointment-details">
          <h3 className="details-title">
            Appointment Details:
          </h3>

          <div className="details-content">
            <div className="detail-row">
              <span className="detail-label">Appointment Date:</span>
              <span className="detail-value">{formatDateDisplay(selectedAppointment.date)}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Appointment Time:</span>
              <span className="detail-value">{selectedAppointment.time}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Appointment Location:</span>
              <span className="detail-value">{selectedAppointment.location}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Appointment About:</span>
              <span className="detail-value detail-about">
                {selectedAppointment.about}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* No Appointment Selected Message */}
      {!selectedAppointment && selectedDate && (
        <div className="no-appointment">
          <p className='noappointment-Text'>
            No appointment scheduled for {formatDateDisplay(selectedDate)}
          </p>
          <button className='make-Appointment'>Make Appointment</button>
        </div>
      )}
    </div>
    </div>
  );
}


export default Appointments;
