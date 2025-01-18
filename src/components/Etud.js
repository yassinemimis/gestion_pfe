import React, { useState } from 'react';
import TopBar from './TopBar';
import Content from './Content';
import styles5 from "../App.module.css"; 
import SidebarEtud from "./SidebarEtud"
const Etud = () => {
  const [activeComponent1, setActiveComponent] = useState("FormulaireSelection"); 

  return (
    <div className={styles5.appcontainer}>
      <SidebarEtud setActiveComponent={setActiveComponent} />
      <div className={styles5.maincontent}
       style={{
        width: "85%",     
      }}
    >
        <TopBar />
        <Content activeComponent1={activeComponent1} />
      </div>

    </div>
  );
};

export default Etud;
  