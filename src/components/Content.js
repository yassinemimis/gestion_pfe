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
import ListeProjets from "./ListeProjets";
import FormulaireSelection from "./FormulaireSelection";
import PFEEntreprise from "./PFEEntreprise";
import PropositionsPage from "./maproposition";
import PropositionsEnsgPage from "./mapropositionEnsg"
import PropositionsEntrPage from "./mapropositionEntr"
const Content = ({ activeComponent1, setActiveComponent }) => {
  const [data, setData] = useState(null);

  console.log(`${activeComponent1} 5555`);

  const handleSwitchToForm = (data) => {
    console.log(data);
    setData(data);
    setActiveComponent("FormEtud"); // تحديث activeComponent1 من المكون الأب
  
  };

  const handleSwitchToForm1 = (data) => {
    console.log("fromensg", data);
    setData(data);
    setActiveComponent("FormEnsg"); 
  };
  const handleSwitchToForm2 = (data) => {
    console.log("fromensg", data);
    setData(data);
    setActiveComponent("TableEnsg");
  };
  const handleSwitchToForm4 = (data) => {
    console.log("fromensg", data);
    setData(data);
    setActiveComponent("Tablecomp"); 
  };
  const handleSwitchToForm3 = (data) => {
    console.log("fromensg", data);
    setData(data);
    setActiveComponent("FormComp");
  };
  const renderComponent = () => {
    switch (activeComponent1) {
      case "Dashboard":
        return <AdminCharts />;
      case "PropositionsEntrPage":
          return <PropositionsEntrPage />;  
      case "PropositionsPage":
          return <PropositionsPage />;
      case "PropositionsEnsgPage":
            return <PropositionsEnsgPage />;      
      case "TableEnsg":
        return <TableEnsg onSwitchToForm1={handleSwitchToForm1} />;
      case "Tablecomp":
        return <Tablecomp onSwitchToForm1={handleSwitchToForm3}/>;
      case "EmailTemplateManager":
        return <EmailTemplateManager />;
      case "UploadFile":
        return <UploadFile />;
      case "ListeProjets":
        return <ListeProjets />;
      case "FormulaireSelection":
        return <FormulaireSelection />;
      case "PFEEtudiant":
        return <PFEEtudiant />;
      case "PFEEntreprise":
        return <PFEEntreprise />;  
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
        return <Table setActiveComponent={handleSwitchToForm} />;
      case "FormEtud":
        return <FormEtud data={data} setActiveComponent={setActiveComponent} />;
      case "FormComp":
        return <FormComp data={data} setActiveComponent={handleSwitchToForm4}/>;
      case "FormEnsg":
        return <FormEnsg data={data}  setActiveComponent={handleSwitchToForm2}  />;
      default:
        return <div>Composant inconnu</div>;
    }
  };

  return <main className={styles1.content}>{renderComponent()}</main>;
};

export default Content;
