import React, { useState, useEffect } from 'react';
import './App.css';
import earthquakeImg from './earthquakeImg.jpeg';

const EarthquakeDetails = () => {
  const [calamity, setCalamity] = useState('Earthquake');

  const tips = {
    Earthquake: `1. Drop, Cover, and Hold On: During an earthquake, drop to your hands and knees, cover your head and neck, and hold on until the shaking stops. This will protect you from falling debris and injuries.\n\n2. Create a Safety Plan: Ensure you and your family have a safety plan that includes safe spots in your home, such as under heavy furniture or in doorways. Practice earthquake drills regularly to familiarize yourself with the procedures.\n\n3. Prepare an Emergency Kit: Keep a well-stocked emergency kit with essentials like water, non-perishable food, a flashlight, batteries, and a first-aid kit. Make sure to update the kit regularly and include supplies for each family member.`,
  };

  useEffect(() => {
    // Any additional logic can go here
  }, []);

  const tipContent = tips[calamity] ? tips[calamity].split('\n').map((tip, index) => (
    <p key={index}>{tip}</p>
  )) : null;

  return (
    <div className="weather-container">
      <div className="weather-overlay"></div> {/* Overlay to darken the image */}
      <div className="weather-content">
        <h2 className="weather-title">Earthquake</h2>
        <p>Learn how to protect yourself and your family during an earthquake, including safety tips and emergency preparedness plans.</p>
        <div className="weather-tips">
          {tipContent}
        </div>
      </div>
    </div>
  );
};

export default EarthquakeDetails;