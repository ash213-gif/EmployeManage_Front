import React, { useEffect, useState } from "react";
import { GlobarRenderUrl } from "../../../../GlobalUrl";
import axios from "axios";
import { FiMenu, FiVideo } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Message({ selectedAdmin }) {
    const [message, setNewMessage] = useState("");
    const userId = sessionStorage.getItem("Id");
    const [receiveMessages, setReceiveMessages] = useState([]);

    const receiverId = selectedAdmin ? selectedAdmin._id : null; 

    const handleSubmitMessage = async () => {
        if (!message.trim()) {
            toast.error("Message cannot be empty");
            return;
        }

        try {
            const sendMessage = {
                senderId: userId,
                receiverId: receiverId, 
                message: message,
            };
            const response = await axios.post( `http://localhost:4040/createChat` ||`${GlobarRenderUrl}/createChat`, sendMessage);
            console.log(response.data);


            if (response.data.status) {
                toast.success("Message sent!");
                setNewMessage("");
                fetchMessages(); 
            } else {
                toast.error(response.data.msg);
            }
        } catch (e) {
            console.log(e);
            toast.error("Failed to send message");
        }
    };

    const fetchMessages = async () => {
        const senderId = selectedAdmin ? selectedAdmin._id : null;;

      

        try {
            const response = await axios.get( ` http://localhost:4040/getmessages/${senderId}`,{params:{ receiverId :userId  }}  || `${GlobarRenderUrl}/getmessages/${senderId}`, {
                params: { receiverId :userId  }
            });
            console.log(response.data);

            if (response.data.status) {
                setReceiveMessages(response.data.data);
            } else {
                toast.error(response.data.msg);
            }
        } catch (e) {
            console.log(e);
           
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [userId, selectedAdmin]); 
   
    return (
        <div className="flex flex-col h-full bg-white rounded-lg p-4">
            {/* Profile Section */}
            <div className="flex justify-between items-center bg-gray-200 p-4 rounded-xl">
                <div className="text-lg font-medium text-gray-800">
                    {selectedAdmin ? selectedAdmin.name : ""}
                </div>
                <div className="flex space-x-4">
                    <FiVideo size={24} className="text-gray-600" />
                    <FiMenu size={24} className="text-gray-600" />
                </div>
            </div>

            {/* Messages Section */}
            <div className="flex-1 overflow-y-auto mb-4">
                {receiveMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${msg.senderId === userId ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-bubble">{msg.message}</div> {/* Use msg.message instead of msg.content */}
                    </div>
                ))}
            </div>

            {/* Input Section */}
            <div className="flex space-x-4">
                <input
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={message}
                    placeholder="Enter your message"
                />
                <button
                    onClick={handleSubmitMessage}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl"
                >
                    Submit
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}
