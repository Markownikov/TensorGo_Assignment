import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/auth/current-user",
          {
            withCredentials: true,
          }
        );

        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
        setError("Failed to check authentication status");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/logout", {
        withCredentials: true,
      });

      if (response.data.success) {
        setUser(null);
      } else {
        console.error("Logout was not successful:", response.data);
        setError("Failed to logout");
      }
    } catch (err) {
      console.error("Error during logout:", err);
      setError("Failed to logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
