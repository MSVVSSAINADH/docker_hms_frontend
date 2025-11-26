import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

// Corrected import paths
import { WelcomeSection } from '../components/AboutUs/WelcomeSection';
import DoctorsSection from '../components/Doctors/DoctorsSection';
import { AuthContext } from '../components/context/AuthContext'; // Import AuthContext

const HomePage = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Access user

    // Updated function to check login status
    const handleAppointmentClick = () => {
        if (user) {
            navigate('/book-appointment'); // Logged in → go to booking page
        } else {
            navigate('/login'); // Not logged in → go to login page
        }
    };

    return (
        <div className={styles.homePage}>
            {/* Hero Section */}
            <header className={styles.heroSection}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Your Health is Our Priority</h1>
                    <p className={styles.heroSubtitle}>
                        Experience compassionate care and advanced medical services at your fingertips.
                    </p>
                    <button 
                        className={styles.ctaButton}
                        onClick={handleAppointmentClick}
                    >
                        Book an Appointment
                    </button>
                </div>
            </header>

            {/* Welcome Section */}
            <section className={styles.section}>
                <WelcomeSection />
            </section>

            {/* Doctors Section */}
            <section className={styles.section}>
                <DoctorsSection />
            </section>
        </div>
    );
};

export default HomePage;
