import React, { createContext, useState } from 'react';

export  const FooterContext = createContext();

function FooterProvider({children}) {

    const [showFooter, setShowFooter] = useState(true);


    const FooterComponent = () =>{
      console.log('FooterComponent rendered')
     return <p className='footer'>Brought to you by Dumisani M. Mofolo. (2025)</p>;
    }

    const toggleFooter = () =>{
      setShowFooter(!showFooter); //toggles between showing the footer and not shwing it //true or false.
    }



    // function InjectFooter(){ // what i tried first
    //  if( footer != null){
    //  // setFooter(`${<p className='footer'>Brought to you by Dumisani M. Mofolo (2025)</p>}`); This wont't work bc your'tryna use template lietral directy
    //  }
    // }


  return (
    <div>
      <FooterContext.Provider value={{ showFooter,FooterComponent, toggleFooter}}>
        <div>
         {children}
         {/**Show the footer at the bottom if show footer is true */}
         {showFooter && <FooterComponent/>}
        </div>
      </FooterContext.Provider>
    </div>
  )
}

export default FooterProvider;
