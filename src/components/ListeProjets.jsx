import React, { useEffect, useState } from 'react';

const ListeProjets = () => {
    const [projets, setProjets] = useState([]);

    useEffect(() => {
        fetch('/api/projets') // API pour récupérer les projets
            .then(response => response.json())
            .then(data => setProjets(data));
    }, []);

    return (
        <div>
            <h1>Liste des Projets PFE</h1>
            <ul>
                {projets.map(projet => (
                    <li key={projet.id}>
                        <h3>{projet.titre}</h3>
                        <p>{projet.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListeProjets;
