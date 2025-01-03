import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './AdminCharts.css';
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminCharts = () => {
  // Données pour le graphique "Répartition des utilisateurs par type"
  const userDistributionData = {
    labels: ['Étudiants', 'Enseignants', 'Entreprises'],
    datasets: [
      {
        label: 'Utilisateurs',
        data: [64, 25, 11], // Proportions en pourcentage
        backgroundColor: ['#4caf50', '#ff9800', '#2196f3'], // Couleurs
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique "Répartition des PFE soumis par type"
  const pfeTypeData = {
    labels: ['Classique', 'Innovant', 'Stage'],
    datasets: [
      {
        label: 'Types de PFE',
        data: [75, 15, 10],
        backgroundColor: ['#3f51b5', '#e91e63', '#009688'],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique "Statut des propositions"
  const proposalStatusData = {
    labels: ['Validées', 'Refusées', 'En attente de modification'],
    datasets: [
      {
        label: 'Statut des propositions',
        data: [60, 25, 15],
        backgroundColor: ['#8bc34a', '#f44336', '#ffc107'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Graphiques</h2>
      <div className="charts-container">
        <div className="chart-item">
          <h3>Répartition des utilisateurs par type</h3>
          <Pie data={userDistributionData} options={{ responsive: true, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%` } } } }} />
        </div>
        <div className="chart-item">
          <h3>Répartition des PFE soumis par type</h3>
          <Pie data={pfeTypeData} options={{ responsive: true, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%` } } } }} />
        </div>
        <div className="chart-item">
          <h3>Statut des propositions</h3>
          <Pie data={proposalStatusData} options={{ responsive: true, plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%` } } } }} />
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
