import React, { useContext, useEffect, useState } from 'react';
import HeroImage from "../Images/Hero Image.png";
import { useNavigate } from 'react-router-dom';
import { MdMessage } from 'react-icons/md';
import { MdCalendarToday } from 'react-icons/md';
import { messagesOriginator } from '../Context/MessagesProvider';
function Home() {
//get the user's names that tehy used to create account and login to welcome them. (personal touch):
const username = JSON.parse(localStorage.getItem("userDetails")) || { fullNames: "Guest" };
//navigation :
const nav = useNavigate();

 const {messagesNumber, messagesValue} = useContext(messagesOriginator);

function Messages(){
  messagesNumber();
  nav("/Messages");
  return;
}
function Appointments(){
  nav("/Appointments");
  return;
}
 

  return (
     <div className="home-content">
       <h1 className='home-heading'>Dashboard</h1>

       <h2 className='home-subheading'>Welcome {username.fullNames}</h2>
       <p className='home-text'>
       Take a look at your recent messages and scheduled appointments below:
       </p>
       <img className='heroImage' src={HeroImage} alt='A doctor image with a stethoscope' title='heroImage' />
       <div className="home-buttons">
       <button onClick={Messages} className='messages'><MdMessage className='message-icon'/>Messages</button>
       <div className="notification-badge">{messagesValue}</div>
       <button onClick={Appointments} className='appointments'><MdCalendarToday className='appointment-icon'/>Appointments</button>
       <div className='appointment-badge'>2</div>
       </div>
    </div>
  )
}

export default Home;
