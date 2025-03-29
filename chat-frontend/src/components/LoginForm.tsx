/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginForm = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ title: string; description: string; variant: string } | null>(null);
  const router = useRouter();

const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const data = { identifier: email, password }; // Strapi requires `identifier` instead of `email`.
    const endpoint = "http://localhost:1337/api/auth/local"; // Strapi's login endpoint (update if deployed).
    // const endpoint = "https://real-time-chat-n9q7.onrender.com/api/auth/local"; // Strapi's login endpoint

    const response = await axios.post(endpoint, data);

    // Extract JWT token and user data from the response
    const { jwt, user } = response.data;

    // Store token securely (preferably use cookies for production)
    localStorage.setItem("token", jwt);

    // Set token as a default Authorization header for future requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    // Trigger success callback and navigate to home
    onLoginSuccess(); // Pass the `user` object to maintain user session state.
    // router.push("/home");
  } catch (err) {
    // Handle error gracefully
    setError({
      title: "Login Failed",
      description: "Invalid credentials or server error. Please try again.",
      variant: "destructive",
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Log in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md">
            <strong>{error.title}</strong>
            <p>{error.description}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
