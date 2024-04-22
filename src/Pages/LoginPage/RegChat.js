// Import necessary components from 'antd'
import { Form, Input, Button, DatePicker, Radio, Select, Checkbox,message } from 'antd';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegChat.css'
import NavigationHeader from '../../componenets/NavigationHeaderFolder/NavigationHeader';
import { useFlight } from '../NewMainView/UserContext';


import axios from 'axios'; 




const PassengerInformationForm = ({clearForm,onSubmit}) => {
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
      
    try {
      // Send the form data to the backend using Axios
      const response = await axios.post('http://localhost:8080/passengers/add', requestData);
      console.log(response);
     // console.log('Received response from backend:', response.data);
      message.success('Passenger added successfully!');

      // Call the onSubmit prop when the form is successfully submitted
      onSubmit(values);

      // Optionally reset the form immediately
      form.resetFields();

      // Navigate to the next page
      

    } catch (error) {
      console.error('An error occurred while sending data to the backend', error);
      // Handle error (show error message, etc.)
    }
  };
  const [areFieldsEnabled, setAreFieldsEnabled] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = (e) => {
    setAreFieldsEnabled(e.target.checked);
  };
   const [passengerName, setPassengerName] = useState();
   
   
   useEffect(() => {
    form.resetFields();
  }, [clearForm, form]);

  return (
   
    <>

    <div className="Outer">
     <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="form-container"  style={{ width: "100%", height: "100%", overflow: "auto" }}>
       
     <h1 className='header11'>Passenger Information </h1>
    

    
       <h2 className="header2">Passenger 1 Information</h2>
       <div className="passenger-Form">
       <div className="horizontal-fields">
 <Form.Item name="firstName" className="textbox"  >
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
 <Form.Item name="address" style={{ width: '720px'}}>
     <Input placeholder="Adress" />
 </Form.Item>

</div>
<div className="horizontal-fields">
 <Form.Item name="email" className="textbox-middle">
     <Input placeholder="Email" />
 </Form.Item>
 <Form.Item name="contactNumber1" className="textbox">
     <Input placeholder="Contact Number " />
 </Form.Item>
 <Form.Item name="age" className="textbox">
     <Input placeholder="Age" />
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
         Save   
       </Button>
       <Button 
className={`button ${"button-spacing"}`} 
onClick={handleButtonClick}
>
Select Seats
</Button>
     </Form.Item>
   </Form>
</div>
 

  </>
  );
};

export default PassengerInformationForm;
