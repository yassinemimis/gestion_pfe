import React from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Content from './components/Content';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <Content />
      </div>
    </div>
  );
};

export default App;
