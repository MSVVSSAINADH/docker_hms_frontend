import React, { useState, useEffect } from 'react';
import styles from './DoctorDashboard.module.css';
import { FaUserMd, FaUsers, FaCalendarAlt, FaChartLine, FaClipboardList, FaStethoscope } from 'react-icons/fa';
import Card from '../../components/common/Card'; // A simple, reusable card component

const DoctorDashboard = () => {
  // Mock data for the dashboard (this would come from an API in a real app)
  const [dashboardData, setDashboardData] = useState({
    totalPatients: 150,
    upcomingAppointments: 7,
    prescriptionsManaged: 52,
  });

  const [upcomingPatients, setUpcomingPatients] = useState([
    { id: 1, name: 'John Doe', time: '10:00 AM', reason: 'Routine check-up' },
    { id: 2, name: 'Jane Smith', time: '11:30 AM', reason: 'Follow-up on recent labs' },
    { id: 3, name: 'Peter Jones', time: '02:00 PM', reason: 'New patient consultation' },
  ]);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}><FaStethoscope /> Doctor Dashboard</h1>
        <p className={styles.subtitle}>Overview of your daily schedule and patient statistics.</p>
      </header>
      <div className={styles.metricsGrid}>
        <Card>
          <div className={styles.metricContent}>
            <FaUsers className={styles.metricIcon} />
            <div className={styles.metricDetails}>
              <span className={styles.metricValue}>{dashboardData.totalPatients}</span>
              <p className={styles.metricLabel}>Total Patients</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.metricContent}>
            <FaCalendarAlt className={styles.metricIcon} />
            <div className={styles.metricDetails}>
              <span className={styles.metricValue}>{dashboardData.upcomingAppointments}</span>
              <p className={styles.metricLabel}>Appointments Today</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.metricContent}>
            <FaClipboardList className={styles.metricIcon} />
            <div className={styles.metricDetails}>
              <span className={styles.metricValue}>{dashboardData.prescriptionsManaged}</span>
              <p className={styles.metricLabel}>Prescriptions Managed</p>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.upcomingAppointmentsSection}>
        <h2 className={styles.sectionTitle}><FaCalendarAlt /> Upcoming Appointments</h2>
        <div className={styles.appointmentsList}>
          {upcomingPatients.length > 0 ? (
            upcomingPatients.map(patient => (
              <div key={patient.id} className={styles.appointmentCard}>
                <div className={styles.time}>{patient.time}</div>
                <div className={styles.details}>
                  <p className={styles.patientName}>{patient.name}</p>
                  <p className={styles.reason}>{patient.reason}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noAppointments}>No upcoming appointments for today.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;