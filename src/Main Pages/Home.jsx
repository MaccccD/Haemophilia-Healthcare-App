import React, { useContext } from 'react';
import HeroImage from "../Images/Hero Image.png"

function Home() {
//get the user's names that tehy used to create account and login to welcome them. (personal touch):
const username = JSON.parse(localStorage.getItem("userDetails"));
  return (
    <div>
      <h1 className='heading'>Dashboard</h1>

      <h2 className='subheading'>Welcome {username.fullNames}</h2>

      <p className='content'>Take a look at your recent messages and scheduled appointments below:</p>

      <img className='heroImage' src= {HeroImage} alt='A doctor image with a stethoscope'/>

      <button className='messages'>Messages</button>

      <button className='appointments'>Appointments</button>
    </div>
  )
}

export default Home;
