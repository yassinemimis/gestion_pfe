import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import AdminPage from "./components/Admin"; 
import Etud from "./components/Etud";
import Ensg from "./components/Ensg";
import styles4 from "./App.module.css"; 
import Entre from "./components/Entre";
const App = () => {
  return (
    <Router>
      <div >
        <Routes>
          {}
          <Route path="/login" element={<LoginForm />} />

          {}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/etudiant" element={<Etud />} />
          <Route path="/enseignant" element={<Ensg />} />
          <Route path="/entreprise" element={<Entre />} />
          {}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
