import React from 'react';
import './Content.css';
import UploadFile from "./UploadFile";
import Table from "./TableEtud";
import TableEnsg from "./TableEnsg"
import Tablecomp from "./Tablecomp"
import FormEtud from "./FormEtud"
import FormComp from "./FormComp"
import FormEnsg from './FormEnsg';
const Content = () => {
  return (
    <main className="content">
     <div className="App">
      <UploadFile />
    </div>
    </main>
  );
};

export default Content;
