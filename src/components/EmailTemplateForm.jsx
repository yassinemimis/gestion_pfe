import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './email-template-manager.css';

const EmailTemplateForm = ({ currentTemplate, onSave }) => {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: currentTemplate || { name: '', subject: '', content: '', send_date: '', reminder_date: '', recipient: 'etudiant' },
    });

    const content = watch('content'); // Utilisé pour lier ReactQuill au formulaire

    // Mettre à jour le contenu de ReactQuill
    const handleContentChange = (value) => setValue('content', value);

    // Lorsqu'un template existant est chargé, mettre à jour les valeurs
    useEffect(() => {
        if (currentTemplate) {
            setValue('name', currentTemplate.name);
            setValue('subject', currentTemplate.subject);
            setValue('content', currentTemplate.content);
            setValue('send_date', currentTemplate.send_date);
            setValue('reminder_date', currentTemplate.reminder_date);
            setValue('recipient', currentTemplate.recipient);
        }
    }, [currentTemplate, setValue]);

    const onSubmit = async (data) => {
        console.log(data);
        try {
            if (currentTemplate?.id) {
                // Modifier un template existant
                await axios.put(`http://127.0.0.1:8000/api/email-templates/${currentTemplate.id}`, data);
                toast.success('Template modifié avec succès !');
            } else {
                // Ajouter un nouveau template
                await axios.post('http://127.0.0.1:8000/api/email-templates', data);
                toast.success('Template ajouté avec succès !');
            }
            onSave(); // Callback pour rafraîchir la liste
        } catch (error) {
            toast.error('Erreur lors de l’enregistrement du template.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="email-form">
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
                    <select {...register('recipient')}>
                        <option value="etudiant">Étudiants</option>
                        <option value="entreprises">Entreprises</option>
                        <option value="enseignant">Enseignants</option>
                        <option value="enseignant1">Enseignants n’ayants pas soumis les PFE</option>
                        <option value="etudiant1">Étudiants n’ayants pas soumis les PFE</option>
                        <option value="entreprise1">Entreprises n’ayants pas soumis les PFE</option>
                    </select>
                </div>
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

            <div className='Contenu'>
                <label>Contenu :</label>
                <ReactQuill value={content} onChange={handleContentChange} />
            </div>

            <button type="submit">{currentTemplate?.id ? 'Modifier' : 'Ajouter'}</button>
        </form>
    );
};

export default EmailTemplateForm;
