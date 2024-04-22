

import './DepartingPage.css';
import SubmitButton from '../componenets/Buttons/DepartingSubmitButton'
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import{useFlight} from '../Pages/NewMainView/UserContext'
import { useContext } from 'react';
const DepartingPage=({ flightData })=>{


  const { selectedFlight, setSelectedFlight } = useFlight();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log(flightData);
    setSelectedFlight(flightData.flightId);
    const totalPassengers = 5;  // Assume 5 passengers as an example
    //navigate(`/passengerDetails/${totalPassengers}`);
  
  };
  
      return (
        <div className="FlightDataRow">
          <div className="DataRowCombined">
            <div className="DataRowPrimary">
              <div className="TextBox">
                <div className="Label1">{flightData.duration}</div>
              </div>
              <div className="TextBox">
                <div className="Label1">{flightData.departureTime}</div>
              </div>
              <div className="TextBox1">
                <div className="Label1">{flightData.stops} stop</div>
              </div>
              <div className="TextBox">
                <div className="Label1">
                  <div className="Label2">LKR </div> 
                  <div className="Label3">{flightData.price}</div>
                </div>
              </div>
            </div>
            <div className="DataRowSecondary">
              <div className="TextBox">
                <div className="Label2">{flightData.airlineName}</div>
              </div>
          
              <div className="TextBox">
                <div className="Label1">{flightData.arrivalTime}</div>
              </div>
              <div className="TextBox1">
                <div className="Label2">{flightData.flightType}</div>
              </div>
            </div>
          </div>
          <Button 
        type="primary" style={{background: '#605DEC'}}
        onClick={handleButtonClick}
      >
        Submit
      </Button >
    
        </div>
      );
    }
    
    export default DepartingPage;
