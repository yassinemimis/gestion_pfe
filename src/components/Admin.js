import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Content from './Content';
import styles5 from "../App.module.css"; 
const Admin = () => {
  const [activeComponent1, setActiveComponent] = useState("Table"); 

  return (
    <div className={styles5.appcontainer}>
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className={styles5.maincontent}>
        <TopBar />
        <Content activeComponent1={activeComponent1} />
      </div>

    </div>
  );
};

export default Admin;
