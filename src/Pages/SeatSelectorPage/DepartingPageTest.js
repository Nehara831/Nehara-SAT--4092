import React, { useEffect, useState } from 'react';
import './DepartingPage.css';

const DepartingPage = ({ duration, departureTime, stopInfo, price, airline }) => {
  return (
    <div className="TableFlightListVersionA">
      <div className="FlightDataRow">
        <div className="DataRowCombined">
          <div className="DataRowPrimary">
            <div className="TextBox">
              <div className="Label1">{duration}</div>
            </div>
            <div className="TextBox">
              <div className="Label1">{departureTime}</div>
            </div>
            <div className="TextBox1">
              <div className="Label1">{stopInfo}</div>
            </div>
            <div className="TextBox">
              <div className="Label1">
                <span className="Label2">LKR </span>
                <span className="Label3">{price}</span>
              </div>
            </div>
          </div>
          <div className="DataRowSecondary">
            <div className="TextBox">
              <div className="Label2">{airline}</div>
            </div>
            <div className="TextBox">
              <div className="Label2"> </div>
            </div>
            <div className="TextBox2">
              <div className="Label2">2h 45m in HNL</div>
            </div>
            <div className="TextBox1">
              <div className="Label2">round trip</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartingPage;