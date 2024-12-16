import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./UploadFile.css";
import excelIcon from '../assets/excel-icon.png';
import axios from 'axios';
const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);  
  const [fileIcon, setFileIcon] = useState("📊");  

  // Configuration du dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: [".csv"],
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);


      if (selectedFile && selectedFile.name.endsWith(".xls") || selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xlsm")) {
        setFileIcon( <i className="fa fa-file-excel"></i>);  
      } else {
        setFileIcon("📊"); 
      }

      setProgress(0); 
    },
  });

  useEffect(() => {
    let interval;

 
    if (file) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress < 100) {
            return oldProgress + 10; 
          } else {
            clearInterval(interval); 
            return 100;
          }
        });
      }, 1000);

     
      return () => clearInterval(interval);
    }
  }, [file]);

  const [message, setMessage] = useState('');
  const [messagee, setMessagee] = useState({ text: "", type: "" });
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Veuillez sélectionner un fichier');
      setMessagee({ text: "Action réussie ! L'étudiant a été ajouté.", type: "success" });
      return;
    }

    const formData = new FormData();
    formData.append('csv_file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/import-users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('Le fichier a été téléchargé avec succès');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors du téléchargement du fichier :", error);
      setMessage('Échec du téléchargement du fichier');
    }
  };
  return (
    <div>   {messagee.text && (
      <div className={`message ${message.type}`}>
        {messagee.text}
      </div>
    )}
    <div className="container">
   
      {/* Section Drag & Drop */}
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag or Drop or Choose file to upload</p>
        <small>supported formats: CVS</small>
        <div className="cloud-icon">☁️</div>
      </div>

      {/* Barre de progression */}
      {file && (
        <div className="progress-container">
          <div className="file-icon">{fileIcon}</div> {}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}  
            ></div>
          </div>
        </div>
      )}

      {/* Import depuis URL */}
      <div className="url-section">
        <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Import</button>
      
      </div>
      <p>{message}</p>
    </div></div>
  );
};

export default UploadFile;







