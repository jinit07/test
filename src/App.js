// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ThemeToggleButton from "./components/ThemeToggleButton";
import Sidebar from "./components/Sidebar/Sidebar";
import Chatbot from "./components/chatbot";
import Dashboard from "./components/Dashboard";
import MySales from "./components/Mysales";
import MonthlyExpense from "./components/MonthlyExpense"; // Import the new MonthlyExpense component

const App = () => {
  const storageKey = "theme-preference";

  const getColorPreference = () => {
    return localStorage.getItem(storageKey) === "dark" ? "light" : "dark";
  };

  const [theme, setTheme] = useState(getColorPreference());
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    document.firstElementChild.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar isDarkMode={theme === "dark"} />
        <div style={{ flexGrow: 1, padding: "1rem", overflowY: "auto" }}>
          <ThemeToggleButton
            toggleTheme={toggleTheme}
            isDarkMode={theme === "dark"}
            style={{
              position: "fixed",
              top: "1rem",
              right: "1rem",
              zIndex: 1000,
            }}
          />
          <Chatbot isOpen={isChatbotOpen} setIsOpen={setIsChatbotOpen} />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={!isChatbotOpen ? <Dashboard /> : null}
            />
            <Route path="/mysales" element={<MySales />} />
            <Route path="/monthly-expense" element={<MonthlyExpense />} />{" "}
            {/* Add the Monthly Expense route */}
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
