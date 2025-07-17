import React, { useEffect, useState, useContext, useRef } from "react";
import { Getusers } from "../../../Context/Getusefunction";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiVideo, FiMenu, FiSend } from "react-icons/fi";
import { GlobarRenderUrl } from "../../../../GlobalUrl";
import io from 'socket.io-client';

export default function UserChat() {
  const { getusers } = useContext(Getusers);
  const [showUsers, setShowUsers] = useState([]); // Renamed to showUsers
  const [selectedUser, setSelectedUser] = useState(null); // Renamed to selectedUser
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setNewMessage] = useState("");
  const [receiveMessages, setReceiveMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();

  const userId = sessionStorage.getItem("Id");

  // Fetch current user details
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getuser/${userId}`);
        if (response.data.status) {
          setCurrentUser(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        toast.error("Failed to load user details");
      }
    };
    
    if (userId) {
      fetchCurrentUser();
    }
  }, [userId]);

  // Filter users from users context
  useEffect(() => {
    const filteredUsers = getusers.filter((user) => user.role === "user"); // Changed to filter users
    setShowUsers(filteredUsers);
  }, [getusers]);

  // Socket connection and message handling
  useEffect(() => {
    if (!userId) return;

    socketRef.current = io(GlobarRenderUrl);
    
    // Join user's room
    socketRef.current.emit('join', userId);
    
    // Listen for incoming messages
    socketRef.current.on('message', (newMessage) => {
      setReceiveMessages(prevMessages => {
        // Avoid duplicate messages
        const messageExists = prevMessages.some(msg => 
          msg._id === newMessage._id || 
          (msg.senderId === newMessage.senderId && 
           msg.receiverId === newMessage.receiverId && 
           msg.message === newMessage.message &&
           Math.abs(new Date(msg.createdAt) - new Date(newMessage.createdAt)) < 1000)
        );
        
        if (!messageExists) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    });

    // Handle connection errors
    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      toast.error('Connection error. Please refresh the page.');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  // Fetch messages when user is selected
  useEffect(() => {
    if (selectedUser && currentUser) {
      fetchMessages();
    }
  }, [selectedUser, currentUser]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [receiveMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!selectedUser || !currentUser) return;
    
    setIsLoading(true);
    try {
      const url = `${GlobarRenderUrl}/getmessages/${currentUser._id}?receiverId=${selectedUser._id}`;
      console.log('Fetching messages from:', url);
      const response = await axios.get(url);
      
      if (response.data.status) {
        const sortedMessages = response.data.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setReceiveMessages(sortedMessages);
      } else {
        toast.error(response.data.msg || "Failed to load messages");
        setReceiveMessages([]);
      }
    } catch (e) {
      console.error("Error fetching messages:", e);
      toast.error("Failed to load messages");
      setReceiveMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitMessage = async () => {
    if (!message.trim() || !selectedUser || !currentUser) {
      toast.error("Please select a user and enter a message");
      return;
    }

    setIsLoading(true);
    const messageToSend = message.trim();
    
    try {
      const sendMessage = {
        senderId: currentUser._id,
        receiverId: selectedUser._id,
        message: messageToSend,
      };
      
      const response = await axios.post(`${GlobarRenderUrl}/createChat`, sendMessage);
      
      if (response.data.status) {
        setNewMessage("");
        
        // Emit message through socket
        socketRef.current.emit('sendMessage', {
          ...sendMessage,
          _id: response.data.data._id,
          createdAt: new Date().toISOString(),
          senderName: currentUser.name,
          receiverName: selectedUser.name
        });
        
        // Add message to local state immediately for better UX
        const newMessage = {
          _id: response.data.data._id || Date.now(),
          senderId: currentUser._id,
          receiverId: selectedUser._id,
          message: messageToSend,
          createdAt: new Date().toISOString()
        };
        
        setReceiveMessages(prevMessages => [...prevMessages, newMessage]);
        
      } else {
        toast.error(response.data.msg || "Failed to send message");
      }
    } catch (e) {
      console.error("Error sending message:", e);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMessage();
    }
  };

  return (
    <div className="flex h-screen m-0 p-0 space-x-5 bg-gray-100">
      {/* User List Section */}
      <div className="bg-white rounded-lg w-1/4 shadow-md p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Chat with Users</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <ul className="divide-y divide-gray-200">
          {showUsers.map((user) => ( // Changed to showUsers
            <li
              key={user._id}
              className={`py-4 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition-colors ${
                selectedUser && selectedUser._id === user._id ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
              }`}
              onClick={() => setSelectedUser(user)} // Changed to setSelectedUser
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-xl mb-4">
          <div className="text-lg font-medium text-gray-800">
            {selectedUser ? `Chat with ${selectedUser.name}` : "Select a user"}
          </div>
          <div className="flex space-x-4">
            <FiVideo size={24} className="text-gray-600 cursor-pointer hover:text-indigo-600" />
            <FiMenu size={24} className="text-gray-600 cursor-pointer hover:text-indigo-600" />
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
          {!selectedUser ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              Select a user to start chatting
            </div>
          ) : isLoading && receiveMessages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : receiveMessages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500">
              No messages yet. Start the conversation!
            </div>
          ) : (
            receiveMessages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex mb-4 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderId === userId
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.senderId === userId ? "text-indigo-200" : "text-gray-500"
                  }`}>
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex space-x-4">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={message}
            placeholder={selectedUser ? "Enter your message..." : "Select a user first"}
            onKeyPress={handleKeyPress}
            disabled={!selectedUser || isLoading}
          />
          <button
            onClick={handleSubmitMessage}
            disabled={!selectedUser || isLoading || !message.trim()}
            className="bg-indigo-500 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl flex items-center transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FiSend className="mr-2" />
                Send
              </>
            )}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
