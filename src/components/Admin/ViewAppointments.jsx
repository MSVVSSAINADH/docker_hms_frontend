import React, { useEffect, useState } from 'react';
import styles from './ViewAppointments.module.css';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      setAppointments(updatedAppointments);
      alert('Appointment deleted successfully!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}><FaEye /> View All Appointments</h2>
        {appointments.length === 0 ? (
          <p className={styles.noDataMessage}>No appointments available.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.hospital}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.timeSlot}</td>
                    <td>{appointment.description}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className={styles.deleteBtn}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;