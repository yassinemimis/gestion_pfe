// EmailTemplateManager.jsx
import React, { useState } from 'react';
import EmailTemplateList from './EmailTemplateList';
import EmailTemplateForm from './EmailTemplateForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './email-template-manager.css';

const EmailTemplateManager = () => {
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (template) => {
    setCurrentTemplate(template);
  };

  const handleSave = () => {
    setCurrentTemplate(null); // Réinitialiser le formulaire
    setRefresh(!refresh); // Forcer le rafraîchissement
  };

  return (
    <div>
      <ToastContainer />
      <EmailTemplateList onEdit={handleEdit} key={refresh} />
      <EmailTemplateForm
        currentTemplate={currentTemplate}
        onSave={handleSave}
      />
    </div>
  );
};

export default EmailTemplateManager;
// import React, { useState } from "react";
// import "./email-template-manager.css";

// const EmailTemplateManager = () => {
//   const [templates, setTemplates] = useState([]);
//   const [newTemplate, setNewTemplate] = useState({
//     name: "",
//     subject: "",
//     body: "",
//     recipient: "Étudiants", // Par défaut, destinataire : Étudiants
//     sendDate: "",
//     reminderDate: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTemplate({ ...newTemplate, [name]: value });
//   };

//   const handleAddTemplate = (e) => {
//     e.preventDefault();
//     if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
//       alert("Veuillez remplir tous les champs.");
//       return;
//     }

//     setTemplates([...templates, newTemplate]);
//     setNewTemplate({
//       name: "",
//       subject: "",
//       body: "",
//       recipient: "Étudiants",
//       sendDate: "",
//       reminderDate: "",
//     });
//     alert("Template ajouté avec succès !");
//   };

//   const handleDeleteTemplate = (index) => {
//     const updatedTemplates = templates.filter((_, i) => i !== index);
//     setTemplates(updatedTemplates);
//   };

//   return (
//     <div className="email-template-manager">
//       <h2>Gestion des Templates d'Emails</h2>

//       {/* Formulaire */}
//       <form onSubmit={handleAddTemplate}>
//         <label>Nom du Template :</label>
//         <input
//           type="text"
//           name="name"
//           value={newTemplate.name}
//           onChange={handleInputChange}
//           placeholder="Nom du template"
//           required
//         />

//         <label>Sujet de l'Email :</label>
//         <input
//           type="text"
//           name="subject"
//           value={newTemplate.subject}
//           onChange={handleInputChange}
//           placeholder="Sujet de l'email"
//           required
//         />

//         <label>Corps de l'Email :</label>
//         <textarea
//           name="body"
//           value={newTemplate.body}
//           onChange={handleInputChange}
//           placeholder="Corps de l'email"
//           required
//         />

//         <label>Destinataire :</label>
//         <select
//           name="recipient"
//           value={newTemplate.recipient}
//           onChange={handleInputChange}
//         >
//           <option value="Étudiants">Étudiants</option>
//           <option value="Entreprises">Entreprises</option>
//           <option value="Enseignants">Enseignants</option>
//         </select>

//         <label>Date d'Envoi Automatique :</label>
//         <input
//           type="datetime-local"
//           name="sendDate"
//           value={newTemplate.sendDate}
//           onChange={handleInputChange}
//           required
//         />

//         <label>Date de Relance :</label>
//         <input
//           type="datetime-local"
//           name="reminderDate"
//           value={newTemplate.reminderDate}
//           onChange={handleInputChange}
//           required
//         />

//         <button type="submit">Ajouter Template</button>
//       </form>

//       {/* Liste des templates */}
//       <table>
//         <thead>
//           <tr>
//             <th>Nom</th>
//             <th>Sujet</th>
//             <th>Destinataire</th>
//             <th>Date d'Envoi</th>
//             <th>Date de Relance</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {templates.map((template, index) => (
//             <tr key={index}>
//               <td>{template.name}</td>
//               <td>{template.subject}</td>
//               <td>{template.recipient}</td>
//               <td>{template.sendDate}</td>
//               <td>{template.reminderDate}</td>
//               <td>
//                 <button onClick={() => handleDeleteTemplate(index)}>
//                   Supprimer
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EmailTemplateManager;
