import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaUserMd, FaBuilding, FaTrash, FaUndo } from 'react-icons/fa';
import styles from './ManageDoctors.module.css';
import Modal from '../common/Modal';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialization: '', department: '', availableToday: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleted, setShowDeleted] = useState(false);
  const API_URL = 'http://localhost:5101/api/doctors';

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}${showDeleted ? '?showDeleted=true' : ''}`);
        const data = await res.json();
        if (res.ok) setDoctors(data);
      } catch (err) {
        console.error('Failed to fetch doctors:', err);
      }
    };
    fetchDoctors();
  }, [showDeleted]);

  // Add doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialization || !newDoctor.department) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoctor),
      });
      const savedDoctor = await res.json();
      if (res.ok) {
        setDoctors(prev => [...prev, savedDoctor]);
        setNewDoctor({ name: '', specialization: '', department: '', availableToday: false });
        setIsModalOpen(false);
      } else alert(savedDoctor.message || 'Failed to add doctor');
    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    }
  };

  // Toggle availability
  const toggleAvailability = async (id) => {
    const doctor = doctors.find(d => d.id === id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availableToday: !doctor.availableToday }),
      });
      if (res.ok) {
        setDoctors(prev =>
          prev.map(d => (d.id === id ? { ...d, availableToday: !d.availableToday } : d))
        );
      }
    } catch (err) {
      console.error('Failed to toggle availability:', err);
    }
  };

  // Soft delete doctor
  const deleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}/delete`, { method: 'PATCH' });
      if (res.ok) {
        setDoctors(prev => prev.map(d => d.id === id ? { ...d, deleted: true } : d));
      }
    } catch (err) {
      console.error('Failed to delete doctor:', err);
    }
  };

  // Restore doctor
  const restoreDoctor = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/restore`, { method: 'PATCH' });
      if (res.ok) {
        setDoctors(prev => prev.map(d => d.id === id ? { ...d, deleted: false } : d));
      }
    } catch (err) {
      console.error('Failed to restore doctor:', err);
    }
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Doctor Management</h1>
        <p className={styles.subtitle}>Manage doctors, their specialization, and availability.</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, specialization, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add Doctor
          </button>
          <button
            className={styles.addBtn}
            style={{ backgroundColor: showDeleted ? '#6c757d' : '#ffc107' }}
            onClick={() => setShowDeleted(prev => !prev)}
          >
            {showDeleted ? 'Show Active' : 'Show Deleted'}
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {filteredDoctors.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Availability</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map(doctor => (
                <tr key={doctor.id} style={{ opacity: doctor.deleted ? 0.5 : 1 }}>
                  <td><FaUserMd className={styles.icon} />{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td><FaBuilding className={styles.icon} />{doctor.department}</td>
                  <td>
                    {!doctor.deleted && (
                      <>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={doctor.availableToday}
                            onChange={() => toggleAvailability(doctor.id)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                        <span
                          className={styles.statusText}
                          style={{ color: doctor.availableToday ? '#28a745' : '#dc3545' }}
                        >
                          {doctor.availableToday ? 'Available' : 'Unavailable'}
                        </span>
                      </>
                    )}
                  </td>
                  <td>{doctor.date}</td>
                  <td>
                    {!doctor.deleted ? (
                      <button onClick={() => deleteDoctor(doctor.id)} className={styles.deleteBtn}>
                        <FaTrash /> Delete
                      </button>
                    ) : (
                      <button onClick={() => restoreDoctor(doctor.id)} className={styles.deleteBtn} style={{ backgroundColor: '#28a745' }}>
                        <FaUndo /> Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noMessage}>No doctors found.</p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Add New Doctor</h2>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" value={newDoctor.name} onChange={e => setNewDoctor(prev => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className={styles.formGroup}>
              <label>Specialization</label>
              <input type="text" value={newDoctor.specialization} onChange={e => setNewDoctor(prev => ({ ...prev, specialization: e.target.value }))} required />
            </div>
            <div className={styles.formGroup}>
              <label>Department</label>
              <input type="text" value={newDoctor.department} onChange={e => setNewDoctor(prev => ({ ...prev, department: e.target.value }))} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={newDoctor.availableToday} onChange={e => setNewDoctor(prev => ({ ...prev, availableToday: e.target.checked }))} />
                Available Today
              </label>
            </div>
            <button type="submit" className={styles.submitBtn}>Add Doctor</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ManageDoctors;
