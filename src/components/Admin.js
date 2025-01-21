import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Content from './Content';
import styles5 from "../App.module.css"; 

const Admin = () => {
  const [activeComponent1, setActiveComponent1] = useState("FormulaireSelection");

  return (
    <div className={styles5.appcontainer}>
      <Sidebar setActiveComponent={setActiveComponent1} />
      <div
        className={styles5.maincontent}
        style={{
          width: "85%",
        }}
      >
        <TopBar />
        <Content
          setActiveComponent={setActiveComponent1} // تمرير الدالة هنا
          activeComponent1={activeComponent1}
        />
      </div>
    </div>
  );
};

export default Admin;
