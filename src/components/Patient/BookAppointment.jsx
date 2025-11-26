import React, { useState, useContext, useEffect } from 'react';
import styles from './BookAppointment.module.css';
import { FaCalendarPlus, FaUser, FaStethoscope, FaClock, FaComment } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookAppointment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    reason: '',
  });

  const [availableDoctors, setAvailableDoctors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch available doctors from backend
  useEffect(() => {
    if (formData.date) {
      axios
        .get(`http://localhost:5101/api/doctor-schedule/available?date=${formData.date}`)
        .then((res) => {
          setAvailableDoctors(res.data);
        })
        .catch((err) => {
          console.error('Error fetching doctors:', err);
          setAvailableDoctors([]);
        });
    }
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5101/api/appointments/book', formData);
      alert('Appointment booked successfully!');
      setFormData({ patientName: '', doctorName: '', date: '', time: '', reason: '' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}><FaCalendarPlus /> Book an Appointment</h1>
        <p className={styles.subtitle}>Select a date to see available doctors.</p>
      </header>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              className={styles.input}
              required
              disabled={!user}
            />
          </div>

          <div className={styles.formGroup}>
            <FaCalendarPlus className={styles.inputIcon} />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          {formData.date && (
            <div className={styles.formGroup}>
              <FaStethoscope className={styles.inputIcon} />
              <select
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="">Select Doctor</option>
                {availableDoctors.length > 0 ? (
                  availableDoctors.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option disabled>No doctors available</option>
                )}
              </select>
            </div>
          )}

          <div className={styles.formGroup}>
            <FaClock className={styles.inputIcon} />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <FaComment className={styles.inputIcon} />
            <textarea
              name="reason"
              placeholder="Reason for visit"
              value={formData.reason}
              onChange={handleChange}
              className={styles.textarea}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {user ? 'Confirm Appointment' : 'Login to Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
