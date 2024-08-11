import React, { useState, useEffect } from 'react';
import './App.css';
import tornadoImg from './tornadoImg.jpeg';

const TornadoDetails = () => {
  const [calamity, setCalamity] = useState('Tornado'); // Initialize with 'Tornado'

  const tips = {
    'Tornado': `1. **Identify a Safe Shelter:** The safest place during a tornado is a basement or an interior room on the lowest floor of a sturdy building. Avoid windows and cover yourself with a mattress or heavy furniture.\n\n2. **Create an Emergency Plan:** Have a plan for where to go and how to communicate with family members during a tornado. Practice tornado drills to ensure everyone knows what to do.\n\n3. **Prepare an Emergency Kit:** Include essentials such as water, non-perishable food, a flashlight, batteries, and a first-aid kit. Keep the kit in a safe place that is easy to access during a tornado.`,
    // Add more calamity tips here if needed
  };

  useEffect(() => {
    // You can update calamity if needed based on your app logic
  }, []);

  const tipContent = tips[calamity] ? tips[calamity].split('\n').map((tip, index) => (
    <p key={index}>{tip}</p>
  )) : null;

  return (
    <div className="weather-container">
      <div className="weather-overlay"></div> {/* Overlay to darken the image */}
      <div className="weather-content">
        <h2 className="weather-title">Tornado</h2>
        <p>Learn how to protect yourself and your family during a tornado, including safety tips and emergency preparedness plans.</p>
        <div className="weather-tips">
          {tipContent}
        </div>
      </div>
    </div>
  );
};

export default TornadoDetails;
