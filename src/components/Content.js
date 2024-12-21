import React, { useState } from 'react';
import './Content.css';
import axios from "axios";
import UploadFile from "./UploadFile";
import Table from "./TableEtud";
import TableEnsg from "./TableEnsg"
import Tablecomp from "./Tablecomp"
import FormEtud from "./FormEtud"
import FormComp from "./FormComp"
import FormEnsg from './FormEnsg';
const Content = () => {
  const [activeComponent, setActiveComponent] = useState("Table"); // لتحديد المكوّن النشط
  const [data, setData] = useState(null); // لتخزين البيانات

  const handleSwitchToForm = (data) => {
    setData(data); // تخزين البيانات في الـ state
    setActiveComponent("FormEtud"); // تغيير المكوّن النشط إلى FormEtud
  };

  return (
    <main className="content">
      <div className="App">
        {/* عرض المكوّن النشط بناءً على الحالة */}
        {activeComponent === "Table" && <Table onSwitchToForm={handleSwitchToForm} />}
        {activeComponent === "FormEtud" && <FormEtud data={data} />}
      </div>
    </main>
  );
};
export default Content;
