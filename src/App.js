import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Content from './components/Content';
import './App.css';

const App = () => {
  const [activeComponent1, setActiveComponent] = useState("Table"); 

  return (
    <div className="app-container">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="main-content">
        <TopBar />
        <Content activeComponent1={activeComponent1} />
      </div>
  
    </div>
  );
};

export default App;
