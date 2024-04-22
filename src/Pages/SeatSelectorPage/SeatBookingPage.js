// Import necessary libraries and components
import React, { useState, useContext } from 'react';
import FlightCard from '../../componenets/SearchFlights/Flights';
 // Update the path as needed
import {SeatAssignmentsContext} from '../../componenets/FlightSeatPicker'
import { Card, CardContent, CardActions, Button, Grid, Typography,Box } from '@mui/material';
import './SeatBookingStyles.css';
import FlightSeatPicker from '../../componenets/FlightSeatPicker'
// Define the SeatBookingPage component


const SeatBookingPage = () => {


  const seatAssignments = useContext(SeatAssignmentsContext);


  //console.log(seatAssignments);

    return (
      
        <div className="seatBookingPage">
            <div className="leftSide">
                <FlightSeatPicker />
            </div>
            <div className="rightSide">
            <FlightCard  />
            </div>
        </div>
       
    );
};

// Export the SeatBookingPage component
export default SeatBookingPage;
