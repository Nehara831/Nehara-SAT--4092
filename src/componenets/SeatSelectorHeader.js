


import React from 'react';

import './SeatSelectorHeader.css';
const SeatSelectorHeadere=()=>{
    return(
<div className='MainFile'>
  <div className="FlightInfoInformationDark" >
    <div className="Code" >Code</div>
    <div className="Location" >City, Country</div>
  </div>
  <div className="FlightInfoInformationDark">
    <div className="Code" >Code</div>
    <div className="Location">City, Country</div>
  </div>
  <div className="Property1InactiveProperty2Dark" >
  <div className="TimeData" >
        <span style={{
          color: 'white',
          fontSize: 16,
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}>Month Date</span>
        <span style={{
          color: '#7C8DB0',
          fontSize: 16,
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}> | </span>
        <span style={{
          color: 'white',
          fontSize: 16,
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}>Time</span>
      </div>
    <div className="Direction">Departing or Arriving</div>
  </div>
  <div className="Property1ActiveProperty2Light" >
    <div className="FlightInfoInactive" >
      <div className="TimeData" >
        <span style={{
          color: 'white',
          fontSize: 16,
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}>Month Date</span>
        <span style={{
          color: '#7C8DB0',
          fontSize: 16,
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}> | </span>
        <span style={{
          color: 'white',
          fontSize: 16,
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}>Time</span>
      </div>
      <div className="Direction" >Departing or Arriving</div>
    </div>
    <div className="Chevron" style={{ width: 20, height: 0}}>
    </div>
  </div>
</div>





    )
}
export default SeatSelectorHeadere