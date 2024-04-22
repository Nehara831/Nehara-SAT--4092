import React, { useState } from 'react';
import { useFlight } from '../Pages/NewMainView/UserContext';
import './LoginPage.css';
import { Input, Checkbox, Button, message } from 'antd';
import axios from 'axios';
import { CloseOutlined } from '@ant-design/icons'; // Import the close icon

const LoginPage = ({ onClose }) => {
  const { setUserId } = useFlight();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [choice, setChoice] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event && event.preventDefault();
    console.log(credentials);
    try {
      const response = await axios.post('http://localhost:8080/users/login', credentials);
      // Handle success
      message.success('Login successful!');
      // Set userId in context
      setUserId(response.data.userId);
    } catch (error) {
      // Handle error
      message.error('Login failed. Please check your credentials.');
    }
  };

  const handleButtonClick = () => {
    handleLogin();
    onClose();
  };

  const handleCheckboxChange = (e) => {
    setChoice(e.target.checked);
  };

  return (
    <>
      <div className='login-modal'>
        <div className="top-bar">
        <button className='CloseButton' onClick={onClose}>
          <CloseOutlined />
        </button>
        </div>
        <div className='BottomText-right-aligned'> Sign up for Aero Lanka</div>
        <div className='TextShowBox'>
          <p>Aero Lanka is totally free to use.</p>
          <p>Sign up using your email address or phone number below to get started.</p>
        </div>

        <div className='LoginTextBox'>
          <Input
            placeholder="Email or Phone number"
            name="username"
            onChange={handleChange}
            required
          />
          <Input.Password
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div className='CheckboxContainer'>
          <Checkbox
            id='termsCheckbox'
            checked={choice}
            onChange={handleCheckboxChange}
          >
            I agree to the terms and conditions
          </Checkbox>
        </div>

        <div className='Button'>
          <Button
            type="primary"
            onClick={handleButtonClick}
            disabled={!choice || !credentials.username || !credentials.password}
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
