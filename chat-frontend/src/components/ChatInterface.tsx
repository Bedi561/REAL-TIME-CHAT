'use client';

import React, { useEffect, useState } from "react";
import { Moon, Sun, Send, Power } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import axios from "axios";

const ChatInterface = () => {
  const { theme, toggleTheme } = useTheme();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string; timestamp: Date }[]>([]);

  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  // Connect to the WebSocket server
  useEffect(() => {
    console.log("Initializing WebSocket connection...");

    const newSocket = io("http://localhost:3001"); // Update with your backend URL
    // const newSocket = io("https://real-time-chat-h08x.onrender.com"); 
    setSocket(newSocket);

    // WebSocket connection events
    newSocket.on("connect", () => {
      console.log("WebSocket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("WebSocket disconnected.");
    });

    // Listen for incoming messages
    newSocket.on("message", (data) => {
      console.log("Received message from server:", data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: data.text, sender: "other", timestamp: new Date() },
      ]);
    });

    // Error handling
    newSocket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    // Cleanup on component unmount
    return () => {
      console.log("Disconnecting WebSocket...");
      newSocket.disconnect();
    };
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && socket) {
      const newMessage = { text: message, sender: "user", timestamp: new Date() };

      console.log("Sending message to server:", newMessage);

      socket.emit("message", newMessage); // Emit message to server
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...newMessage, id: Date.now() },
      ]); // Add to local state

      setMessage(""); // Clear the input
    } else {
      console.warn("Message is empty or WebSocket is not connected.");
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="glass-morphism flex items-center justify-between p-4 sticky top-0 z-10">
        <h1 className="text-xl font-semibold">Chat App</h1>
        <button
          onClick={() => {
            console.log("Toggling theme");
            toggleTheme();
          }}
          className="p-2 rounded-full hover:bg-muted/80 transition-colors"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button
          onClick={() => {
            console.log("Logging out...");
            // Add your logout logic here
            localStorage.removeItem("token");

            // Optional: Remove Authorization header
            delete axios.defaults.headers.common["Authorization"];
        
            // Redirect to login page
            router.push("/");
          }}
          className="p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
        >
          <Power className="h-5 w-5" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className={`message-bubble ${msg.sender === "user" ? "message-user" : "message-other"}`}>
              {msg.text}
            </div>
            <span className="timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="glass-morphism p-4 sticky bottom-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              console.log("Message input changed:", e.target.value);
            }}
            placeholder="Type a message..."
            className="flex-1 bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={!message.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
