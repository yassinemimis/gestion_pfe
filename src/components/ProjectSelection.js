import React, { useState, useEffect } from "react";
import styles from "./ProjectSelection.module.css"; 
import axios from "axios";
const ProjectSelection = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [encadrant, setEncadrant] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/encadrant"); 
        setProjects(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSelectionChange = (projectId) => {
    console.log(projectId);
    setSelectedProjects((prevSelected) =>
      prevSelected.includes(projectId)
        ? prevSelected.filter((id) => id !== projectId)
        : [...prevSelected, projectId]
    );
  };

  const handleEncadrantChange = (e) => {
    setEncadrant(e.target.value); 
  };

  const handleSubmit = async () => {
  
    const assignments = selectedProjects.map((projectId) => ({
        id_theme: projectId,
      encadrant_president: 2,
    }));

    try {

      const response = await fetch("http://127.0.0.1:8000/api/assign-multiple-projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assignments }),
      });

      if (response.ok) {
        const data = await response.json();
    
        console.log(data);
      } else {
        throw new Error("Échec de l'envoi des données");
      }
    } catch (error) {
      console.error(error);
      alert("Échec de l'envoi des données");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sélectionner les projets à encadrer</h1>
      {projects.length === 0 ? (
        <p className={styles.message}>Aucun projet disponible pour le moment.</p>
      ) : (
        <table className={styles.projectTable}>
          <thead>
            <tr>
              <th>Sélectionner</th>
              <th>Titre du Projet</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <input
                    type="checkbox"
                    value={project.id}
                    checked={selectedProjects.includes(project.id_theme)}
                    onChange={() => handleSelectionChange(project.id_theme)}
                  />
                </td>
                <td>{project.title}</td>
                <td>{project.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={selectedProjects.length === 0}
      >
        Soumettre la sélection
      </button>
    </div>
  );
};

export default ProjectSelection;
