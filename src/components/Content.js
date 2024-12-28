// import React, { useState } from 'react';
// import './Content.css';
// import axios from "axios";
// import UploadFile from "./UploadFile";
// import Table from "./TableEtud";
// import TableEnsg from "./TableEnsg"
// import Tablecomp from "./Tablecomp"
// import FormEtud from "./FormEtud"
// import FormComp from "./FormComp"
// import FormEnsg from './FormEnsg';
// import EmailTemplateManager from "./EmailTemplateManager"
// const Content = () => {
//   const [activeComponent, setActiveComponent] = useState("Table"); // لتحديد المكوّن النشط
//   const [data, setData] = useState(null); // لتخزين البيانات

//   const handleSwitchToForm = (data) => {
//     setData(data); // تخزين البيانات في الـ state
//     setActiveComponent("FormEtud"); // تغيير المكوّن النشط إلى FormEtud
//   };

//   return (
//     <main className="content">
//       <div className="App">
//         {/* عرض المكوّن النشط بناءً على الحالة
//         {activeComponent === "Table" && <Table onSwitchToForm={handleSwitchToForm} />}
//         {activeComponent === "FormEtud" && <FormEtud data={data} />} */}
//         <EmailTemplateManager />
//       </div>
//     </main>
//   );
// };
// export default Content;

import React, { useState } from "react";
import "./Content.css";
import UploadFile from "./UploadFile";
import Table from "./TableEtud";
import TableEnsg from "./TableEnsg";
import Tablecomp from "./Tablecomp";
import FormEtud from "./FormEtud";
import FormComp from "./FormComp";
import FormEnsg from "./FormEnsg";
import EmailTemplateManager from "./EmailTemplateManager";
import FormulairePFEEnseignant  from "./FormulairePFEEnseignant";
import PFEEtudiant from "./PFEEtudiant"
import PFEEntreprise from "./PFEEntreprise"
import ProjectSelection from "./ProjectSelection"
const Content = ({ activeComponent1 }) => {
  const [activeComponent, setActiveComponent] = useState("Table");
  const [data, setData] = useState(null);

  console.log(activeComponent1);

  const handleSwitchToForm = (data) => {
    console.log(data);
    setData(data);
    setActiveComponent("FormEtud");
  };

  const renderComponent = () => {
    if (activeComponent1) {
      switch (activeComponent1) {
        case "TableEnsg":
          return <TableEnsg />;
        case "Tablecomp":
          return <Tablecomp />;
        case "EmailTemplateManager":
          return <EmailTemplateManager />;
        case "UploadFile":
          return <UploadFile />;
      
      }
    }

    switch (activeComponent) {
      case "Table":
        return <Table onSwitchToForm={handleSwitchToForm} />;
      case "FormEtud":
        return <FormEtud data={data} />;
      case "FormComp":
        return <FormComp data={data} />;
      case "FormEnsg":
        return <FormEnsg data={data} />;
      default:
        return <div></div>;
    }
  };

  return <main className="content">{<ProjectSelection />}</main>;
};

export default Content;
