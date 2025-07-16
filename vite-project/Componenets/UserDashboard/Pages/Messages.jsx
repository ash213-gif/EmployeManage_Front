// UserChat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function UserChat  ({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const adminId = 'admin-id-hardcoded-or-fetched'; // Use actual admin ID

  useEffect(() => {
    socket.emit("join", currentUser._id);

    axios.get(`http://localhost:5000/api/messages/${currentUser._id}/${adminId}`)
      .then(res => setMessages(res.data));

    socket.on("receiveMessage", (newMsg) => {
      setMessages(prev => [...prev, newMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: adminId,
      message: msg
    });
    setMessages([...messages, {
      senderId: currentUser._id,
      receiverId: adminId,
      message: msg
    }]);
    setMsg('');
  };

  return (
    <div>
      <h3>Chat with Admin</h3>
      <div>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.senderId === currentUser._id ? 'right' : 'left' }}>
            {m.message}
          </div>
        ))}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
