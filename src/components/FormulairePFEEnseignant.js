import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FormulairePFEEnseignant = () => {
  const [formData, setFormData] = useState({
    nomEncadrant: '',
    prenomEncadrant: '',
    co_encadrant: '', // نختار المشرف المساعد من القائمة
    intitule_option: '',
    type_pf: '',
    titre_theme: '',
    description: '',
    technologies_utilisees: '',
    besoins_materiel: '',
    depse: 'Enseignant',
  });

  const [coEncadrants, setCoEncadrants] = useState([]); // قائمة المشرفين المساعدين
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // لحفظ العنصر المختار

  // استدعاء API عند الكتابة
  const handleInputChange = async (e) => {
      const value = e.target.value;
      setQuery(value);

      if (value.length > 1) { // البحث عند كتابة حرفين أو أكثر
          try {
              const response = await axios.get(`http://127.0.0.1:8000/api/co-encadrants?query=${value}`);
              setSuggestions(response.data);
          } catch (error) {
              console.error('Error fetching suggestions:', error);
          }
      } else {
          setSuggestions([]);
      }
  };

  // تحديد العنصر من القائمة
  const handleSelectItem = (item) => {
      setSelectedItem(item); // حفظ العنصر المختار
      setQuery(`${item.nom} ${item.prenom}`);
      console.log(item.id_ens);
      formData.co_encadrant=`${item.id_ens}`;// تحديث حقل الإدخال بالنص
      setSuggestions([]); // إخفاء القائمة
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // إرسال البيانات إلى السيرفر
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
    <form onSubmit={handleSubmit}>
      
      <div>
            <label htmlFor="co_encadrant">Co_encadrant</label>
            <input
                id="co_encadrant"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="co_encadrant"
            />

            {/* قائمة الاقتراحات */}
            {suggestions.length > 0 && (
                <ul style={{ border: '1px solid #ccc', listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                    {suggestions.map((item) => (
                        <li
                            key={item.id_ens}
                            onClick={() => handleSelectItem(item)}
                            style={{ padding: '10px', cursor: 'pointer', background: '#f9f9f9', marginBottom: '2px' }}
                            onMouseOver={(e) => e.target.style.background = '#e9e9e9'}
                            onMouseOut={(e) => e.target.style.background = '#f9f9f9'}
                        >
                            {item.nom} {item.prenom} - {item.grade_ens}
                        </li>
                    ))}
                </ul>
            )}

            {/* عرض العنصر المختار */}
           
        </div>
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
    </form>
  );
};

export default FormulairePFEEnseignant;
