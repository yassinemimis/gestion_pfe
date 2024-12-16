import React, { useState } from "react";
import "./Table.css";

const data = [
    {
        noms: "Artificial Intelligence Project",
        prenoms: "A project",
        emails: "A project",
        date_de_recrutement: "example@email.com",
        grades: "15/APR/2020",
    },
    {
        noms: "Artificial Intelligence Project",
        prenoms: "A project",
        emails: "A project",
        date_de_recrutement: "example@email.com",
        grades: "15/APR/2020",
    },

];

const TableEnsg = () => {
    const [search, setSearch] = useState("");


    const filteredData = data.filter((item) =>
        item.grades.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "0%", width: "100%" }}>
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
                        onClick={() => alert("Filter Applied!")}
                    >
                        Filter
                    </button>
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
                    onClick={() => alert("Add New Project!")}
                >
                    Add New Project
                </button>
            </div>

            {}
            <div
                style={{
                    maxHeight: "70vh", 
                    overflowY: "auto", 
                    border: "1px solid #ddd", 
                    borderRadius: "5px",
                }}
            >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={styles.th}>noms</th>
                            <th style={styles.th}>prenoms</th>
                            <th style={styles.th}>les emails</th>
                            <th style={styles.th}>date de recrutement</th>
                            <th style={styles.th}>grades</th>
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
                                    <td style={styles.td}>{row.noms}</td>
                                    <td style={styles.td}>{row.prenoms}</td>
                                    <td style={styles.td}>
                                        {row.emails}
                                    </td>
                                    <td style={styles.td}>
                                        {row.date_de_recrutement}
                                    </td>
                                    <td style={styles.td}>
                                        {row.grades}
                                    </td>
                                    <td style={styles.td}>
                                        <button style={styles.selectButton}>Edit</button>
                                        <button style={styles.viewButton}>Delete</button>
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
