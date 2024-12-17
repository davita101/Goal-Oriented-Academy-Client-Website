import React, { useState } from "react";
import axios from "axios";

export default function Login({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendInfo, setSendInfo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email });
      console.log("Response:", response.data);
      setCurrentUser(response.data.user);
      setSendInfo(true);
      setMessage("Information has been sent successfully to your email. Please check your email to enter in GOA.");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto h-screen w-full flex flex-col items-center justify-center">
      <p className="text-center text-[35px] pb-4 font-bold text-green-500">Goal Oriented Academy</p>
      {!sendInfo ? (
        <form onSubmit={handleSubmit} className="space-y-8 w-full p-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-300 text-white font-bold rounded-md"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="w-full bg-green-100 rounded-sm p-2">
          <p className="text-sm text-gray-700">
            <b>{email}</b> {message}
          </p>
        </div>
      )}
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}
