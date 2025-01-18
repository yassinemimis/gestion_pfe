import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ValideEtud() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/enattente")
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        alert("Une erreur s'est produite lors de la récupération des projets !");
        setLoading(false);
      });
  }, []);

  const handleUpdate = (id, status) => {
   
      axios
        .put(`http://127.0.0.1:8000/api/themes1/${id}`, { status })
        .then((response) => {
          alert(response.data.message);
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.id_theme === id ? { ...project, status } : project
            )
          );
        })
        .catch((error) => {
          console.error("Error updating project:", error);
          alert("Une erreur s'est produite lors de la mise à jour du projet !");
        });
    
  };
  
  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <h1 className="text-center mb-4">Liste des projets</h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Chargement...</span>
          </div>
          <p>Chargement...</p>
        </div>
      ) : projects.length > 0 ? (
        <table className="table table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>titre</th>
              <th>type</th>
              <th>description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id_theme}>
                <td>{project.titre_theme}</td>
                <td>{project.type_pf}</td>
                <td className="text-start">
                  {expanded[project.id_theme]
                    ? project.description
                    : project.description.slice(0, 50) + (project.description.length > 50 ? "..." : "")}
                  {project.description.length > 50 && (
                    <button
                      className="btn btn-link p-0 ms-2"
                      onClick={() => toggleDescription(project.id_theme)}
                    >
                      {expanded[project.id_theme] ? "Cacher" : "En savoir plus"}
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm mx-1"
                    onClick={() => handleUpdate(project.id_theme, "accepted")}
                  >
                    acceptation
                  </button>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleUpdate(project.id_theme, "rejected")}
                  >
                    rejeter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">
          <p>Il n'y a aucun projet actuellement.</p>
        </div>
      )}
    </div>
  );

}

export default ValideEtud;
