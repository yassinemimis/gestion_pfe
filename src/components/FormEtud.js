import React, { useState } from "react";
import "./FormEtud.css"; // Importation du CSS

const FormEtud = ({ onSubmit, initialData = {} }) => {
  const [student, setStudent] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    email: initialData.email || "",
    average: initialData.average || "",
    option: initialData.option || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(student);
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
          <label htmlFor="email">Email universitaire :</label>
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
          <label htmlFor="average">Moyenne :</label>
          <input
            type="number"
            step="0.01"
            id="average"
            name="average"
            value={student.average}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Ligne 3 */}
      <div className="row">
        <div className="column">
          <label htmlFor="option">Option :</label>
          <input
            type="text"
            id="option"
            name="option"
            value={student.option}
            onChange={handleChange}
            required
          />
        </div>

        <div className="column"></div> {/* Colonne vide pour équilibrer */}
      </div>

      {/* Bouton de soumission */}
      <button type="submit">Soumettre</button>
    </form>
    </div>
  );
};

export default FormEtud;
