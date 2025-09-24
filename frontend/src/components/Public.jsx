import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Welcome to <span className="text-blue-600">My Blog</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        A place to share insights, tutorials, and stories. Explore articles or
        log in to start posting your own content.
      </p>

      {/* CTA buttons */}
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/createUser"
          className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
        >
          Sign-Up
        </Link>
      </div>
    </div>
  );
};

export default Public;
