import React, { useState } from 'react';
import './App.css';

const GEMINI_API_URL = 'http://localhost:5000/chat';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleChatSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponse(result.response);
    } catch (error) {
      console.error('Error fetching response from API:', error);
      setResponse('Error fetching response.');
    }
  };

  return (
    <div className="app">
      <h1>🛡️ Disaster Preparedness Chatbot</h1>
      <form onSubmit={handleChatSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me anything about disaster preparedness:"
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default Chatbot;
