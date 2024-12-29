import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import AdminPage from "./components/Admin"; 

import styles4 from "./App.module.css"; 
const App = () => {
  return (
    <Router>
      <div >
        <Routes>
          {}
          <Route path="/login" element={<LoginForm />} />

          {}
          <Route path="/admin" element={<AdminPage />} />

          {}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
