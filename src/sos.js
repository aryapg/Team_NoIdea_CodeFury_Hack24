import React, { useEffect } from 'react';
import axios from 'axios';

const LocationSMS = () => {
  const googleApiKey = 'ADD_YOUR_API_KEY';
  const sinchUrl = 'https://sms.api.sinch.com/xms/v1/9f1e4cf8132f41a691f94278f276ffc7/batches';
  const sinchAccessToken = '1b23114d88544c89b03bdec6241c6342';

  const axiosInstance = axios.create({
    baseURL: sinchUrl,
    headers: {
      'Authorization': `Bearer ${sinchAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  const smsPayload = {
    from: '447441421037',
    to: ['919611760575'],
    body: ''
  };

  const getCurrentLocation = async () => {
    try {
      const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`, {});
      const location = response.data.location;
      const { lat, lng } = location;
      return `Latitude: ${lat}, Longitude: ${lng}`;
    } catch (error) {
      console.error('Error fetching location:', error.response ? error.response.data : error.message);
      throw new Error('Failed to fetch current location.');
    }
  };

  const sendLocationSMS = async () => {
    try {
      const locationMessage = await getCurrentLocation();
      smsPayload.body = locationMessage;

      const response = await axios.post('/api/send-sms', smsPayload);
      console.log(`SMS sent successfully. Status Code: ${response.status}`);
      console.log(`Response JSON: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Error sending SMS:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    console.log('LocationSMS component mounted');
    sendLocationSMS();
  }, []);

  return (
    <div>
      <h1>Sending Location via SMS...</h1>
    </div>
  );
};

export default LocationSMS;
