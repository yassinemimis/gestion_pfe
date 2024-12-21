// EmailTemplateForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EmailTemplateForm = ({ currentTemplate, onSave }) => {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: currentTemplate || { name: '', subject: '', content: '' },
    });

    const content = watch('content'); // Utilisé pour lier ReactQuill au formulaire

    // Mettre à jour le contenu de ReactQuill
    const handleContentChange = (value) => setValue('content', value);

    const onSubmit = async (data) => {
        try {
            if (currentTemplate?.id) {
                // Modifier un template existant
                await axios.put(`http://127.0.0.1:8000/api/email-templates/${currentTemplate.id}`, data);
                toast.success('Template modifié avec succès !');
            } else {
                // Ajouter un nouveau template
                console.log(data);
                await axios.post('http://127.0.0.1:8000/api/email-templates', data);
                toast.success('Template ajouté avec succès !');
            }
            onSave(); // Callback pour rafraîchir la liste
        } catch (error) {
            toast.error('Erreur lors de l’enregistrement du template.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>{currentTemplate?.id ? 'Modifier' : 'Ajouter'} un Template</h2>
            <div className='row'>

                <div className='column'>
                    <label>Date d'Envoi Automatique :</label>
                    <input
                        type="datetime-local"
                        {...register('send_date', { required: true })}
                    />
                </div>
                <div className='column'>
                    <label>Date de Relance :</label>
                    <input
                        type="datetime-local"
                        {...register('reminder_date', { required: true })}
                    />
                    </div>
            </div>
            <div className='row'>
            <div className='column'>
                <label>Destinataire :</label>
                <select {...register('recipient')} defaultValue="Étudiants">
                    <option value="Étudiants">Étudiants</option>
                    <option value="Entreprises">Entreprises</option>
                    <option value="Enseignants">Enseignants</option>
                </select>
            </div>
            <div className='column'></div>
            </div>
            <div className='row'>
            <div className='column'>
                <label>Nom du Template :</label>
                <input {...register('name', { required: true })} />
            </div>
                <div className='column'>
                <label>Sujet :</label>
                <input {...register('subject', { required: true })} />
                </div>
            </div>
            
           
            <div>
                <label>Contenu :</label>
                <ReactQuill value={content} onChange={handleContentChange} />
            </div>
            
            <button type="submit">{currentTemplate?.id ? 'Modifier' : 'Ajouter'}</button>
        </form>
    );
};

export default EmailTemplateForm;
