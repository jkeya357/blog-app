import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6">
      
      {/* Content Card */}
      <div className="w-full max-w-2xl text-center bg-gray-950/60 backdrop-blur border border-gray-800 rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Welcome to{" "}
          <span className="text-blue-500">My Blog</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base md:text-lg mb-8">
          A place to share insights, tutorials, and stories. Explore articles or
          log in to start posting your own content.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-500 transition"
          >
            Login
          </Link>

          <Link
            to="/createUser"
            className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium hover:bg-gray-800 transition"
          >
            Sign-Up
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Public;