import React from 'react';
import './VolunteerHelp.css';
import { FaFirstAid, FaUtensils, FaSearch, FaHome, FaHandsHelping, FaRecycle } from 'react-icons/fa';

const VolunteerHelp = () => {
  return (
    <div className="volunteer-help">
      <h2>How Can Volunteers Help in Disaster Calamities?</h2>
      <p>Volunteers play a vital role in disaster response and recovery. Here's how you can make a difference:</p>
      <div className="volunteer-list">
        <div className="volunteer-item">
          <FaFirstAid className="volunteer-icon" />
          <h3>First Aid & Medical Assistance</h3>
          <p>Provide immediate care and medical help to those in urgent need.</p>
        </div>
        <div className="volunteer-item">
          <FaUtensils className="volunteer-icon" />
          <h3>Food & Supplies Distribution</h3>
          <p>Distribute essential items like food, water, and clothing to disaster victims.</p>
        </div>
        <div className="volunteer-item">
          <FaSearch className="volunteer-icon" />
          <h3>Search & Rescue Operations</h3>
          <p>Assist in locating and rescuing people trapped or missing due to calamities.</p>
        </div>
        <div className="volunteer-item">
          <FaHome className="volunteer-icon" />
          <h3>Shelter Management</h3>
          <p>Help set up and manage temporary shelters for displaced individuals.</p>
        </div>
        <div className="volunteer-item">
          <FaHandsHelping className="volunteer-icon" />
          <h3>Emotional Support</h3>
          <p>Offer psychological and emotional support to those affected by the disaster.</p>
        </div>
        <div className="volunteer-item">
          <FaRecycle className="volunteer-icon" />
          <h3>Cleanup & Rebuilding</h3>
          <p>Participate in cleaning up debris and rebuilding communities post-disaster.</p>
        </div>
      </div>
      <p>Your contribution as a volunteer can make a lasting impact on the lives of those in need.</p>
    </div>
  );
};

export default VolunteerHelp;

