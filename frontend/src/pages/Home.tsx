import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import FloatingElement from '../components/FloatingElement';
import Hover3DCard from '../components/Hover3DCard';
import { CountUp } from '../components/CountUp';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { DentalVideoSection } from '../components/DentalVideoSection';
import { Calendar, Shield, Heart, Smile, Activity, ChevronRight, Settings, CheckCircle, User, Star, Quote } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/images/hero-1.jpg", 
    "/images/hero-2.jpg", 
    "/images/hero-3.jpg"  
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={styles.pageWrapper}>
      {/* Background Leaves & Curves SVG */}
      <div className={styles.globalBgElement}>
        <svg viewBox="0 0 1440 3000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Hero Curve */}
          <path d="M0 0H1440V500C1440 500 1200 650 900 650C600 650 300 450 0 500V0Z" fill="url(#hero-gradient)" opacity="0.4" />
          <path d="M0 100C300 150 600 -50 900 150C1200 350 1440 200 1440 200" stroke="#d5b866" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M0 120C300 170 600 -30 900 170C1200 370 1440 220 1440 220" stroke="#087BC1" strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* Middle Curves */}
          <path d="M0 1000C400 900 800 1100 1440 1000V1400C1000 1500 400 1300 0 1400V1000Z" fill="url(#mid-gradient)" opacity="0.3" />
          <path d="M0 1050C400 950 800 1150 1440 1050" stroke="#d5b866" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M0 1080C400 980 800 1180 1440 1080" stroke="#087BC1" strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* Lower Curves 1 */}
          <path d="M0 1800C300 1900 700 1700 1440 1850" stroke="#d5b866" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M0 1820C300 1920 700 1720 1440 1870" stroke="#087BC1" strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* Lower Curves 2 */}
          <path d="M0 2400C400 2300 900 2500 1440 2350" stroke="#d5b866" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M0 2430C400 2330 900 2530 1440 2380" stroke="#087BC1" strokeWidth="1" fill="none" opacity="0.3" />
          
          <defs>
            <linearGradient id="hero-gradient" x1="0" y1="0" x2="1440" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E6F4F8" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="mid-gradient" x1="0" y1="1000" x2="1440" y2="1400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E6F4F8" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Background Slider */}
        <div className={styles.heroSliderBg}>
          {slides.map((img, index) => (
            <div 
              key={index}
              className={`${styles.heroSliderImg} ${index === currentSlide ? styles.heroSliderImgActive : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className={styles.heroSliderOverlay}></div>
        </div>

        <div className={`container ${styles.heroContainerCenter}`}>
          <div className={styles.heroContentCenter}>
            <div className={styles.eyebrowLightCenter}>
              <span className={styles.lineLight}></span> MANORAMA MULTISPECIALITY DENTAL CLINIC <span className={styles.lineLight}></span>
            </div>
            <h1 className={styles.heroTitleLight}>
              Premium Dental Care in <br/>
              <span className={styles.highlightLight}>Varanasi</span>
            </h1>
            <p className={styles.heroDescLight}>
              Experience world-class dentistry with Dr. Amit Kumar Dubey. We combine advanced dental technology with compassionate care.
            </p>
            
            <div className={styles.heroButtonsCenter}>
              <Link to="/contact" className={styles.btnPrimary}>
                <Calendar size={18} /> Book an Appointment <ChevronRight size={18} />
              </Link>
              <Link to="/services" className={styles.btnOutlineLight}>
                Explore Services <ChevronRight size={18} />
              </Link>
            </div>

            <div className={styles.heroFeaturesCenter}>
              <div className={styles.featureItemLight}>
                <div className={styles.iconCircleLight}><Smile size={24} color="#0EA5E9" /></div>
                <span>Advanced<br/>Technology</span>
              </div>
              <div className={styles.featureDividerLight}></div>
              <div className={styles.featureItemLight}>
                <div className={styles.iconCircleLight}><User size={24} color="#0EA5E9" /></div>
                <span>Personalized<br/>Care</span>
              </div>
              <div className={styles.featureDividerLight}></div>
              <div className={styles.featureItemLight}>
                <div className={styles.iconCircleLight}><Shield size={24} color="#0EA5E9" /></div>
                <span>Comfortable<br/>Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DentalVideoSection />

        {/* Why Choose Us */}
      <ScrollReveal>
      <section className={styles.whySection}>
        <div className={`container ${styles.whyContainer}`}>
          <div className={styles.whyContent}>
            <div className={styles.eyebrow}>
              <span className={styles.line}></span> WHY MANORAMA <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitle}>A Better Dental<br/>Experience</h2>
            <p className={styles.whyDesc}>
              We focus on personalized care, modern dental technology, and a comfortable environment to ensure a positive experience for every patient.
            </p>
            <Link to="/about" className={styles.btnPrimarySolid}>
              Learn More About Us <ChevronRight size={18} />
            </Link>
          </div>
          
          <div className={styles.whyImageSide}>
            <FloatingElement duration={4} yOffset={20}>
            <img src="/images/clinic-06.jpg" alt="Premium Dental Facility" className={styles.whyImage} />
            <div className={styles.whyImageBackdrop}></div>
            </FloatingElement>
          </div>
        </div>
        
        <div className="container" style={{ marginTop: '4rem' }}>
          <div className={styles.whyCardsRow}>
            <Hover3DCard className={styles.whyCard}>
              <img src="/images/hero-1.jpg" alt="Personalized Care Background" className={styles.cardImageBg} />
              <div className={styles.cardContentWrap}>
                <div className={styles.cardIconWrap}><Heart size={28} color="#087BC1" /></div>
                <div>
                  <h3 className={styles.cardTitle}>Personalized Care</h3>
                  <p className={styles.cardDesc}>Tailored treatment plans for your unique needs.</p>
                </div>
                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />
              </div>
            </Hover3DCard>
            <Hover3DCard className={styles.whyCard}>
              <img src="/images/clinic-01.jpg" alt="Modern Technology Background" className={styles.cardImageBg} />
              <div className={styles.cardContentWrap}>
                <div className={styles.cardIconWrap}><Settings size={28} color="#087BC1" /></div>
                <div>
                  <h3 className={styles.cardTitle}>Modern Technology</h3>
                  <p className={styles.cardDesc}>Advanced equipment for accurate and effective care.</p>
                </div>
                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />
              </div>
            </Hover3DCard>
            <Hover3DCard className={styles.whyCard}>
              <img src="/images/hero-2.jpg" alt="Patient Comfort Background" className={styles.cardImageBg} />
              <div className={styles.cardContentWrap}>
                <div className={styles.cardIconWrap}><Smile size={28} color="#087BC1" /></div>
                <div>
                  <h3 className={styles.cardTitle}>Patient Comfort</h3>
                  <p className={styles.cardDesc}>A relaxed and welcoming environment for all ages.</p>
                </div>
                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />
              </div>
            </Hover3DCard>
            <Hover3DCard className={styles.whyCard}>
              <img src="/images/clinic-04.jpg" alt="Professional Care Background" className={styles.cardImageBg} />
              <div className={styles.cardContentWrap}>
                <div className={styles.cardIconWrap}><Shield size={28} color="#087BC1" /></div>
                <div>
                  <h3 className={styles.cardTitle}>Professional Care</h3>
                  <p className={styles.cardDesc}>We maintain high standards of cleanliness and care.</p>
                </div>
                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />
              </div>
            </Hover3DCard>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Services Section */}
      <ScrollReveal>
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesHeader}>
            <div className={styles.eyebrowCenter}>
              <span className={styles.line}></span> OUR DENTAL SERVICES <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitleCenter}>
              Comprehensive Dental Care<br/>for a <span className={styles.highlight}>Healthier Smile</span>
            </h2>
            <p className={styles.servicesDesc}>
              From preventive care to advanced treatments, we offer a wide range of dental services<br/>for patients of all ages.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {[
              { title: 'General Dentistry', desc: 'Routine checkups and preventive care', img: '/images/services/general_dentistry.jpg', icon: <CheckCircle /> },
              { title: 'Dental Implants', desc: 'Long-lasting solutions for missing teeth', img: '/images/services/dental_implants.jpg', icon: <Settings /> },
              { title: 'Cosmetic Dentistry', desc: 'Enhance your smile with modern treatments', img: '/images/services/cosmetic_dentistry.jpg', icon: <Smile /> },
              { title: 'Root Canal Treatment', desc: 'Save natural teeth with advanced care', img: '/images/services/root_canal.jpg', icon: <Heart /> },
              { title: 'Orthodontic Treatment', desc: 'Align your teeth for a confident smile', img: '/images/services/orthodontics.jpg', icon: <Activity /> }
            ].map((srv, idx) => (
              <Hover3DCard key={idx} className={styles.serviceCard}>
                <img src={srv.img} alt={srv.title} className={styles.serviceImg} />
                <div className={styles.serviceCardContent}>
                  <div className={styles.serviceIcon}>{srv.icon}</div>
                  <h3 className={styles.serviceCardTitle}>{srv.title}</h3>
                  <p className={styles.serviceCardDesc}>{srv.desc}</p>
                  <ChevronRight size={20} className={styles.serviceArrow} color="#087BC1" />
                </div>
              </Hover3DCard>
            ))}
          </div>

          <div className={styles.servicesAction}>
            <Link to="/services" className={styles.btnPrimarySolid}>
              View All Services <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Before & After Section */}
      <ScrollReveal>
      <section style={{ padding: '4rem 0', position: 'relative', zIndex: 1, backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          <div className={styles.servicesHeader}>
            <div className={styles.eyebrowCenter}>
              <span className={styles.line}></span> REAL RESULTS <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitleCenter}>
              Smile <span className={styles.highlight}>Transformations</span>
            </h2>
            <p className={styles.servicesDesc} style={{ marginBottom: '3rem' }}>
              See the difference our advanced teeth whitening and cosmetic treatments can make.
            </p>
          </div>
          
          <BeforeAfterSlider 
            beforeImage="/images/real_before_smile.jpg" 
            afterImage="/images/real_after_smile.jpg"
            beforeImageStyle={{}}
            beforeLabel="BEFORE • DISCOLORED & UNEVEN"
            afterLabel="AFTER • PORCELAIN VENEERS"
            bottomLabel={
              <>
                <span className={styles.blueDot} style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0ea5e9', boxShadow: '0 0 5px #0ea5e9', marginRight: '6px' }}></span>
                ✨ 3D Digital Smile Design • E-Max Porcelain
              </>
            }
          />
        </div>
      </section>
      </ScrollReveal>

      {/* Stats Section */}
      <ScrollReveal>
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          <Hover3DCard className={styles.statCard}>
            <h3 className={styles.statNumber}><CountUp end={15} suffix="+" /></h3>
            <p className={styles.statLabel}>Years of Experience</p>
          </Hover3DCard>
          <Hover3DCard className={styles.statCard}>
            <h3 className={styles.statNumber}><CountUp end={10} suffix="k+" /></h3>
            <p className={styles.statLabel}>Happy Smiles</p>
          </Hover3DCard>
          <Hover3DCard className={styles.statCard}>
            <h3 className={styles.statNumber}><CountUp end={100} suffix="%" /></h3>
            <p className={styles.statLabel}>Patient Satisfaction</p>
          </Hover3DCard>
          <Hover3DCard className={styles.statCard}>
            <h3 className={styles.statNumber}><CountUp end={50} suffix="+" /></h3>
            <p className={styles.statLabel}>Advanced Equipments</p>
          </Hover3DCard>
        </div>
      </section>
      </ScrollReveal>

      {/* Testimonials Section */}
      <ScrollReveal>
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.testimonialsHeader}>
            <div className={styles.eyebrowCenter}>
              <span className={styles.line}></span> PATIENT REVIEWS <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitleCenter}>
              What Our <span className={styles.highlight}>Patients Say</span>
            </h2>
          </div>
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
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal>
      <section className={styles.faqSection}>
        <div className={`container ${styles.faqContainer}`}>
          <div className={styles.faqImageSide}>
            <FloatingElement duration={5} yOffset={15}>
            <img src="/images/clinic-05.jpg" alt="Dental FAQs" className={styles.faqImage} />
            <div className={styles.faqImageBackdrop}></div>
            </FloatingElement>
          </div>
          <div className={styles.faqContent}>
            <div className={styles.eyebrow}>
              <span className={styles.line}></span> FAQs <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitle}>Common Dental Questions</h2>
            
            <div className={styles.faqList}>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>How often should I visit the dentist?</h4>
                <p className={styles.faqAnswer}>We recommend visiting for a routine check-up and cleaning every 6 months to maintain optimal oral health and catch issues early.</p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Is professional teeth whitening safe?</h4>
                <p className={styles.faqAnswer}>Yes, teeth whitening is completely safe and effective when performed under a professional dentist's supervision in our clinic.</p>
              </div>
              <div className={styles.faqItem}>
                <h4 className={styles.faqQuestion}>Do you offer emergency dental care?</h4>
                <p className={styles.faqAnswer}>Yes, we provide priority appointments for dental emergencies like severe toothaches, broken teeth, or injuries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Clinic Gallery Section */}
      <ScrollReveal>
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryHeader}>
            <div className={styles.eyebrowCenter}>
              <span className={styles.line}></span> CLINIC TOUR <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitleCenter}>
              State-of-the-Art <span className={styles.highlight}>Facilities</span>
            </h2>
          </div>
          <div className={styles.galleryGrid}>
            <img src="/images/clinic-01.jpg" alt="Clinic Interior" className={styles.galleryImg} />
            <img src="/images/clinic-02.jpg" alt="Dental Chair" className={styles.galleryImg} />
            <img src="/images/clinic-03.jpg" alt="Advanced Equipment" className={styles.galleryImg} />
            <img src="/images/clinic-04.jpg" alt="Waiting Area" className={styles.galleryImg} />
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Visit Us Section */}
      <ScrollReveal>
      <section className={styles.visitSection}>
        <div className={`container ${styles.visitContainer}`}>
          <div className={styles.visitContent}>
            <div className={styles.eyebrow}>
              <span className={styles.line}></span> VISIT US <span className={styles.line}></span>
            </div>
            <h2 className={styles.sectionTitle}>
              We'd Love to <span className={styles.highlight}>See You</span>
            </h2>
            <p className={styles.visitDesc}>
              Visit Manorama Multispeciality Dental Clinic for world-class dental care in a warm and welcoming environment.
            </p>
            
            <div className={styles.contactInfoGrid}>
              <div className={styles.contactInfoCard}>
                <h4 className={styles.infoTitle}>Address</h4>
                <p className={styles.infoText}>Lohta, Varanasi<br/>Uttar Pradesh, India</p>
              </div>
              <div className={styles.contactInfoCard}>
                <h4 className={styles.infoTitle}>Clinic Hours</h4>
                <p className={styles.infoText}>Mon – Sat: 10:00 AM – 8:00 PM<br/>Sunday: Closed</p>
              </div>
            </div>

            <Link to="/contact" className={styles.btnPrimarySolid}>
              Book an Appointment <ChevronRight size={18} />
            </Link>
          </div>

          <div className={styles.visitMap} style={{ position: 'relative' }}>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=25.3176,82.9739" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}
              title="Get Directions"
            ></a>
            <iframe
              title="Manorama Dental Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.5!2d82.9739!3d25.3176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE5JzAzLjQiTiA4MsKwNTgnMjYuMCJF!5e0!3m2!1sen!2sin!4v1696300000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      </ScrollReveal>

    </div>
  );
};

export default Home;
