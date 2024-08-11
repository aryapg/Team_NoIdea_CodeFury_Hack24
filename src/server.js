const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

// Apply CORS middleware
app.use(cors());
app.use(express.json());

const GEMINI_API_URL = 'https://gemini.googleapis.com/v1beta2/text:generate'; // Update with the actual Gemini API endpoint
const GEMINI_API_KEY = 'AIzaSyCQ-tZ3BhnTiDx-Oh5Rmkw1kzuBt111aXc'; // Replace with your actual Gemini API key

app.post('/api/send-sms', async (req, res) => {
  try {
    const response = await axios.post('https://sms.api.sinch.com/xms/v1/9f1e4cf8132f41a691f94278f276ffc7/batches', req.body, {
      headers: {
        'Authorization': `Bearer 1b23114d88544c89b03bdec6241c6342`,
        'Content-Type': 'application/json',
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Error sending SMS' });
  }
});

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log('Received prompt:', prompt); // Log received prompt
    const response = await axios.post(GEMINI_API_URL, {
      prompt: prompt,
    }, {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Gemini API response:', response.data); // Log API response

    const geminiResponse = response.data;
    const responseMessage = geminiResponse.generated_text || "Sorry, I couldn't generate a response.";

    res.json({ response: responseMessage });
  } catch (error) {
    console.error('Error fetching response from Gemini API:', error);
    res.status(500).json({ response: 'Error fetching response.' });
  }
});

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'aryapg',
  password: 'Arya440022#@', // Your MySQL password
  database: 'CrisisCompass',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// In-memory storage for OTPs (Consider using a more robust solution like Redis in production)
const otpStore = {};

// API route to handle sign-up
app.post('/api/signup', (req, res) => {
  const { name, phone, pwsd, email } = req.body;
  const sql = 'INSERT INTO Vol (Name, PhNum, pswd, email) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, phone, pwsd, email], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error signing up.');
    } else {
      res.send('Sign-up successful!');
    }
  });
});

// API route to handle login and OTP generation
app.post('/api/login', async (req, res) => {
  const { name, pwsd } = req.body;
  const sql = 'SELECT * FROM Vol WHERE Name = ?';
  db.query(sql, [name], async (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error logging in.');
    } else if (results.length > 0) {
      const user = results[0];
      if (pwsd === user.pswd) {
        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

        // Send OTP via SMS
        const smsUrl = 'https://sms.api.sinch.com/xms/v1/9f1e4cf8132f41a691f94278f276ffc7/batches';
        const accessToken = '1b23114d88544c89b03bdec6241c6342';
        const payload = {
          from: '447441421037',
          to: [user.PhNum], // Use the phone number from the database
          body: 'Your OTP code is ${otp}'
        };
        const headers = {
          'Authorization': 'Bearer ${accessToken}',
          'Content-Type': 'application/json'
        };

        try {
          await axios.post(smsUrl, payload, { headers });
          otpStore[name] = otp; // Store OTP for the user
          res.send('Password verified. Please enter the OTP sent to your phone.');
        } catch (error) {
          console.error('Error sending OTP:', error.response ? error.response.data : error.message);
          res.status(500).send('Error sending OTP.');
        }
      } else {
        res.status(401).send('Invalid password.');
      }
    } else {
      res.status(404).send('User not found.');
    }
  });
});

// API route to verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { name, otp } = req.body;
  if (otpStore[name] && otpStore[name] === otp) {
    delete otpStore[name]; // Remove OTP after successful verification
    res.send('OTP verified successfully!');
  } else {
    res.status(401).send('Invalid OTP.');
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});