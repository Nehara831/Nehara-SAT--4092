import React from 'react';
import axios from 'axios';
import { Button, Form, Input, message } from 'antd';
import './UserRegistration.css';
import { CloseOutlined } from '@ant-design/icons'; // Import the close icon
import { useFlight } from '../NewMainView/UserContext';
const FormDisabledDemo = ({ onClose }) => {
  const { setUserId } = useFlight();
  const handleSignUp = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:8080/users', formData);
      message.success('Registration successful!');
      setUserId(response.data.userId);
      if (onClose) {
        onClose();
      }
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='Form'>
       <div className='FormHeader'>
        <span className='SignUplabel'> Sign Up Now!</span>
        <button className='CloseButton' onClick={onClose}>
          <CloseOutlined />
        </button>
      </div>
      <Form 
        layout='vertical'
        className="formContainer"
        onFinish={handleSignUp} 
      >
        <Form.Item 
          label="First Name" 
          name="firstName"  
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Email Address" 
          name="username"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Create an Account</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormDisabledDemo;
