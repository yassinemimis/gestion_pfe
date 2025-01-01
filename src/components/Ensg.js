import React, { useState } from 'react';
import TopBar from './TopBar';
import Content from './Content';
import styles5 from "../App.module.css"; 
import SidebarEnsg from "./SidebarEnsg"
const Ensg = () => {
  const [activeComponent1, setActiveComponent] = useState("TableEnsg"); 

  return (
    <div className={styles5.appcontainer}>
      <SidebarEnsg setActiveComponent={setActiveComponent} />
      <div className={styles5.maincontent}>
        <TopBar />
        <Content activeComponent1={activeComponent1} />
      </div>

    </div>
  );
};

export default Ensg;
