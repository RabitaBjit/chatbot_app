import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      setMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response.", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chatbot">
      <div
        className={`chatbot-icon ${isOpen ? "hidden" : ""}`}
        onClick={toggleChatbot}
      >
        💬
      </div>
      <div className={`chatbox ${isOpen ? "" : "hidden"}`}>
        <div className="chatbox-header">
          <span>Chatbot</span>
          <button onClick={toggleChatbot}>✖</button>
        </div>
        <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbox-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbox-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
