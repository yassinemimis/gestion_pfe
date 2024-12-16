import React, { useState } from "react";
import "./FormEtud.css"; // Importation du CSS

const FormComp = ({ onSubmit, initialData = {} }) => {
    const [student, setStudent] = useState({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        lentreprise: initialData.lentreprise || "",
    });

    
    const [message, setMessage] = useState({ text: "", type: "" }); 


    const handleChange = (e) => {
      setStudent({ ...student, [e.target.name]: e.target.value });
    };
  

    const handleSubmit = (e) => {
      e.preventDefault();
     
      const isSuccess = false;
  
      if (isSuccess) {
        setMessage({ text: "Action réussie ! L'étudiant a été ajouté.", type: "success" });
      } else {
        setMessage({ text: "Une erreur s'est produite. Veuillez réessayer.", type: "error" });
      }
  
     
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
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
                        name="firstName"
                        value={student.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="column">
                    <label htmlFor="lastName">Nom :</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={student.lastName}
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
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="column">
                    <label htmlFor="option">la dénomination de l’entreprise :</label>
                    <input
                        type="text"
                        id="option"
                        name="option"
                        value={student.option}
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
