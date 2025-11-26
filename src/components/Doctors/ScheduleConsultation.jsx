import React, { useState } from 'react';
import styles from './ScheduleConsultation.module.css';
import { FaCalendarPlus, FaClock, FaUserMd } from 'react-icons/fa';
import axios from 'axios';

const ScheduleConsultation = () => {
  const [doctorName, setDoctorName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [blockedTimes, setBlockedTimes] = useState([]);
  
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM'
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setBlockedTimes([]); // reset on date change
  };

  const toggleTimeSlot = (slot) => {
    setBlockedTimes(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorName || !selectedDate || blockedTimes.length === 0) {
      alert('Please fill doctor name, date, and at least one time slot.');
      return;
    }

    const scheduleData = {
      doctorName,
      date: selectedDate,
      blockedSlots: blockedTimes
    };

    try {
      const response = await axios.post(
        'http://localhost:8086/api/doctor-schedule/save',
        scheduleData
      );
      console.log('Schedule saved:', response.data);
      alert(`Successfully blocked ${blockedTimes.length} slots on ${selectedDate}.`);

      setDoctorName('');
      setSelectedDate('');
      setBlockedTimes([]);
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <FaCalendarPlus /> Schedule Consultation
        </h1>
        <p className={styles.subtitle}>
          Manage your consultation hours by blocking unavailable slots.
        </p>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Set Your Availability</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <FaUserMd className={styles.inputIcon} />
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Select Date</label>
              <input
                type="date"
                className={styles.input}
                value={selectedDate}
                onChange={handleDateChange}
                required
              />
            </div>

            {selectedDate && (
              <div className={styles.timeSlotsGrid}>
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`${styles.slotBtn} ${
                      blockedTimes.includes(slot) ? styles.blocked : styles.available
                    }`}
                    onClick={() => toggleTimeSlot(slot)}
                  >
                    <FaClock className={styles.slotIcon} /> {slot}
                  </button>
                ))}
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              Save Schedule
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleConsultation;
