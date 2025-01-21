import React, { useState } from 'react';
import TopBar from './TopBar';
import Content from './Content';
import styles5 from "../App.module.css"; 
import SidebarEntr from "./SidebarEntr"
const Entre = () => {
  const [activeComponent1, setActiveComponent] = useState("PFEEntreprise"); 

  return (
    <div className={styles5.appcontainer}>
      <SidebarEntr setActiveComponent={setActiveComponent} />
      <div className={styles5.maincontent}>
        <TopBar />
        <Content activeComponent1={activeComponent1} />
      </div>

    </div>
  );
};

export default Entre;
