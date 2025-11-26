import React from "react";
// All imports now correctly assume the component lives in 'src/components/Doctors/'
// and are importing siblings or components from other feature folders (../folder/Component)

import { DoctorCard } from "../Doctors/DoctorCard"; // Path to DoctorCard
import { TestimonialSection } from "../AboutUs/TestimonialSection"; // Path to TestimonialSection
import { LocationBanner } from "../Contacts/LocationBanner"; // Corrected component name (LocationBanner)
import styles from "./DoctorsSection.module.css";


// Mock data for the doctors (in a real app, this would come from an API)
const doctorsData = [
  {
    id: 1,
    name: "Dr. Anitha Reddy",
    specialty: "Medicine Specialist",
    image: "https://www.pulseheadlines.com/wp-content/uploads/2016/12/jejeje-1.jpg",
  },
  {
    id: 2,
    name: "Dr. Kavya",
    specialty: "Cardiology",
    image: "https://thumbs.dreamstime.com/b/beautiful-successful-female-doctor-13011820.jpg",
  },
  {
    id: 3,
    name: "Dr. Ramya Devi",
    specialty: "Neurology",
    image: "https://i.pinimg.com/originals/7b/91/13/7b91136805fab0995cd678b771a67381.jpg",
  },
  {
    id: 4,
    name: "Dr. John Doe",
    specialty: "Neurology",
    image: "https://cdn.builder.io/api/v1/image/assets/cf44c0ce78c240a28faac630188f1a27/bdc118d2fe3571dc8816367c80ef64c4ddf690841c8d7bc8e931f15459138021",
  },
  {
    id: 5,
    name: "Dr. Harshit Babu",
    specialty: "Oncology",
    image: "Doctor5.png",
  },
  {
    id: 6,
    name: "Dr. Chris Evans",
    specialty: "Pediatrics",
    image: "https://cdn.builder.io/api/v1/image/assets/cf44c0ce78c240a28faac630188f1a27/a522fa64e597948571da6be9d7aa71799120ac0d854c96100591c0b953bf2ed1",
  },
];

const DoctorsSection = () => {
  return (
    <section className={styles.doctors}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/cf44c0ce78c240a28faac630188f1a27/7e28aeb77ab122df05cdb236545a8401afc25a136342bf2bbeb4b4ef296ed587?placeholderIfAbsent=true"
        alt="Hero banner"
        className={styles.heroImage}
      />
      <div className={styles.doctorsGrid}>
        <h2 className={styles.sectionTitle}>Meet Our Experts</h2>
        <p className={styles.sectionSubtitle}>
          Our team of dedicated professionals is here to provide you with the best care.
        </p>
        <div className={styles.doctorList}>
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              image={doctor.image}
              name={doctor.name}
              specialty={doctor.specialty}
            />
          ))}
        </div>
      </div>
      <TestimonialSection />
      <LocationBanner />
    </section>
  );
};

export default DoctorsSection;