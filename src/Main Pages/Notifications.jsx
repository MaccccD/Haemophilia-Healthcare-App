import React from 'react'

function Notifications() {

  //the notication update i want to show:
  const notifUpdates = [
    { message: "Reminder: Log Bleeding Episode Data.", time: "09:00 AM" },
    { message: "Reminder: Update Clotting Levels.", time: "10:15 AM" },
    { message: "Reminder: Please don’t forget to take your medication.", time: "12:00 PM" },
    { message: "Reminder: Review Lab Results.", time: "02:30 PM" },
    { message: "Education Hub: The latest update on Hemophilia Stats.", time: "04:45 PM" }
  ];
   const getDateStamp = ()=>{
    const currentDate = new Date();
    return currentDate.toLocaleDateString('en-GB', {
       day: '2-digit',
       month: 'long',
       year: 'numeric'
    })
   }
  return (
    <div className='notifications-Container'>
      <h1 className='heading'>Notification  Updates:</h1>
      <p className='content'> On Today's Reminders: {getDateStamp()}</p>
      <ul className='NotifContainer'>
        {notifUpdates.map((update, index)=>{
          return(
            <li key={index} className='content'>
            <span role='image' aria-label='notification bell'>🔔</span>
            <div>
               <div>{update.message}</div>
               <small className='content'>{update.time}</small>
            </div>
           

          </li>
          )
        })}
      </ul>

    </div>
  )
}

export default Notifications;