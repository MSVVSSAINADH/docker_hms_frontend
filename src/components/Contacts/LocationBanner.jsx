import React from 'react';
import styles from './LocationBanner.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const LocationBanner = () => {
  const mapUrl = "https://maps.app.goo.gl/tfdbp9NobTizvwBX6";

  const handleMapClick = () => {
    window.open(mapUrl, '_blank');
  };

  const placeholderImageUrl = "https://placehold.co/1200x400/1f2b6c/bfd2f8?text=Hospital+Location+Map";

  return (
    <section className={styles.locationSection}>
      <h2 className={styles.title}>Find Us Easily</h2>
      <p className={styles.subtitle}>Click the map to view our location on Google Maps.</p>
      
      <div className={styles.mapContainer} onClick={handleMapClick}>
        {/* Placeholder image of the map for visual context */}
        <img
          loading="lazy"
          src={placeholderImageUrl}
          alt="Hospital Location on Map"
          className={styles.mapImage}
        />
        
        {/* Overlay content to enhance clickability */}
        <div className={styles.mapOverlay}>
          <FaMapMarkerAlt className={styles.mapIcon} />
          <span className={styles.overlayText}>Click to View Directions</span>
        </div>
      </div>
    </section>
  );
};