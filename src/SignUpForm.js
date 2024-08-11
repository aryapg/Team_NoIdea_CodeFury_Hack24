import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css'; // Import the CSS file for styling

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pwsd: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/signup', formData)
      .then(response => {
        alert('Sign-up successful!');
        setFormData({
          name: '',
          phone: '',
          pwsd: '',
          email: '',
        });
      })
      .catch(error => {
        console.error('There was an error signing up!', error);
      });
  };

  return (
    <div className="signup-container">
      <h1>Volunteer Sign-Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone No:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="pwsd"
            value={formData.pwsd}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
