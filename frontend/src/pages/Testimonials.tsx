import { Quote, Star, ChevronRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import WaveDivider from '../components/WaveDivider';
import styles from './Home.module.css';

const Testimonials = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '0', backgroundColor: 'var(--color-sage)' }}>
      {/* Hero / Page Header Section */}
      <section style={{ padding: 'var(--spacing-2xl) 0 var(--spacing-2xl)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(230,244,248,0.8) 0%, rgba(255,255,255,0) 100%)', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
              <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
              <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>PATIENT STORIES</span>
              <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
            </div>
            <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>
              Testimonials
            </h1>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.6 }}>
              Real experiences from patients at Manorama Multispeciality Dental Clinic.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider />

      {/* Testimonials Grid Section (Reused from Home) */}
      <section className={styles.testimonialsSection} style={{ backgroundColor: '#fff', paddingTop: '4rem' }}>
        <div className="container">
          <div className={styles.testimonialsContainer}>
            <div className={styles.testimonialsGrid}>
              {[
                { name: "Rahul Verma", text: "Dr. Amit is incredibly patient and thorough. The clinic is equipped with modern facilities and my root canal was completely painless!" },
                { name: "Sneha Sharma", text: "Best dental clinic in Varanasi. The staff is very polite and they make sure you are comfortable throughout the procedure." },
                { name: "Amitabh Singh", text: "Got my dental implants done here. The quality of treatment and post-care follow-ups are exceptional. Highly recommended!" },
                { name: "Priya Patel", text: "Very professional and hygienic environment. My teeth whitening results are amazing, completely transformed my smile." },
                { name: "Suresh Tiwari", text: "I was very scared of tooth extraction, but Dr. Amit made it so easy and painless. Best dentist in the city!" },
                { name: "Neha Gupta", text: "Excellent pediatric dental care. My kids are no longer afraid of visiting the dentist thanks to the friendly staff here." },
                // Duplicate for seamless infinite scrolling
                { name: "Rahul Verma", text: "Dr. Amit is incredibly patient and thorough. The clinic is equipped with modern facilities and my root canal was completely painless!" },
                { name: "Sneha Sharma", text: "Best dental clinic in Varanasi. The staff is very polite and they make sure you are comfortable throughout the procedure." },
                { name: "Amitabh Singh", text: "Got my dental implants done here. The quality of treatment and post-care follow-ups are exceptional. Highly recommended!" },
                { name: "Priya Patel", text: "Very professional and hygienic environment. My teeth whitening results are amazing, completely transformed my smile." },
                { name: "Suresh Tiwari", text: "I was very scared of tooth extraction, but Dr. Amit made it so easy and painless. Best dentist in the city!" },
                { name: "Neha Gupta", text: "Excellent pediatric dental care. My kids are no longer afraid of visiting the dentist thanks to the friendly staff here." }
              ].map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.quoteIcon}><Quote size={32} color="#087BC1" opacity={0.2} /></div>
                  <div className={styles.stars}>
                    {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="#d5b866" color="#d5b866" />)}
                  </div>
                  <p className={styles.reviewText}>"{review.text}"</p>
                  <div className={styles.reviewerName}>- {review.name}</div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a 
                href="https://share.google/Lu2ps8GpFUzeGO5oe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.btnPrimarySolid}
                style={{ padding: '0.8rem 2rem' }}
              >
                Read Original Google Reviews <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
