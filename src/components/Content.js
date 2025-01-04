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

import UploadFile from "./UploadFile";
import Table from "./TableEtud";
import TableEnsg from "./TableEnsg";
import Tablecomp from "./Tablecomp";
import FormEtud from "./FormEtud";
import FormComp from "./FormComp";
import FormEnsg from "./FormEnsg";
import EmailTemplateManager from "./EmailTemplateManager";
import FormulairePFEEnseignant from "./FormulairePFEEnseignant";
import PFEEtudiant from "./PFEEtudiant";
import ProjectSelection from "./ProjectSelection";
import Testz from "./testzz";
import styles1 from "./Content.module.css";
import ValideEntr from "./ValideEntr";
import ValideEtud from "./ValideEtud";
import ValidEnsg from "./ValidEnsg";
import AdminCharts from "./AdminCharts";

const Content = ({ activeComponent1 }) => {
  const [activeComponent, setActiveComponent] = useState("Table");
  const [data, setData] = useState(null);

  console.log(`${activeComponent1} 5555`);

  const handleSwitchToForm = (data) => {
    console.log(data);
    setData(data);
    setActiveComponent("FormEtud");
  };

  const handleSwitchToForm1 = (data) => {
    console.log("fromensg", data);
    setData(data);
    setActiveComponent("FormEnsg");
  };

  const renderComponent = () => {
    switch (activeComponent1) {
      case "Dashboard":
        return <AdminCharts />;
      case "TableEnsg":
        return <TableEnsg onSwitchToForm1={handleSwitchToForm1} />;
      case "Tablecomp":
        return <Tablecomp />;
      case "EmailTemplateManager":
        return <EmailTemplateManager />;
      case "UploadFile":
        return <UploadFile />;
      case "PFEEtudiant":
        return <PFEEtudiant />;
      case "ProjectSelection":
        return <ProjectSelection />;
      case "FormulairePFEEnseignant":
        return <FormulairePFEEnseignant />;
      case "Testz":
        return <Testz />;
      case "ValideEntr":
        return <ValideEntr />;
      case "ValideEtud":
        return <ValideEtud />;
      case "ValidEnsg":
        return <ValidEnsg />;
      case "Table":
        return <Table onSwitchToForm={handleSwitchToForm} />;
      case "FormEtud":
        return <FormEtud data={data} setActiveComponent={setActiveComponent} />;
      case "FormComp":
        return <FormComp data={data} />;
      case "FormEnsg":
        return <FormEnsg data={data} setActiveComponent={setActiveComponent} />;
      default:
        return <div>Composant inconnu</div>;
    }
  };

  return <main className={styles1.content}>{renderComponent()}</main>;
};

export default Content;

