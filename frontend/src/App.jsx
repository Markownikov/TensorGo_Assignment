import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import FrillWidget from "./components/FrillWidget";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <footer className="bg-gray-800 text-white text-center py-4">
            <p>
              &copy; {new Date().getFullYear()} Tensor Go. All rights reserved.
            </p>
          </footer>
          <FrillWidget />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
