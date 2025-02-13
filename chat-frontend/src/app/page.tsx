"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm"; // Import your LoginForm component
import ChatInterface from "@/components/ChatInterface"; // Import your ChatInterface component

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <ChatInterface setIsAuthenticated={setIsAuthenticated} />;
  }

  return <LoginForm onLoginSuccess={handleAuthSuccess} />;
}
