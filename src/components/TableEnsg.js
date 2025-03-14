import React, { useState, useEffect } from "react";
import "./Table.css";



const TableEnsg = ({ onSwitchToForm1 }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
 
    const [message, setMessage] = useState({ text: "", type: "" }); 
    const handleSubmit = (e) => {
      e.preventDefault();

      const isSuccess = true; 
  
      if (isSuccess) {
        setMessage({ text: "Action réussie ! L'étudiant a été ajouté.", type: "success" });
      } else {
        setMessage({ text: "Une erreur s'est produite. Veuillez réessayer.", type: "error" });
      }
  
      
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3000);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/enseignants");
          if (response.ok) {
            const fetchedData = await response.json();
            console.log("Fetched Data:", fetchedData);
            setData(fetchedData); 
          } else {
            setMessage({
              text: "Erreur lors de la récupération des données.",
              type: "error",
            });
          }
        } catch (error) {
          console.error("Fetch Error:", error);
          setMessage({
            text: "Une erreur s'est produite. Veuillez réessayer.",
            type: "error",
          });
        }
      };
  
      fetchData();
    }, []);
  
    const handleDelete = async (id) => {
      console.log(id);
      try {
    
        const response = await fetch(`http://127.0.0.1:8000/api/enseignants/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
    

        if (response.ok) {
        
          setData((prevData) => prevData.filter((item) => item.id_utilisateur !== id));
        
        } else {
         
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      
      }
    };
    
    const handleEdit = (rowData) => {
      onSwitchToForm1(rowData);
    };
    const filteredData = data.filter((item) =>
      item.nom?.toLowerCase().includes(search.toLowerCase())
    );
  

  return (
    <div style={{ padding: "0%", width: "100%" }}>
      {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
      {}
      <div
        style={{
          marginBottom: "2%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap", 
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "2%", flex: "1" }}>
          <input
            type="text"
            placeholder="Filter by Supervisor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1",
              padding: "1%",
              fontSize: "1vw",
              border: "1px solid #ccc",
              borderRadius: "5px",
              minWidth: "200px",
            }}
          />
          
        </div>

        {}
        <button
          style={{
            padding: "1%",
            fontSize: "1vw",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            flexShrink: "0",
          }}
          onClick={onSwitchToForm1}
        >
          Add New Project
        </button>
      </div>

      {}
      <div
       
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>

          <thead>
            <tr>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Prenom</th>
            <th style={styles.th}>Type Utilisateur</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>date recrutement</th>
            <th style={styles.th}>grade</th>
            <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
              >
                <td style={styles.td}>{row.nom || "N/A"}</td>
                <td style={styles.td}>{row.prenom || "N/A"}</td>
                <td style={styles.td}>{row.type_utilisateur || "N/A"}</td>
                <td style={styles.td}>{row.adresse_email || "N/A"}</td>
                <td style={styles.td}>{row.date_recrutement || "N/A"}</td>
                <td style={styles.td}>{row.grade_ens || "N/A"}</td>
                <td style={styles.td}>
                  <button style={styles.selectButton}
                  onClick={() => handleEdit(row)}
                  >Edit</button>
                    <button
                    style={styles.viewButton}
                    onClick={() => handleDelete(row.id_utilisateur)}
                    >Delete</button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "2%",
                    color: "#777",
                  }}
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "1%",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
    fontSize: "1vw",
  },
  td: {
    border: "1px solid #ddd",
    padding: "1%",
    fontSize: "1vw",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  selectButton: {
    padding: "0.5vw",
    marginRight: "0.5vw",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9vw",
  },
  viewButton: {
    padding: "0.5vw",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9vw",
  },
  
  
};

export default TableEnsg;






