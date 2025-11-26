import React from "react";
import styles from "./AboutPage.module.css";

// Corrected import paths
import { DoctorCard } from '../components/Doctors/DoctorCard';
import { TestimonialSection } from '../components/AboutUs/TestimonialSection';
import { WelcomeSection } from "../components/AboutUs/WelcomeSection";

export default function AboutPage() {
  const doctorsData = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/cf44c0ce78c240a28faac630188f1a27/bdc118d2fe3571dc8816367c80ef64c4ddf690841c8d7bc8e931f15459138021?placeholderIfAbsent=true",
      name: "Dr. Gopal kumar",
      specialty: "Cardiologist",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/cf44c0ce78c240a28faac630188f1a27/10c01619eef3a414aa4655d12e2acd9a31bd700a38d3992dcfed22ef9a293e50?placeholderIfAbsent=true",
      name: "Dr. Raghu Ram",
      specialty: "Neurologist",
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/cf44c0ce78c240a28faac630188f1a27/a522fa64e597948571da6be9d7aa71799120ac0d854c96100591c0b953bf2ed1?placeholderIfAbsent=true",
      name: "Dr. Ramya Devi",
      specialty: "Pediatrician",
    },
  ];

  return (
    <main className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.aboutHero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>About Our Hospital</h1>
          <p className={styles.heroSubtitle}>
            Dedicated to providing trusted healthcare services with compassion and innovation.
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={styles.section}>
        <WelcomeSection />
      </section>

      {/* Doctors Section */}
      <section className={styles.doctorsSection}>
        <h3 className={styles.sectionSubtitle}>Meet Our Experts</h3>
        <h2 className={styles.sectionTitle}>Our Doctors</h2>
        <div className={styles.doctorsGrid}>
          {doctorsData.map((doctor, index) => (
            <DoctorCard
              key={index}
              image={doctor.image}
              name={doctor.name}
              specialty={doctor.specialty}
            />
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className={styles.fullWidthSection}>
        <TestimonialSection />
      </section>
    </main>
  );
}