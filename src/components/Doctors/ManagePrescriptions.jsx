import React, { useState } from 'react';
import styles from './ManagePrescriptions.module.css';
import { FaFileMedical, FaSearch, FaUser, FaPills, FaNotesMedical, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const ManagePrescriptions = () => {
  const [patientId, setPatientId] = useState('');
  const [prescriptionData, setPrescriptionData] = useState({
    patientName: '',
    medication: '',
    dosage: '',
    instructions: '',
  });
  const [patientFound, setPatientFound] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchStatus('');
    setPatientFound(false);

    // Simulate fetching patient data from an API
    // In a real app, you would make an axios.get call here
    try {
      // const response = await axios.get(`/api/patients/${patientId}`);
      // if (response.data) {
      if (patientId === 'PAT123') { // Mock check
        setPrescriptionData((prev) => ({ ...prev, patientName: 'Jane Smith' }));
        setPatientFound(true);
        setSearchStatus('Patient found! Please issue a new prescription.');
      } else {
        setSearchStatus('No patient found with that ID.');
      }
    } catch (error) {
      setSearchStatus('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData({ ...prescriptionData, [name]: value });
  };

  const handleSubmitPrescription = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Logic to save the prescription to the backend
    // In a real app, you would make an axios.post call here
    try {
      console.log('Prescription submitted:', prescriptionData);
      setSearchStatus('Prescription successfully submitted!');
      // Reset form
      setPatientFound(false);
      setPatientId('');
      setPrescriptionData({ patientName: '', medication: '', dosage: '', instructions: '' });
    } catch (error) {
      setSearchStatus('Failed to submit prescription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}><FaFileMedical /> Manage Prescriptions</h1>
        <p className={styles.subtitle}>Create and manage prescriptions for your patients.</p>
      </header>

      <div className={styles.mainContent}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}><FaSearch /> Find Patient</h2>
          <form onSubmit={handleSearch} className={styles.form}>
            <div className={styles.formGroup}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                className={styles.input}
                placeholder="Enter Patient ID (e.g., PAT123)"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.searchBtn} disabled={loading}>
              {loading ? <FaSpinner className={styles.spinner} /> : 'Search'}
            </button>
          </form>
          {searchStatus && (
            <p className={`${styles.statusMessage} ${patientFound ? styles.success : styles.error}`}>
              {searchStatus}
            </p>
          )}
        </div>

        {patientFound && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}><FaNotesMedical /> New Prescription for {prescriptionData.patientName}</h2>
            <form onSubmit={handleSubmitPrescription} className={styles.form}>
              <div className={styles.formGroup}>
                <FaPills className={styles.inputIcon} />
                <input
                  type="text"
                  name="medication"
                  className={styles.input}
                  placeholder="Medication Name"
                  value={prescriptionData.medication}
                  onChange={handlePrescriptionChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <FaClipboardList className={styles.inputIcon} />
                <input
                  type="text"
                  name="dosage"
                  className={styles.input}
                  placeholder="Dosage (e.g., 20mg)"
                  value={prescriptionData.dosage}
                  onChange={handlePrescriptionChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <FaNotesMedical className={styles.inputIcon} />
                <textarea
                  name="instructions"
                  className={styles.textarea}
                  placeholder="Instructions for the patient"
                  value={prescriptionData.instructions}
                  onChange={handlePrescriptionChange}
                  required
                />
              </div>
              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? <FaSpinner className={styles.spinner} /> : (<><FaCheckCircle /> Issue Prescription</>)}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePrescriptions;