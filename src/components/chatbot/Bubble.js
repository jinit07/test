// src/components/chatbot/index.js
import React, { useState } from 'react';
import BubbleIcon from './Bubble';
import './chatbot.css'; // Import the CSS file

const Chatbot = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleBubbleClick = () => {
    setIsChatVisible((prev) => !prev);
  };

  const handleSendClick = () => {
    // Logic to handle message sending can be added here
    setMessage('');
  };

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <div>
      <BubbleIcon onClick={handleBubbleClick} />
      {isChatVisible && (
        <div className="chat-box">
          <div className="chat-box-header">
            <h3>Message Us</h3>
            <p onClick={handleBubbleClick}>&times;</p>
          </div>
          <div className="chat-box-body">
            {/* Example chat messages */}
            <div className="chat-box-body-send">
              <p>This is my message.</p>
              <span>12:00</span>
            </div>
            <div className="chat-box-body-receive">
              <p>This is my message.</p>
              <span>12:00</span>
            </div>
          </div>
          <div className="chat-box-footer">
            <button id="addExtra" onClick={toggleModal}>
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <i className="send far fa-paper-plane" onClick={handleSendClick}></i>
          </div>
        </div>
      )}
      {isModalVisible && (
        <div className="modal show-modal">
          <div className="modal-content">
            <span className="modal-close-button" onClick={toggleModal}>
              &times;
            </span>
            <h1>Add What you want here.</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
