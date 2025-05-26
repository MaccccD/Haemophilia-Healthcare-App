import React from 'react';
import { Circles } from 'react-loader-spinner';

function LoadingScreen() {

  return (
    <div className='loading-Container'>
      <Circles 
      width= "50px"
      height= "50px"
      ariaLabel='Loading...'
      color='#103D81' />
      <p className='content'>Loading your data...</p>
    </div>
  )
}

export default LoadingScreen;
