import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaUser, FaBuilding, FaTrash, FaUndo } from 'react-icons/fa';
import { MdPerson } from 'react-icons/md';
import styles from './ManageStaff.module.css';
import Modal from '../common/Modal';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', department: '', workToday: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleted, setShowDeleted] = useState(false); // toggle for deleted staff
  const API_URL = 'http://localhost:8086/api/staff';

  // Load staff from backend based on showDeleted flag
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(`${API_URL}${showDeleted ? '?showDeleted=true' : ''}`);
        const data = await res.json();
        if (res.ok) setStaffMembers(data);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
      }
    };
    fetchStaff();
  }, [showDeleted]);

  // Add new staff
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.role || !newStaff.department) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff),
      });
      const savedStaff = await res.json();
      if (res.ok) {
        setStaffMembers(prev => [...prev, savedStaff]);
        setNewStaff({ name: '', role: '', department: '', workToday: false });
        setIsModalOpen(false);
      } else alert(savedStaff.message || 'Failed to add staff');
    } catch (err) {
      console.error(err);
      alert('Server error. Try again later.');
    }
  };

  // Toggle active/inactive
  const toggleWorkStatus = async (id) => {
    const staff = staffMembers.find(s => s.id === id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workToday: !staff.workToday }),
      });
      if (res.ok) {
        setStaffMembers(prev =>
          prev.map(s => (s.id === id ? { ...s, workToday: !s.workToday } : s))
        );
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  // Soft delete staff
  const deleteStaff = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}/delete`, { method: 'PATCH' });
      if (res.ok) {
        setStaffMembers(prev => prev.map(s => s.id === id ? { ...s, deleted: true } : s));
      }
    } catch (err) {
      console.error('Failed to delete staff:', err);
    }
  };

  // Restore staff
  const restoreStaff = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/restore`, { method: 'PATCH' });
      if (res.ok) {
        setStaffMembers(prev => prev.map(s => s.id === id ? { ...s, deleted: false } : s));
      }
    } catch (err) {
      console.error('Failed to restore staff:', err);
    }
  };

  const filteredStaffMembers = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Staff Management</h1>
        <p className={styles.subtitle}>Manage your team and track their availability.</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, role or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Add New Staff
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

      <div className={styles.staffTableContainer}>
        {filteredStaffMembers.length > 0 ? (
          <table className={styles.staffTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaffMembers.map(staff => (
                <tr key={staff.id} style={{ opacity: staff.deleted ? 0.5 : 1 }}>
                  <td><MdPerson className={styles.icon} />{staff.name}</td>
                  <td><FaUser className={styles.icon} />{staff.role}</td>
                  <td><FaBuilding className={styles.icon} />{staff.department}</td>
                  <td>
                    {!staff.deleted && (
                      <>
                        <label className={styles.toggleSwitch}>
                          <input
                            type="checkbox"
                            checked={staff.workToday}
                            onChange={() => toggleWorkStatus(staff.id)}
                          />
                          <span className={styles.slider}></span>
                        </label>
                        <span className={styles.statusText} style={{ color: staff.workToday ? '#28a745' : '#dc3545' }}>
                          {staff.workToday ? 'Active' : 'Inactive'}
                        </span>
                      </>
                    )}
                  </td>
                  <td>{staff.date}</td>
                  <td>
                    {!staff.deleted ? (
                      <button onClick={() => deleteStaff(staff.id)} className={styles.deleteBtn}>
                        <FaTrash /> Delete
                      </button>
                    ) : (
                      <button onClick={() => restoreStaff(staff.id)} className={styles.deleteBtn} style={{ backgroundColor: '#28a745' }}>
                        <FaUndo /> Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noStaffMessage}>No staff members found.</p>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Add New Staff Member</h2>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" value={newStaff.name} onChange={e => setNewStaff(prev => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className={styles.formGroup}>
              <label>Role</label>
              <input type="text" value={newStaff.role} onChange={e => setNewStaff(prev => ({ ...prev, role: e.target.value }))} required />
            </div>
            <div className={styles.formGroup}>
              <label>Department</label>
              <input type="text" value={newStaff.department} onChange={e => setNewStaff(prev => ({ ...prev, department: e.target.value }))} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={newStaff.workToday} onChange={e => setNewStaff(prev => ({ ...prev, workToday: e.target.checked }))} />
                Work Today
              </label>
            </div>
            <button type="submit" className={styles.submitBtn}>Add Staff</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StaffManagement;
