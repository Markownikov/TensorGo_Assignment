import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const FrillWidget = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  // Check if user has just logged in - this runs whenever auth state changes
  useEffect(() => {
    console.log("FrillWidget auth state:", {
      user,
      loading,
      path: location.pathname,
    });

    // Show widget when user is logged in (including on home page)
    if (!loading && user) {
      // Check if this is a new login by looking at local storage
      const lastLoginTime = localStorage.getItem("lastLoginTime");
      const currentTime = new Date().getTime();

      // If no previous login or it's been more than 1 hour since last recorded login
      if (
        !lastLoginTime ||
        currentTime - parseInt(lastLoginTime) > 60 * 60 * 1000
      ) {
        console.log("Showing Frill widget - new login detected");
        setVisible(true);
        // Update last login time
        localStorage.setItem("lastLoginTime", currentTime.toString());
      }
    }
  }, [user, loading, location.pathname]);

  // Reset lastLoginTime when user logs out
  useEffect(() => {
    if (!user && !loading) {
      localStorage.removeItem("lastLoginTime");
    }
  }, [user, loading]);

  // Add a key press handler to toggle widget for testing purposes
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Show widget when user presses Alt+F
      if (e.altKey && e.key === "f" && user) {
        console.log("Manual toggle of Frill widget");
        setVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [user]);

  // Don't render anything if no user is logged in
  if (!user) {
    return null;
  }

  // Hide the widget if not visible
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-40"
        title="Open Feedback Form"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
      {/* Profile section */}
      <div className="bg-gray-800 text-white p-4 flex items-center">
        <div className="flex items-center flex-1">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.displayName}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
              {user.displayName.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-bold">{user.displayName}</div>
            <div className="text-sm text-gray-300">{user.email}</div>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
        >
          Close
        </button>
      </div>

      {/* Full screen iframe */}
      <div className="flex-1 frill-container">
        <iframe
          src="https://nothing-hd.frill.co/embed/widget/8a299d90-b918-45ee-a19d-ec181fae77c4"
          sandbox="allow-same-origin allow-scripts allow-top-navigation allow-popups allow-forms allow-popups-to-escape-sandbox"
          style={{ border: 0, outline: 0, width: "100%", height: "100%" }}
          title="Frill Feedback Widget"
        ></iframe>
      </div>
    </div>
  );
};

export default FrillWidget;
