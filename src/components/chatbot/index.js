import React, { useState } from 'react';
import Bubble from './Bubble'; // Importing the Bubble component

const Chatbot = ({ isDarkMode }) => { // Accept the isDarkMode prop
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        { text: "Hello! I'm here to help. Please enter your prompt.", sender: 'bot' },
      ]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    console.log('Sending prompt to backend:', input); // Log the input being sent

    try {
      const apiUrl = 'http://localhost:5000/generate-query'; // Hardcoded API URL
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data); // Log the generated SQL query

      const sqlQuery = `SELECT * FROM ${data.table_name} WHERE ${data.condition}`;
      setMessages((prevMessages) => [...prevMessages, { text: sqlQuery, sender: 'bot' }]);
    } catch (error) {
      console.error('Error generating SQL query:', error);
      const errorMessage = 'Failed to generate SQL query. Please try again.';
      setMessages((prevMessages) => [...prevMessages, { text: errorMessage, sender: 'bot' }]);
    } finally {
      setIsLoading(false); // Disable input while loading
      setInput(''); // Clear input after sending
    }
  };

  return (
    <div>
      <Bubble onClick={handleToggle} />
      {isOpen && (
        <div className={`chatbot-container ${isDarkMode ? 'dark' : 'light'}`}>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <img
                  src={msg.sender === 'user' ? `${process.env.PUBLIC_URL}/account.png` : `${process.env.PUBLIC_URL}/Boy-icon-2.png`}
                  alt={msg.sender}
                  className="message-icon"
                />
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="input-container">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={isLoading} // Disable input while loading
              rows={1} // Set initial rows
              className={`input-textarea ${isDarkMode ? 'dark' : 'light'}`} // Apply theme class
            />
            <button onClick={handleSend} disabled={isLoading} className="send-button">Send</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          top: 50%; /* Center vertically */
          left: 50%; /* Center horizontally */
          transform: translate(-50%, -50%); /* Adjust positioning */
          width: 850px; /* Broader width */
          height: 750px; /* Slightly taller height */
          display: flex;
          flex-direction: column;
          z-index: 1000; /* Ensure it's on top */
          background-color: ${isDarkMode ? '#2c2c2c' : '#fff'}; /* Background color based on theme */
          color: ${isDarkMode ? '#fff' : '#000'}; /* Text color based on theme */
        }
        .chatbot-messages {
          flex-grow: 2;
          overflow-y: auto;
          padding: 10px;
          margin-bottom: 10px;
        }
        .message {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .message-icon {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          background-color: ${isDarkMode ? '#444' : '#fff'}; /* User icon background */
        }
        .message-text {
          padding: 10px 15px;
          border-radius: 8px;
          max-width: 70%;
          font-size: 1.2rem;
          background-color: ${isDarkMode ? '#444' : '#f8f8f8'}; /* Message background */
          color: ${isDarkMode ? '#fff' : '#000'}; /* Message text color */
          word-wrap: break-word; /* Ensure long messages wrap */
        }
        .user { justify-content: flex-end; }
        .bot { justify-content: flex-start; }
        .user .message-text {
          background-color: #d1e7dd;
        }
        .bot .message-text {
          background-color: #f8d7da;
        }
        .input-container {
          display: flex;
          padding: 15px; /* Added padding for space */
        }
        .input-textarea {
          flex-grow: 1;
          padding: 10px;
          margin-right: 5px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          resize: none; /* Disable resizing */
          outline: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          background-color: #fff; /* White background for input */
          color: #d9b44a; /* Golden text color */
        }
        .input-textarea.dark {
          background-color: #444; /* Dark background for input */
          color: #d9b44a; /* Golden text color */
        }
        .send-button {
          padding: 10px 15px;
          border: none;
          border-radius: 8px;
          background-color: #007bff;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .send-button:hover {
          background-color: #0056b3; /* Darker blue on hover */
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
