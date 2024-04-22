// Import necessary components from 'antd'
import { Form, Input, Button, DatePicker, Radio, Select, Checkbox,message } from 'antd';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewRegChat.css'
import { useFlight } from '../UserContext';


import axios from 'axios'; 




const PassengerInformationForm = ({clearForm,onSubmit,passengerDetails}) => {


  const flightContext = useFlight();
  const {userId,selectedFlight,noOfPassengers}=flightContext;

  const [form] = Form.useForm();  
  const { Option } = Select;
const navigate = useNavigate();




  const handleButtonClick = () => {
 
    
   navigate(`/seatSelector`);
  };
  // Function to handle form submission
  const onFinish = (values) => {
    console.log('Received values:', values);
    
  };





  const handleFormSubmit = async (values) => {
    // Include additional details in the request body
      const requestData = {
        ...values, // Include the form values
        userId: userId, // Include userId
        flightId: selectedFlight, // Include selectedFlight
        noOfPassengers: noOfPassengers
        
      };
      
      // Define the URL for the PUT request
  const apiUrl = `http://localhost:8080/passengers/${passengerDetails.passengerId}`;

  // Send the PUT request to update the passenger information
  axios
    .put(apiUrl, requestData)
    .then((response) => {
      onSubmit(values);
      form.resetFields();
      console.log('Passenger information updated successfully:', response.data);
      // Handle success (e.g., show a success message)
    })
    .catch((error) => {
      console.error('Error updating passenger information:', error);
      // Handle error (e.g., show an error message)
    });
};
  const [areFieldsEnabled, setAreFieldsEnabled] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setAreFieldsEnabled(e.target.checked);
  };
   const [passengerName, setPassengerName] = useState();
   
   
  //  useEffect(() => {

  //   form.resetFields();
  // },[clearForm, form]);


  return (
   
    <>

      {/* <div className="header">
    
      </div> */}
 
 <Form
  form={form}
  layout="vertical"
  onFinish={handleFormSubmit}
  className="form-container"
  initialValues={passengerDetails} // Set initial values here
>
  <h1 className="header11">Passenger Information</h1>

  <h2 className="header2">Passenger 1 Information</h2>
  <div className="passenger-Form">
    <div className="horizontal-fields">
      <Form.Item name="firstName" className="textbox">
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="middleName" className="textbox">
        <Input placeholder="Middle Name" />
      </Form.Item>
      <Form.Item name="lastName" className="textbox">
        <Input placeholder="Last Name" />
      </Form.Item>
    </div>
    <div className="horizontal-fields">
      <Form.Item name="suffix" className="textbox">
        <Input placeholder="Suffix" />
      </Form.Item>
      <Form.Item name="dateOfBirth" className="textbox">
        <Input placeholder="Date of Birth" />
      </Form.Item>
    </div>
    <div className="horizontal-fields">
      <Form.Item name="email" className="textbox-middle">
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="contactNumber" className="textbox">
        <Input placeholder="Contact Number" />
      </Form.Item>
      <Form.Item name="age" className="textbox">
        <Input placeholder="Age" />
      </Form.Item>
    </div>
    <div className="horizontal-fields">
      <Form.Item name="address" className="textbox-large">
        <Input placeholder="Address" />
      </Form.Item>
    </div>
  </div>


  


   <div>
         <h2 className="header2">Bag Information</h2>
         <p style={{ width: '500px', textAlign: 'justify' }}>    Each passenger is allowed one free carry-on bag and one personal item.
   First checked bag for each passenger is also free.
   Second bag check fees are waived for loyalty program members.
</p>

         <div className="horizontal-fields2">
         <Form.Item label="Passenger 1" className="textbox">
         <div>{passengerName}</div>
       </Form.Item>
         <Form.Item name="checkedBags" label="Checked Bags" className="textbox">
           <Select placeholder="Select Number of Bags">
             <Option value="1">1</Option>
             <Option value="2">2</Option>
             <Option value="3">3</Option>
             <Option value="4">4</Option>
           </Select>
         </Form.Item>
         </div>
       </div>

       <Form.Item>
         <Button type="primary" htmlType="submit" className="button">
           Update   
         </Button>
         <Button 
 className={`button ${"button-spacing"}`} 
 onClick={handleButtonClick}
>
 Select Seats
</Button>
       </Form.Item>
     </Form>

  </>
  );
};

export default PassengerInformationForm;
