import React, { useState,useEffect } from "react";
import axios from "axios";
const PropositionsEntrPage = () => {
    const ident = localStorage.getItem('ident');
  const [propositions, setPropositions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ titre_theme: "", description: "",type_pf:"",technologies_utilisees:"",besoins_materiel:"" });
useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/entreprise4?query=${ident}`);
          if (response.ok) {
            const fetchedData = await response.json();
            console.log("Fetched Data:", fetchedData);
            setPropositions(fetchedData); 
          } else {
            // setMessage({
            //   text: "Erreur lors de la récupération des données.",
            //   type: "error",
            // });
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        //   setMessage({
        //     text: "Une erreur s'est produite. Veuillez réessayer.",
        //     type: "error",
        //   });
        }
      };
  
      fetchData();
    }, []);
  const handleEdit = (id) => {
    const prop = propositions.find((p) => p.id_theme === id);
    setFormData(prop);
    setEditId(id);
  };

  const handleDelete =  async (id) => {
    console.log(id);
    try {
  
      const response = await fetch(`http://127.0.0.1:8000/api/themes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  

      if (response.ok) {
      
        setPropositions(propositions.filter((p) => p.id_theme !== id));
      
      } else {
       
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    try {
       console.log(formData);
        await axios.put(`http://127.0.0.1:8000/api/themes/${formData.id_theme}`, formData);
       
    } catch (error) {
      console.error("Error submitting form:", error);
     
    }
    setPropositions(
      propositions.map((p) =>
        p.id_theme === editId ? { ...p, ...formData } : p
      )
    );
    setEditId(null);
    setFormData({ title: "", description: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Voir Ma Proposition</h1>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            
            <th>Title</th>
            <th>Description</th>
            <th>type_pf</th>
            <th>technologies_utilisees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {propositions.map((prop) => (
              <tr key={prop.titre_theme}>
              
              <td>{prop.titre_theme}</td>
              <td>{prop.description}</td>
              <td>{prop.type_pf}</td>
              <td>{prop.technologies_utilisees}</td>
              
              <td>
                <button onClick={() => handleEdit(prop.id_theme)}>Edit</button>
                <button onClick={() => handleDelete(prop.id_theme)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editId !== null && (
        <div>
          <h2>Edit Proposition</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="titre_theme"
                value={formData.titre_theme}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label>type pfe:</label>
              <input
                type="text"
                name="type_pf"
                value={formData.type_pf}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>besoins materiel:</label>
              <textarea
                type="text"
                name="besoins_materiel"
                value={formData.besoins_materiel}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>technologies utilisees:</label>
              <textarea
                type="text"
                name="technologies_utilisees"
                value={formData.technologies_utilisees}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({ title: "", description: "" });
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropositionsEntrPage;
