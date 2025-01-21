import React, { useState } from "react";
import "./FormEtud.css"; // Importation du CSS
import axios from "axios";
const FormComp = ({ data, setActiveComponent }) => {
  console.log(data.id_entreprise+'ff');
  const [student, setStudent] = useState({
    nom: data.nom || "",
    prenom: data.prenom || "",
    adresse_email: data.adresse_email || "",
    password: "password",
    type_utilisateur: "entreprise",
    denomination_entreprise: data.denomination_entreprise|| "",
    id_utilisateur: data.id_utilisateur || "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    
    const [message, setMessage] = useState({ text: "", type: "" }); 


    const handleChange = (e) => {
        let { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(student, 't');
        console.log(student, 't');
        try {
            if(data.id_utilisateur){
          const response = await axios.put(`http://127.0.0.1:8000/api/entreprise/${data.id_entreprise}`, student, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
          else {
    
            await axios.post("http://127.0.0.1:8000/api/entreprise", student);
            setSuccessMessage("Les données ont été envoyées avec succès!");
            setErrorMessage(""); 
          }
        setMessage({ text: "Action réussie ! L'étudiant a été ajouté.", type: "success" });
  
      
      
          setActiveComponent(student); 
        } catch (error) {
          console.error("Error updating data:", error.response ? error.response.data : error.message);
          setMessage({ text: "Une erreur s'est produite. Veuillez réessayer.", type: "error" });
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
                    <label htmlFor="email">Email :</label>
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
                    <label htmlFor="option">la dénomination de l’entreprise :</label>
                    <input
                        type="text"
                        id="option"
                        name="denomination_entreprise"
                        value={student.denomination_entreprise}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

    

            {/* Bouton de soumission */}
            <button type="submit" >Soumettre</button>
        </form>
        </div>
    );
};

export default FormComp;
