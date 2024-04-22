import React, { useState } from 'react';
import './FlightDataRow.css';
import SubmitButton from '../Buttons/DepartingSubmitButton'

import DepartingPage from '../../Pages/DepatingPage';
const FlightDataRow = ({FlyData}) => {
 
  return (
    <>
    <div className='FlightRow'>
        <DepartingPage flightData={FlyData}/>
       
    </div>
    </>
    
  );
   
 
}

export default FlightDataRow;