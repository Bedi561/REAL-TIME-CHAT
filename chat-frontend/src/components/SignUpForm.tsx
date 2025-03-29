/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Link from "next/link"; // Correct import for Next.js
import { useRouter } from "next/navigation"; // Router for navigation
import axios from "axios"; // Axios for HTTP requests
import { UserPlus } from "lucide-react";

const SignUpForm = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error handling

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setError("Passwords do not match. Please try again.");
  //     return;
  //   }

  //   try {
  //     // Prepare data for signup
  //     const data = {
  //       username: name, // Strapi expects 'username' for registration
  //       email,
  //       password,
  //     };

  //     const endpoint = "http://localhost:1337/api/auth/local/register"; // Strapi's register endpoint
  //     // const endpoint = "https://real-time-chat-n9q7.onrender.com/api/auth/local/register"; // Strapi's register endpoint

  //     // Send POST request to the register endpoint
  //     const response = await axios.post(endpoint, data);

  //     // Extract the JWT token and user data from the response
  //     const { jwt, user } = response.data;

  //     // Store the JWT token securely (for now, using localStorage)
  //     localStorage.setItem("token", jwt);

  //     // Redirect to home or another page
  //     router.push("/");
  //   } catch (err: any) {
  //     // Handle error gracefully
  //     if (err.response?.data?.error?.message) {
  //       setError(err.response.data.error.message); // Show specific error from Strapi
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
  
    try {
      const endpoint = "https://ytrdjthpheepajlwvvmb.supabase.co/auth/v1/signup";
  
      const response = await axios.post(endpoint, {
        email,
        password,
      }, {
        headers: {
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0cmRqdGhwaGVlcGFqbHd2dm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDU4ODcsImV4cCI6MjA1ODY4MTg4N30.819tnBxugKZUd0zxs2P9qJ5SFeUdTnH-42pa987hG2Y",
          "Content-Type": "application/json",
        },
      });
  
      const { access_token, user } = response.data;
  
      // Store the JWT token securely (preferably in HTTP-only cookies for production)
      localStorage.setItem("token", access_token);
  
      // Redirect to home or another page
      router.push("/");
    } catch (err: any) {
      if (err.response?.data?.error?.message) {
        setError(err.response.data.error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="text-muted-foreground mt-2">Sign up to get started</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
          >
            <UserPlus className="h-5 w-5" />
            Create account
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
