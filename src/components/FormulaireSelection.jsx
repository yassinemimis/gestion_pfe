import React, { useState, useEffect } from "react";
import axios from 'axios';
const FormulaireSelection = () => {
  // حالة المشاريع
  const [projects, setProjects] = useState([]); // قائمة المشاريع
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [selectedProject, setSelectedProject] = useState(""); // المشروع المختار
  const [error, setError] = useState(""); // الأخطاء
  const idetud = localStorage.getItem('id_etud');
  const intitule_option =localStorage.getItem('intitule_option');
  const [formData, setFormData] = useState({
    "id_etu": idetud,
    "id_etu2": 3,
    "id_theme": 5
}
);
  const [coEncadrants, setCoEncadrants] = useState([]); 
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [enableSuggestions, setEnableSuggestions] = useState(true);
  // جلب البيانات من API
  useEffect(() => {
    console.log(intitule_option);
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ intitule_option: intitule_option }), // تمرير الخيار كـ JSON
        });
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des projets.");
        }
        const data = await response.json();
        setProjects(data); // تخزين قائمة المشاريع في الحالة
        console.log(data); // التحقق من البيانات
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // إيقاف حالة التحميل
      }
    };

    fetchProjects();
  }, []);


  const handleProjectSelect = (e) => {
    setSelectedProject(e.target.value);
    console.log("kjkj"+e.target.value);
    formData.id_theme=e.target.value;
  };


  const truncateDescription = (description, maxLength) => {
    if (description && description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };
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
    console.log(item.id+'ggggg');
    formData.intitule_option=`${item.intitule_option}`;
    formData.id_etu2=`${item.id}`;
   
    setSuggestions([]);
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form Data:', formData);

  
  fetch('http://127.0.0.1:8000/api/choix', {
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
    <div>
      <h2>Choisir un Projet</h2>

      {/* عرض حالة التحميل */}
      {loading && <p>Chargement des projets...</p>}

      {/* عرض خطأ في حالة فشل التحميل */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* عرض القائمة عند انتهاء التحميل */}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="projectSelect">Sélectionnez un projet:</label>
          <select
            id="projectSelect"
            value={selectedProject}
            onChange={handleProjectSelect}
            required
          >
            <option value="" disabled>
              -- Choisissez un projet --
            </option>
            {projects.length > 0 ? (
              projects.map((project) => (
                <option key={project.id_theme} value={project.id_theme}>
                  {project.titre_theme || "Titre non disponible"}
                </option>
              ))
            ) : (
              <option disabled>Aucun projet disponible</option>
            )}
          </select>

          {/* إظهار تفاصيل المشروع المحدد */}
          {selectedProject && (
            <div>
           
              <p> <strong>Titre:</strong>
                {projects.find((p) => p.id_theme === parseInt(selectedProject))?.titre_theme || "Titre non disponible"}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {truncateDescription(
                  projects.find((p) => p.id_theme === parseInt(selectedProject))?.description
                )}
              </p>
              <p> <strong>Type:</strong>
                {projects.find((p) => p.id_theme === parseInt(selectedProject))?.type_pf || "Titre non disponible"}
              </p>
            </div>
          )}
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
                    marginBottom : "20px",
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

        <button type="submit">Soumettre</button>
   
        </form>
      )}
    </div>
  );
};

export default FormulaireSelection;
