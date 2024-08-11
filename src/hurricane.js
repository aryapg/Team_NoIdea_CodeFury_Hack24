import { useState,useEffect } from 'react';
import React from 'react';
import './App.css';
import hurrincaneImg from './hurrincaneImg.jpeg';

const HurricaneDetails = () => {
    const[calamity,setCalamity]=useState('Flood')
  const tips = {
    'Flood': `1. **Know Your Risk:** Understand whether you live in a flood-prone area by checking flood maps and local advisories. Stay informed about weather conditions and potential flood risks.\n\n2. **Create an Evacuation Plan:** Plan and practice evacuation routes that lead to higher ground. Ensure all family members are aware of the plan and have a safe place to go.\n\n3. **Prepare an Emergency Kit:** Assemble an emergency kit with items such as water, food, medications, important documents, and a battery-powered radio. Elevate electrical appliances and utilities above potential flood levels to reduce damage.`,
  };
  useEffect(()=>{

  },[]);
  const tipContent = tips[calamity] ? tips[calamity].split('\n').map((tip, index) => (
    <p key={index}>{tip}</p>
  )) : null;


  return (
    <div className="weather-container">
      <div className="weather-overlay"></div> {/* Overlay to darken the image */}
      <div className="weather-content">
        <h2 className="weather-title">Hurricane</h2>
        <p>Learn how to protect yourself and your family during an earthquake, including safety tips and emergency preparedness plans.</p>
        <div className="weather-tips">
          {tipContent}
        </div>
      </div>
    </div>

  );
};


export default HurricaneDetails;