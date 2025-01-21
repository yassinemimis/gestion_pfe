import React, { useState } from "react";
import axios from "axios";
import "./FormEtud.css"; 


const FormEnsg = ({ data, setActiveComponent }) => {
  console.log(data.id_ens+'ff');
  const [student, setStudent] = useState({
    nom: data.nom || "",
    prenom: data.prenom || "",
    adresse_email: data.adresse_email || "",
    date_recrutement: data.date_recrutement || "",
    grade_ens: data.grade_ens || "",
    id_utilisateur: data.id_utilisateur || "",
    password: "password",
    type_utilisateur: "enseignant",
    est_responsable: data.est_responsable ||"",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log(name + value + ' fffffffff');
  
 
    if (value === 'true') {
      value = 1;
    } else if (value === 'false') {
      value = 0;
    }
  
    console.log(name + value + ' wwwwwwwwwwwwwwwww');
    setStudent({ ...student, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student, 't');
    console.log(student, 't');
    try {
      if(data.id_utilisateur){
        await axios.put(`http://127.0.0.1:8000/api/enseignants/${data.id_ens}`, student, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    else {

      await axios.post("http://127.0.0.1:8000/api/enseignants", student);
      setSuccessMessage("Les données ont été envoyées avec succès!");
      setErrorMessage(""); 
    }
      
      setActiveComponent(student); 
    } catch (error) {
      console.error("Error updating data:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="custom-table">
    <form onSubmit={handleSubmit}>
      {/* Ligne 1 */}
      <div className="row">
        <div className="column">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            id="firstName"
            name="nom"
            value={student.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="column">
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            id="lastName"
            name="prenom"
            value={student.prenom}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Ligne 2 */}
      <div className="row">
        <div className="column">
          <label htmlFor="email">Email universitaire :</label>
          <input
            type="email"
            id="email"
            name="adresse_email"
            value={student.adresse_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="column">
          <label htmlFor="average">date de recrutement :</label>
          <input
            type="date"
            step="0.01"
            id="average"
            name="date_recrutement"
            value={student.date_recrutement}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Ligne 3 */}
      <div className="row">
      <div className="column">
  <label htmlFor="grades">Grades :</label>
  <select
    id="grades"
    name="grade_ens"
    value={student.grade_ens}
    onChange={handleChange}
    required
  >
    <option value="" disabled>-- Sélectionnez un grade --</option>
    <option value="A">A</option>
    <option value="B">B</option>
    <option value="C">C</option>
  </select>
</div>


        <div className="column">
        <label htmlFor="grades">Grades :</label>
  <select
    id="grades"
    name="est_responsable"
    value={student.est_responsable}
    onChange={handleChange}
    required
  >
    <option value="" disabled>-- Sélectionnez un grade --</option>
    <option value="true">Oui</option>
    <option value="false">Non</option>
  </select>
  </div> {/* Colonne vide pour équilibrer */}
      </div>

      {/* Bouton de soumission */}
      <button type="submit">Soumettre</button>
    </form>
    </div>
  );
};

export default FormEnsg;
