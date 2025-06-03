import { image } from 'd3';
import React, { useContext, useState } from 'react';
import docImage1 from "../Images/Eddy.png";
import docImage2 from "../Images/doc 2.png";
import docImage3 from "../Images/doc 3.png";
import docImage4 from "../Images/doc 4.png";
import docImage5 from "../Images/doc 5.png";
import docImage6 from "../Images/doc 6.png";
import docImage7 from "../Images/me.png";
import docImage8 from "../Images/doc 1.png";
import docImage9 from "../Images/doc 9.png";
import docImage10 from "../Images/doc 10.png";

function Messages() {

  const [messageText, setMessageText] = useState("");
  //get the user's names that tehy used to create account and login to welcome them. (personal touch):
const username = JSON.parse(localStorage.getItem("userDetails")) || { fullNames: "Guest" };

const messagesHolder = [
    { id: 1, sender: "Dr Edwards", time: "just now", message: `Dear ${username.fullNames}, your blood test results have been posted by Dr Edwards.`, image: docImage1},
    { id: 2, sender: "Dr Baker", time: "15 Mins Agp", message: `Dear ${username.fullNames}, Dr Baker needs your clotting levels logged in.`, image: docImage2},
    { id: 3, sender: "Dr Mathews", time: "yesterday", message: `Dear ${username.fullNames}, please schedule a follow-up appointment.`, image: docImage3 },
    { id: 4, sender: "Dr Mhlongo", time: "2 days ago", message: `Dear ${username.fullNames}, please ensure that your bleeding data.`, image: docImage4 },
    { id: 5, sender: "Dr Zwide", time: "3 days ago", message: `Dear ${username.fullNames}, please advise when you want to come through.`, image: docImage5 },
    { id: 6, sender: "Dr Khumalo", time: "4 days ago", message: `Dear ${username.fullNames}, anxiety levels are high, are you okay ?.`, image: docImage6 },
    { id: 7, sender: "Dr Mofolo", time: "5 days ago", message: `Dear ${username.fullNames}, diabetes insulin levels are low. contact me.`, image: docImage7 },
    { id: 8, sender: "Dr Nkosi", time: "6 days ago", message: `Dear ${username.fullNames}, please confirm your booking with me on your side.`, image: docImage8 },
    { id: 9, sender: "Dr Xaba", time: "a week ago", message: `Dear ${username.fullNames}, please indicate whether your medication is still intact.`, image: docImage9 },
    { id: 10,sender: "Dr Vilakazi", time: "a week ago", message: `Dear ${username.fullNames}, please see your reuslts about what medications to purchase at the pharmacy.`, image: docImage10 },
    ]

  function ViewTxtMessage(index){ 
    setMessageText(messagesHolder[index].message);
  }

  return (
    <div className='messages-Container'>
      <div className='messages-Holder'>
          <p className='messages-Text'> Messages</p>
          <br/>
             {messageText && (
            <div className='selectedMessage'>
              <p className='Text'>{messageText}</p>
              </div>
          )}
          <br/>
          <div className='messages-List'>
          {messagesHolder.map((msg, index)=>{
            return(
           <button key={msg.id} className='messageBtn' onClick={()=> ViewTxtMessage (index)}>
            {msg.sender} .... ({msg.time})
             <img src= {msg.image}
            alt={msg.sender} className='doctor-Image'/>
           </button>
          )})}
        </div>
      </div>
    </div>
  )
}

export default Messages;
