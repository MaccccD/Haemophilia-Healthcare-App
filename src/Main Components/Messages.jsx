import { image } from 'd3';
import React, { useContext, useState } from 'react';
import docImage from "../Images/Eddy.png";

function Messages() {

  const [messageText, setMessageText] = useState("");
  //get the user's names that tehy used to create account and login to welcome them. (personal touch):
const username = JSON.parse(localStorage.getItem("userDetails")) || { fullNames: "Guest" };

const messagesHolder = [
    { id: 1, sender: "Dr Edwards", time: "just now", message: `Dear ${username.fullNames}, your blood test results have been posted by Dr Edwards.`, image: docImage},
    { id: 2, sender: "Dr Baker", time: "just now", message: `Dear ${username.fullNames}, Dr Baker needs your clotting levels logged in.` },
    { id: 3, sender: "Dr Mathews", time: "yesterday", message: `Dear ${username.fullNames}, please schedule a follow-up appointment.` },
    { id: 4, sender: "Dr Mhlongo", time: "2 days ago", message: `Dear ${username.fullNames}, please ensure that your bleeding data.` },
    { id: 5, sender: "Dr Zwide", time: "3 days ago", message: `Dear ${username.fullNames}, please advise when you want to come through.` },
    { id: 6, sender: "Dr Khumalo", time: "4 days ago", message: `Dear ${username.fullNames}, anxiety levels are high, are you okay ?.` },
    { id: 7, sender: "Dr Mofolo", time: "5 days ago", message: `Dear ${username.fullNames}, diabetes insulin levels are low. contact me.` },
    { id: 8, sender: "Dr Nkosi", time: "6 days ago", message: `Dear ${username.fullNames}, please confirm your booking with me on your side.` },
    { id: 9, sender: "Dr Xaba", time: "a week ago", message: `Dear ${username.fullNames}, please indicate whether your medication is still intact.` },
    { id: 10,sender: "Dr Vilakazi", time: "a week ago", message: `Dear ${username.fullNames}, please see your reuslts about what medications to purchase at the pharmacy.` },
    ]

  function ViewTxtMessage(index){ 
    setMessageText(messagesHolder[index].message);
  }

  return (
    <div className='messages-Container'>
      <div className='messages-Holder'>
          <p className='messages-Text'>Messages</p>
          {messagesHolder.map((msg, index)=>{
            return(
           <button key={msg.id} className='messageBtn' onClick={()=> ViewTxtMessage (index)}>
            {msg.sender} .... ({msg.time})
            <br/>
             <img src= {msg.image}
            alt={msg.sender} className='doctor-Image'/>
           </button>
          )})}

          {messageText && (
            <div className='selectedMessage'>
              <p className='Text'>{messageText}</p>
              </div>
          )}
      </div>
    </div>
  )
}

export default Messages;
