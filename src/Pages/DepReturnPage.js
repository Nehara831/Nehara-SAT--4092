
import React, { useState, useEffect } from 'react';
import Depart from './DepPage';
import './DepatingPage';
import { useLocation } from 'react-router-dom';
import SeatHeader from '../componenets/SeatSelectorHeader';
import{useFlight} from './NewMainView/UserContext'
import FlightCard from "./FlightCard/FlightCard"
import './DepReturnPage.css'
import FlightTable from './FlightCard/FlightTable'
function DepReturnPage() {


const location = useLocation();
    const flyData = location.state?.flightData;
    const { selectedFlight, setSelectedFlight } = useFlight();
  
  const { departingFlights, arrivingFlights } = flyData;

  return (
    <>
    
     {/* <h1>Flight ID: {selectedFlight}</h1> */}
      <div className="DepReturnBox">

      <div className='Label'>Returning Flights</div>
        {/* <SeatHeader /> */}

       
       
          <FlightTable  flightData={arrivingFlights} />
     
        
        <div className='Label'>Departing Flights</div>     
          <FlightTable  flightData={departingFlights} />
        

       
      </div>
    </>
  );
        }

export default DepReturnPage;
