// EmailTemplateList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './email-template-manager.css';

const EmailTemplateList = ({ onEdit }) => {
  const [templates, setTemplates] = useState([]);

  // Charger les templates au chargement
  useEffect(() => {
    fetchTemplates();
    console.log(templates);
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/email-templates'); // URL de l'API
      setTemplates(response.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des templates !");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce template ?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/email-templates/${id}`);
        toast.success('Template supprimé avec succès !');
        fetchTemplates();
      } catch (error) {
        toast.error('Erreur lors de la suppression du template.');
      }
    }
  };

  return (
    <div>
      <h2>Liste des Templates d'Emails</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Sujet</th>
            <th>Destinataire</th>
            <th>Date d'envoi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.subject}</td>
              <td>{template.recipient }</td>
              <td>{template.send_date }</td>
              <td>
                <button onClick={() => onEdit(template)}>Modifier</button>
                <button onClick={() => handleDelete(template.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailTemplateList;
