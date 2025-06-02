import React, { createContext, useState, useEffect} from 'react';
import LoadingScreen from '../Main Components/LoadingScreen';

export const messagesOriginator = createContext();


function MessagesProvider({children}) {

  const [messagesValue, setMessagesValue] = useState(()=>{
    const storedValue = JSON.parse(localStorage.getItem("messagesValue"));
    return storedValue?.messagesValue || 0;
  })
  const[messagesUpdated, setMessagesUpdated] = useState(() =>{
     const messagesToken =  localStorage.getItem("isMessagesUpdated") 
   return messagesToken === "true"; // stored this as a string bc the item that is got is also rendered as a string 
   });
  const [loading , setLoading] = useState(true);


  useEffect(()=>{ 
      localStorage.setItem("isMessagesUpdated", messagesUpdated.toString()); //converting the boolean value (true or false)into its string equivalent ("true" or "false")
       console.log(messagesUpdated);
       const timerDelay = setTimeout(() =>{
        setLoading(false);
       }, 2000); 
       return ()=>{
        clearTimeout(timerDelay);
       }
    }, [messagesUpdated]); 

    useEffect(() => {
        const interval = setInterval(() => {
        const randomNewMessages = Math.floor(Math.random() * 2); 
        if (randomNewMessages > 0) {
        setMessagesValue(prev => {
        const newVal = prev + randomNewMessages;
        localStorage.setItem("messagesValue", JSON.stringify({ messagesValue: newVal}));
        return newVal;
      });
    }
  }, 9000); // every  9 seconds

  return () => clearInterval(interval);
}, []);

    if(loading){
     return <LoadingScreen/>
    }
    

    function messagesNumber (){
      const randomValue = Math.floor(Math.random() * 1);
      const newValue = messagesValue + randomValue;
      setMessagesValue(newValue);
      localStorage.setItem("messagesValue", JSON.stringify({ messagesValue : newValue})); 
      setMessagesUpdated(true);
      return;
    }


  
  
  return (
   <messagesOriginator.Provider value={{messagesUpdated, messagesValue, messagesNumber}}>
    {children}
   </messagesOriginator.Provider>
  )
}

export default MessagesProvider;
