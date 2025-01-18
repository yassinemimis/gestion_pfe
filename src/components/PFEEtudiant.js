import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PFEEtudiant = () => {
  const idetud = localStorage.getItem('idetud');
  const [formData, setFormData] = useState({
    nomEncadrant: '',
    prenomEncadrant: '',
    affectation1: idetud,
    affectation2: '', 
    intitule_option: '',
    type_pf: '',
    titre_theme: '',
    description: '',
    technologies_utilisees: '',
    besoins_materiel: '',
    depse: 'Etudiant',
  });
  const [coEncadrants, setCoEncadrants] = useState([]); 
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [enableSuggestions, setEnableSuggestions] = useState(true);

  const handleInputChange = async (e) => {
      const value = e.target.value;
      setQuery(value);

      if (value.length > 1) { 
          try {
              const response = await axios.get(`http://127.0.0.1:8000/api/co-etudiant?query=${value}`);
              setSuggestions(response.data);
          } catch (error) {
              console.error('Error fetching suggestions:', error);
          }
      } else {
          setSuggestions([]);
      }
  };

  
  const handleSelectItem = (item) => {
      setSelectedItem(item); 
      setQuery(`${item.nom} ${item.prenom}`);
      console.log(item.intitule_option);
      formData.intitule_option=`${item.intitule_option}`;
      formData.affectation2=`${item.id}`;
     
      setSuggestions([]);
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);


    fetch('http://127.0.0.1:8000/api/themes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Formulaire soumis avec succès !');
        } else {
          alert('Une erreur s\'est produite.');
        }
      })
      .catch((error) => console.error('Error submitting form:', error));
  };

  return (
    <div><h2>propositions un formulaire</h2>
    <form onSubmit={handleSubmit}>
      
      <div>
       <div style={{ marginTop: "10px", display: "flex", alignItems: "center" }}>
                <label htmlFor="toggleSwitch" style={{ marginRight: "10px" }}>Ajouter un binôme</label>
                <div
                    onClick={() => setEnableSuggestions(!enableSuggestions)}
                    style={{
                        width: "50px",
                        height: "25px",
                        borderRadius: "50px",
                        backgroundColor: enableSuggestions ? "#4CAF50" : "#ccc",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                    }}
                >
                    <div
                        style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                            position: "absolute",
                            top: "2.5px",
                            left: enableSuggestions ? "28px" : "2px",
                            transition: "left 0.3s ease",
                        }}
                    ></div>
                </div>
            </div>

            <label htmlFor="co_encadrant">binôme</label>
            <input
                id="co_encadrant"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="binôme"
                disabled={!enableSuggestions} 
                style={{
                    width: "100%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />

            {}
           

            {}
            {enableSuggestions && suggestions.length > 0 && (
                <ul style={{ border: "1px solid #ccc", listStyle: "none", padding: 0, maxHeight: "200px", overflowY: "auto", marginTop: "10px" }}>
                    {suggestions.map((item) => (
                        <li
                            key={item.id_ens}
                            onClick={() => handleSelectItem(item)}
                            style={{ padding: "10px", cursor: "pointer", background: "#f9f9f9", marginBottom: "2px" }}
                            onMouseOver={(e) => (e.target.style.background = "#e9e9e9")}
                            onMouseOut={(e) => (e.target.style.background = "#f9f9f9")}
                        >
                            {item.nom} {item.prenom} - {item.grade_ens}
                        </li>
                    ))}
                </ul>
            )}

       
        </div>


      <div>
        <label>Type Sujet:</label>
        <select
          name="type_pf"
          value={formData.type_pf}
          onChange={handleChange}
        >
          <option value="">-- Choisir un Type --</option>
          <option value="classique">Classique</option>
          <option value="innovant">Innovant</option>
        </select>
      </div>
      <div>
        <label>Intitulé du PFE:</label>
        <input
          type="text"
          name="titre_theme"
          value={formData.titre_theme}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Résumé:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Technologies utilisées:</label>
        <textarea
          name="technologies_utilisees"
          value={formData.technologies_utilisees}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Besoins Matériel:</label>
        <textarea
          name="besoins_materiel"
          value={formData.besoins_materiel}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Soumettre</button>
    </form></div>
  );
};

export default PFEEtudiant;
