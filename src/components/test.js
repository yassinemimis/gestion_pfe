import React, { useState, useEffect } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  const styles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      border: "1px solid #ddd",
      padding: "8px",
      backgroundColor: "#f4f4f4",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
    },
    evenRow: {
      backgroundColor: "#f9f9f9",
    },
    oddRow: {
      backgroundColor: "#fff",
    },
    selectButton: {
      padding: "5px 10px",
      marginRight: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
    viewButton: {
      padding: "5px 10px",
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      borderRadius: "3px",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/teachers");
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

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id_utilisateur !== id));
  };

  const filteredData = data.filter((item) =>
    item.nom?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {message && (
        <div style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </div>
      )}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nom</th>
            <th style={styles.th}>Prenom</th>
            <th style={styles.th}>Type Utilisateur</th>
            <th style={styles.th}>Email</th>
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
                <td style={styles.td}>
                  <button style={styles.selectButton}>Edit</button>
                  <button
                    style={styles.viewButton}
                    onClick={() => handleDelete(row.id_utilisateur)}
                  >
                    Delete
                  </button>
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
  );
};

export default Table;
