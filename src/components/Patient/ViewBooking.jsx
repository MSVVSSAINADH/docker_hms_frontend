import React, { useState } from 'react';
import styles from './ViewBooking.module.css';
import { FaCalendarCheck, FaUserMd, FaHospital, FaClock, FaTrashAlt, FaCalendarAlt } from 'react-icons/fa';

const ViewBooking = () => {
  // Mock data for bookings (in a real app, this would be fetched from an API)
  const [bookings, setBookings] = useState([
    { id: 1, doctor: 'Dr. Jane Doe', hospital: 'City Hospital', date: '2025-10-15', time: '10:00 AM' },
    { id: 2, doctor: 'Dr. John Smith', hospital: 'General Hospital', date: '2025-10-18', time: '02:30 PM' },
    { id: 3, doctor: 'Dr. Emily White', hospital: 'City Hospital', date: '2025-10-22', time: '11:00 AM' },
  ]);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // Logic to send a cancellation request to an API
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      alert('Booking canceled successfully.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}><FaCalendarCheck /> My Appointments</h1>
        <p className={styles.subtitle}>View and manage your upcoming medical appointments.</p>
      </header>
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          {bookings.length > 0 ? (
            <table className={styles.bookingTable}>
              <thead>
                <tr>
                  <th><FaUserMd /> Doctor</th>
                  <th><FaHospital /> Hospital</th>
                  <th><FaCalendarAlt /> Date</th>
                  <th><FaClock /> Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.doctor}</td>
                    <td>{booking.hospital}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>
                      <button className={styles.cancelBtn} onClick={() => handleCancelBooking(booking.id)}>
                        <FaTrashAlt /> Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noBookings}>
              You have no upcoming appointments.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;