// import React, { useState, useEffect } from "react";

// const Table = () => {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [message, setMessage] = useState(null);

//   const styles = {
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     th: {
//       border: "1px solid #ddd",
//       padding: "8px",
//       backgroundColor: "#f4f4f4",
//     },
//     td: {
//       border: "1px solid #ddd",
//       padding: "8px",
//     },
//     evenRow: {
//       backgroundColor: "#f9f9f9",
//     },
//     oddRow: {
//       backgroundColor: "#fff",
//     },
//     selectButton: {
//       padding: "5px 10px",
//       marginRight: "5px",
//       backgroundColor: "#4CAF50",
//       color: "white",
//       border: "none",
//       borderRadius: "3px",
//       cursor: "pointer",
//     },
//     viewButton: {
//       padding: "5px 10px",
//       backgroundColor: "#f44336",
//       color: "white",
//       border: "none",
//       borderRadius: "3px",
//       cursor: "pointer",
//     },
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/etudiant");
//         if (response.ok) {
//           const fetchedData = await response.json();
//           console.log("Fetched Data:", fetchedData);
//           setData(fetchedData); 
//         } else {
//           setMessage({
//             text: "Erreur lors de la récupération des données.",
//             type: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setMessage({
//           text: "Une erreur s'est produite. Veuillez réessayer.",
//           type: "error",
//         });
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = (id) => {
//     setData((prevData) => prevData.filter((item) => item.id_utilisateur !== id));
//   };

//   const filteredData = data.filter((item) =>
//     item.nom?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       {message && (
//         <div style={{ color: message.type === "error" ? "red" : "green" }}>
//           {message.text}
//         </div>
//       )}
//       <input
//         type="text"
//         placeholder="Search by name"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
//       />
//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Nom</th>
//             <th style={styles.th}>Prenom</th>
//             <th style={styles.th}>Type Utilisateur</th>
//             <th style={styles.th}>Email</th>
//             <th style={styles.th}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((row, index) => (
//               <tr
//                 key={index}
//                 style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
//               >
//                 <td style={styles.td}>{row.nom || "N/A"}</td>
//                 <td style={styles.td}>{row.prenom || "N/A"}</td>
//                 <td style={styles.td}>{row.type_utilisateur || "N/A"}</td>
//                 <td style={styles.td}>{row.adresse_email || "N/A"}</td>
//                 <td style={styles.td}>
//                   <button style={styles.selectButton}>Edit</button>
//                   <button
//                     style={styles.viewButton}
//                     onClick={() => handleDelete(row.id_utilisateur)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan="5"
//                 style={{
//                   textAlign: "center",
//                   padding: "2%",
//                   color: "#777",
//                 }}
//               >
//                 No data available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/enattente1")
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

export default ProjectList;
