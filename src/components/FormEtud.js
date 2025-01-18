import React, { useState } from "react";
import axios from "axios";
import "./FormEtud.css";
import { Password } from "@mui/icons-material";

const FormEtud = ({ data , setActiveComponent  }) => {
  const [student, setStudent] = useState({
    nom: data.nom,
    prenom: data.prenom,
    adresse_email: data.adresse_email,
    password: "password",
    type_utilisateur: "etudiant",
    intitule_option: data.intitule_option,
    moyenne_m1: data.moyenne_m1,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
   const [message, setMessage] = useState({ text: "", type: "" }); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.id_utilisateur) {
        console.log("yass");
        console.log(data);
        await axios.put(`http://127.0.0.1:8000/api/etudiant/${data.id_utilisateur}`, student);
        setSuccessMessage("Les données ont été mises à jour avec succès!");
        setErrorMessage(""); 
        
      } else {
    
        await axios.post("http://127.0.0.1:8000/api/etudiant", student);
        setSuccessMessage("Les données ont été envoyées avec succès!");
        setErrorMessage(""); 
      }
      setActiveComponent("Table");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi des données.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="custom-table">
    
        {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
      <form onSubmit={handleSubmit}>
        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <div className="row">
          <div className="column">
            <label htmlFor="nom">Prénom :</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={student.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="prenom">Nom :</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={student.prenom}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="adresse_email">Email universitaire :</label>
            <input
              type="email"
              id="adresse_email"
              name="adresse_email"
              value={student.adresse_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="moyenne_m1">Moyenne :</label>
            <input
              type="number"
              step="0.01"
              id="moyenne_m1"
              name="moyenne_m1"
              value={student.moyenne_m1}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="intitule_option">Option :</label>
            <select
              id="intitule_option"
              name="intitule_option"
              value={student.intitule_option}
              onChange={handleChange}
              required
            >
              <option value="" disabled>-- Sélectionnez un grade --</option>
              <option value="1">IA</option>
              <option value="2">GL</option>
              <option value="3">SIC</option>
              <option value="4">RSD</option>
            </select>
          </div>
        </div>

        <button type="submit">Soumettre</button>
      </form>
    </div>
  );
};

export default FormEtud;
