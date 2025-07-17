import React, { useEffect, useState, useContext, useRef } from "react";
import { Getusers } from "../../../Context/Getusefunction";
import axios from "axios";
import { GlobarRenderUrl } from "../../../../GlobalUrl";
import { ToastContainer, toast } from "react-toastify";
import { FiVideo, FiMenu, FiSend } from "react-icons/fi";
import io from 'socket.io-client';

export default function AdminChat() {
  const { getusers } = useContext(Getusers);
  const [showAdmin, setShowAdmin] = useState([]); // Renamed to showAdmin
  const [selectedAdmin, setSelectedAdmin] = useState(null); // Renamed to selectedAdmin
  const [currentUser, setCurrentUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [message, setNewMessage] = useState("");
  const [receiveMessages, setReceiveMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef();

  const profileName = sessionStorage.getItem("Id");
  const userId = sessionStorage.getItem("Id");

  // Filter admins (exclude current user)
  useEffect(() => {
    const filterAdmin = getusers.filter((user) => user.role === "admin" && user._id !== userId);
    setShowAdmin(filterAdmin);
  }, [getusers, userId]);

  // Fetch current user details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${GlobarRenderUrl}/getuser/${profileName}`);
        if (response.data.status) {
          setDetails(response.data.user.name);
          setCurrentUser(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        toast.error("Failed to load user details");
      }
    };
    
    if (profileName) {
      fetchDetails();
    }
  }, [profileName]);

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

  // Fetch messages when admin is selected
  useEffect(() => {
    if (selectedAdmin && currentUser) {
      fetchMessages();
    }
  }, [selectedAdmin, currentUser]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [receiveMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!selectedAdmin || !currentUser) return;
    
    setIsLoading(true);
    try {
      const url = `${GlobarRenderUrl}/getmessages/${currentUser._id}?receiverId=${selectedAdmin._id}`;
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
    if (!message.trim() || !selectedAdmin || !currentUser) {
      toast.error("Please select an admin and enter a message");
      return;
    }

    setIsLoading(true);
    const messageToSend = message.trim();
    
    try {
      const sendMessage = {
        senderId: currentUser._id,
        receiverId: selectedAdmin._id,
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
          receiverName: selectedAdmin.name
        });
        
        // Add message to local state immediately for better UX
        const newMessage = {
          _id: response.data.data._id || Date.now(),
          senderId: currentUser._id,
          receiverId: selectedAdmin._id,
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
    <div className="flex h-screen space-x-5 bg-gray-100 p-4">
      {/* Admin list section */}
      <div className="bg-white w-1/4 rounded-lg shadow-md p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Chat with Admin
          <span className="text-blue-800">{details ? ` ${details}` : ''}</span>
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search admins..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <ul className="divide-y divide-gray-200">
          {showAdmin.map((admin) => (
            <li
              key={admin._id}
              className={`py-4 cursor-pointer hover:bg-gray-50 rounded-md px-2 transition-colors ${
                selectedAdmin && selectedAdmin._id === admin._id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
              }`}
              onClick={() => setSelectedAdmin(admin)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                  <p className="text-xs text-gray-500">{admin.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat section */}
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col h-full bg-white rounded-lg p-4">
          {/* Profile Section */}
          <div className="flex justify-between items-center bg-gray-200 p-4 rounded-xl mb-4">
            <div className="text-lg font-medium text-gray-800">
              {selectedAdmin ? `Chat with ${selectedAdmin.name}` : "Select an admin"}
            </div>
            <div className="flex space-x-4">
              <FiVideo size={24} className="text-gray-600 cursor-pointer hover:text-blue-600" />
              <FiMenu size={24} className="text-gray-600 cursor-pointer hover:text-blue-600" />
            </div>
          </div>

          {/* Messages Section */}
          <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
            {!selectedAdmin ? (
              <div className="flex justify-center items-center h-full text-gray-500">
                Select an admin to start chatting
              </div>
            ) : isLoading && receiveMessages.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
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
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 border"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === userId ? "text-blue-200" : "text-gray-500"
                    }`}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex space-x-4">
            <input
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              value={message}
              placeholder={selectedAdmin ? "Enter your message..." : "Select an admin first"}
              onKeyPress={handleKeyPress}
              disabled={!selectedAdmin || isLoading}
            />
            <button
              onClick={handleSubmitMessage}
              disabled={!selectedAdmin || isLoading || !message.trim()}
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
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
