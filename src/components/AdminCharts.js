import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './AdminCharts.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AdminCharts = () => {

  const userDistributionData = {
    labels: ['Étudiants', 'Enseignants', 'Entreprises'],
    datasets: [
      {
        label: 'Utilisateurs',
        data: [64, 25, 11],
        backgroundColor: ['#3A86FF', '#8bc34a', '#FFBE0B'],
        borderWidth: 1,
      },
    ],
  };

  const pfeTypeData = {
    labels: ['Classique', 'Innovant', 'Stage'],
    datasets: [
      {
        label: 'Types de PFE',
        data: [75, 15, 10],
        backgroundColor: ['#3A86FF', '#8bc34a', '#FFBE0B'],
        borderWidth: 1,
      },
    ],
  };

  const proposalStatusData = {
    labels: ['Validées', 'Refusées', 'En attente de modification'],
    datasets: [
      {
        label: 'Statut des propositions',
        data: [60, 25, 15],
        backgroundColor: ['#3A86FF', '#8bc34a', '#FFBE0B'],
        borderWidth: 1,
      },
    ],
  };

  const studentsAndPfeData = {
    labels: ['GL', 'IA', 'SIC', 'RSD'],
    datasets: [
      {
        label: 'Nombre d\'Étudiants',
        data: [80, 50, 60, 70],
        backgroundColor: '#4caf50',
        borderWidth: 1,
      },
      {
        label: 'PFE Proposés',
        data: [40, 30, 20, 35],
        backgroundColor: '#ff9800',
        borderWidth: 1,
      },
    ],
  };


  const stats = {
    totalUsers: 100,
    newSubmissions: 10,
    pendingProposals: 5,
  };


  const notifications = [
    { id: 1, message: 'Nouvelle proposition validée' },
    { id: 2, message: 'Un PFE a été soumis' },
    { id: 3, message: 'Nouvel étudiant inscrit' },
  ];


  const [searchQuery, setSearchQuery] = useState('');


  const filteredNotifications = notifications.filter((notif) =>
    notif.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
 

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Tableau de bord Administratif</h1>

        </div>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        <div className="stat-card">
          <h3>المستخدمون</h3>
          <p>100</p>
        </div>
        <div className="stat-card">
          <h3>المشاريع</h3>
          <p>50</p>
        </div>
        <div className="stat-card">
          <h3>نسبة الإنجاز</h3>
          <p>85%</p>
        </div>
        <div className="stat-card">
          <h3>الاقتراحات المقبولة</h3>
          <p>60</p>
        </div>
      </div>


      
<div className="aaaa">
  <div className="bbbb">
        {/* Charts */}
        <div className="charts-container">
          <div className="chart-item">
            <Pie data={userDistributionData} />
            <h3>Répartition des utilisateurs par type</h3>
          </div>
          <div className="chart-item">
            <Pie data={pfeTypeData} />
            <h3>Répartition des PFE soumis par type</h3>
          </div>
          <div className="chart-item">
            <Pie data={proposalStatusData} />
            <h3>Statut des propositions</h3>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-item1">
          <Bar data={studentsAndPfeData} />
          <h3>Nombre d'étudiants et PFE par option</h3>
        </div>
        </div>
        
          {/* Recent Activities Section */}
      <div className="recent-activities">
        <h3>الأنشطة الحديثة</h3>
        <ul>
          <li>انضم <strong>محمد</strong> كمستخدم جديد.</li>
          <li>تم إضافة مشروع جديد: <strong>تطبيق لإدارة المهام</strong>.</li>
          <li>تمت الموافقة على اقتراح PFE: <strong>مشروع ذكاء اصطناعي</strong>.</li>
        </ul>
     
        </div>
        </div>
      </div>
        
      



  
    </div>
  );
};

export default AdminCharts;
