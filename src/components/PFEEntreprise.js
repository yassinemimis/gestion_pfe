import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PFEEntreprise = () => {
  const [formData, setFormData] = useState({
    intitule_option: '',
    type_pf: 'Entreprise',
    titre_theme: '',
    description: '',
    technologies_utilisees: '',
    besoins_materiel: '',
    depse: 'Entreprise',
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
        <label>Option:</label>
        <select
          name="intitule_option"
          value={formData.intitule_option}
          onChange={handleChange}
        >
          <option value="">-- Choisir une Option --</option>
          <option value="1">GL</option>
          <option value="2">IA</option>
          <option value="3">RSD</option>
          <option value="4">SIC</option>
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

export default PFEEntreprise;
