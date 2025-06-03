import React from 'react';
import notifBell from "../Images/Notif Bell.png";

function Notifications() {

  //the notication update i want to show:
  const notifUpdates = [
    { message: "Reminder: Log Bleeding Episode Data.", time: "09:00 AM" },
    { message: "Reminder: Update Clotting Levels.", time: "10:15 AM" },
    { message: "Reminder: Please don’t forget to take your medication.", time: "12:00 PM" },
    { message: "Reminder: Review Lab Results.", time: "02:30 PM" },
    { message: "Education Hub: The latest update on Hemophilia Stats.", time: "04:45 PM" },
    {message: "Reminder: Please dont't forget to log your joint health after you come back from jogging.", time: "11:45 PM"},
    {message: "Reminder: Check insulin levels.", time: "04:25 PM"},
    {message: "Reminder: Review your Blood Pressure Results for more info.", time: "15:58 PM"},
    {message: "Reminder: Please don't forget to log your anxiety episode if you had any today.", time: "12:30 PM"}
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
      <div className='notifications-Holder'>
      <h1 className='notif-Heading'>Notification  Updates:</h1>
      <p className='reminders-Text'> On Today's Reminders: {getDateStamp()}</p>
      <ul className='notif-Container'>
        {notifUpdates.map((update, index)=>{
          return(
            <div className='notifications-List'>
            <li key={index} className='notifications-Text'>
            <img src= {notifBell} alt= "notification bell" className='bellImage'/>
            <div className='notif-Container'>
               <div className='notifications-Text'>{update.message}</div>
               <small className='notifications-Text'>{update.time}</small>
            </div>
          </li>
          </div>
          )
        })}
      </ul>
     </div>
    </div>
  )
}

export default Notifications;