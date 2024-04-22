import React, { useState } from 'react';
import MessageBox from './MessageBox';
import { Button, Grid, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFlight } from '../../Pages/NewMainView/UserContext';

const FlightCard = () => {
  const [message, setMessage] = useState(null);

  const { setnoOfPassengers, setSelectedFlight } = useFlight();
  const navigate = useNavigate();

  const handleSave = () => {
    setMessage('Your Booking Saved successfully');

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleClose = () => {
    setnoOfPassengers(1);
  //  setSelectedFlight(null);
    navigate('/');
  };

  return (
    <>
    <div>
    <div className="vertical-container"  style={{ marginTop:'150px' }}>   <Box width="100%">
        <Grid container spacing={2}>
          {/* Left Side: Economy Class */}
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              Economy Class
            </Typography>
            <Typography fontSize="14px">
              Economy class offers affordable flying with standard seating arrangements and basic amenities.
            </Typography>
            <ul className="custom-bullets">
              <li>Built-in entertainment system</li>
              <li>Complimentary snacks and drinks</li>
              <li>One free carry-on and personal item</li>
            </ul>
          </Grid>

          {/* Right Side: Business Class */}
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              Business Class
            </Typography>
            <Typography fontSize="14px">
            Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service
            </Typography>

            <ul className="business-bullets">
              <li>Extended leg room</li>
              <li>First two checked bags free</li>
              <li>Priority boarding</li>
              <li>Personalized service</li>
              <li>Seats that recline 40% more than economy</li>
            </ul>
          </Grid>
        </Grid>
      </Box>
</div>
    
     <div> <Box display="flex" justifyContent="center" width="100%" mt={2}>
        <Box width="100%" display="flex" justifyContent="center" >
          <Button
            variant="contained"
            style={{ height:'25px',backgroundColor: '#605DEC', color: 'white', marginRight: '8px' }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: '#605DEC', color: 'white' ,height:'25px' }}
          >
            Close
          </Button>
        </Box>
      </Box></div>
    </div>
   

      <MessageBox message={message} onClose={() => setMessage(null)} />
    </>
  );
};

export default FlightCard;
