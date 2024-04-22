// import React from 'react';
// import FlightDataRow from '../componenets/DepartingFlights/FlightDataRow'
// import './DepPage.css'
// import SeatHeader from '../componenets/SeatSelectorHeader'
// function DepPage() {

//   const [flightData, setFlightData] = useState([]);

//   useEffect(() => {
//     // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
//     fetch('YOUR_BACKEND_API_URL')
//       .then((response) => response.json())
//       .then((data) => {
//         setFlightData(data); // Assuming the data is an array of flight objects
//       })
//       .catch((error) => {
//         console.error('Error fetching flight data:', error);
//       });
//   }, []);
  
//   return (
//     <>
//     <div className="DepStyle">
//       <SeatHeader/>
//       <FlightDataRow/>
//       <FlightDataRow/>
//       <FlightDataRow/>
//       <FlightDataRow/>
//       <FlightDataRow/>

//       </div></>
    
//   );
// }

// export default DepPage;

import React, { useState, useEffect } from 'react';
import FlightDataRow from '../componenets/DepartingFlights/FlightDataRow';
import './DepPage.css';
import SeatHeader from '../componenets/SeatSelectorHeader';

function DepPage({ flightData }) {
 
  const flightArray = [flightData];
  console.log(flightArray);
  return (
    <>
      <div className="DepStyle">
        
        {flightArray.map((flight, index) => (
          <FlightDataRow key={index} FlyData={flight} />
        ))}
      </div>
    </>
  );
}

export default DepPage;




