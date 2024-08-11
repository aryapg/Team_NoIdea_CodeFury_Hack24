import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    pwsd: '',
    otp: '',
  });
  const [step, setStep] = useState('login'); // Track login or OTP step

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', formData)
      .then(response => {
        alert(response.data); // Show server response
        setStep('otp'); // Move to OTP verification step
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        alert('Login failed!');
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/verify-otp', formData)
      .then(response => {
        alert(response.data); // Show server response
        if (response.data === 'OTP verified successfully!') {
          // Handle successful login
          // Redirect to dashboard or home page if needed
        }
      })
      .catch(error => {
        console.error('There was an error verifying OTP!', error);
        alert('OTP verification failed!');
      });
  };

  return (
    <div className="login-container">
      <h1>{step === 'login' ? 'Login' : 'Verify OTP'}</h1>
      <form onSubmit={step === 'login' ? handleLoginSubmit : handleOtpSubmit} className="login-form">
        {step === 'login' ? (
          <>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Password:
              <input type="password" name="pwsd" value={formData.pwsd} onChange={handleChange} required />
            </label>
          </>
        ) : (
          <>
            <label>
              OTP:
              <input type="text" name="otp" value={formData.otp} onChange={handleChange} required />
            </label>
          </>
        )}
        <button type="submit">{step === 'login' ? 'Login' : 'Verify OTP'}</button>
      </form>
    </div>
  );
};

export default LoginForm;
