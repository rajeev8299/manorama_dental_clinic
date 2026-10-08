import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import FloatingElement from '../components/FloatingElement';
import Hover3DCard from '../components/Hover3DCard';
import WaveDivider from '../components/WaveDivider';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { CheckCircle } from 'lucide-react';

const expandedServices = [
  {
    id: "general-dentistry",
    title: "General Dentistry",
    shortDescription: "Comprehensive dental check-ups, cleanings, and preventive care to maintain optimal oral health. We focus on early detection and preserving your natural teeth.",
    img: "/images/services/general_dentistry.jpg",
    benefits: ["Regular Checkups & X-Rays", "Professional Teeth Cleaning", "Cavity Fillings", "Gum Disease Treatment"]
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    shortDescription: "Enhance your smile with our premium cosmetic procedures. Whether you need teeth whitening or custom veneers, we design a smile that suits your face perfectly.",
    img: "/images/services/cosmetic_dentistry.jpg",
    benefits: ["Laser Teeth Whitening", "Porcelain Veneers", "Smile Makeover", "Tooth Contouring"]
  },
  {
    id: "orthodontics",
    title: "Orthodontics & Aligners",
    shortDescription: "Straighten your teeth and correct your bite with modern orthodontic solutions. We offer traditional braces as well as invisible clear aligners for adults and teens.",
    img: "/images/services/orthodontics.jpg",
    benefits: ["Clear Aligners (Invisible)", "Metal & Ceramic Braces", "Bite Correction", "Retainers"]
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    shortDescription: "Restore missing teeth with permanent, natural-looking dental implants. Our surgical precision ensures long-lasting results that function just like natural teeth.",
    img: "/images/services/dental_implants.jpg",
    benefits: ["Single Tooth Replacement", "Full Mouth Rehabilitation", "Bone Grafting", "Implant Supported Dentures"]
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    shortDescription: "Painless endodontic therapy to save infected teeth and relieve severe tooth pain. We use advanced rotary equipment to make the procedure quick and comfortable.",
    img: "/images/services/root_canal.jpg",
    benefits: ["Painless Procedure", "Single Sitting RCT", "Post & Core Build-up", "Tooth Saving Therapy"]
  }
];

const Services = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '0', backgroundColor: '#fafafa' }}>
      
      {/* Hero Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0 var(--spacing-2xl)', backgroundColor: 'var(--color-sage)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Treatments</span>
                <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
              </div>
              <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>
                World-Class <span style={{ color: 'var(--color-accent)' }}>Dental Services</span>
              </h1>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.6 }}>
                From routine checkups to complex full-mouth rehabilitations, our comprehensive treatments are tailored to meet your unique needs and aesthetic goals.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider />

      {/* Services Detailed List */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          {expandedServices.map((service, index) => (
            <ScrollReveal key={service.id}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr', 
                gap: '4rem', 
                alignItems: 'center',
                marginBottom: '6rem',
                direction: index % 2 === 0 ? 'ltr' : 'rtl'
              }}>
                
                <FloatingElement duration={index % 2 === 0 ? 5 : 4} yOffset={15}>
                  <Hover3DCard>
                    <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} 
                      />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15,42,74,0.4) 0%, rgba(255,255,255,0) 100%)' }}></div>
                    </div>
                  </Hover3DCard>
                </FloatingElement>
                
                <div style={{ direction: 'ltr' }}>
                  <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>{service.title}</h2>
                  <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
                    {service.shortDescription}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
                    {service.benefits.map((benefit, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                        <CheckCircle size={20} color="var(--color-accent)" /> {benefit}
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="btn-glow" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
                    Consult for {service.title}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Before & After Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: '#fff' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>Real Results</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginTop: '1rem' }}>See the transformation for yourself</p>
            </div>
            
            <BeforeAfterSlider 
              beforeImage="/images/real_before_smile.jpg" 
              afterImage="/images/real_after_smile.jpg"
              beforeLabel="BEFORE • DISCOLORED & UNEVEN"
              afterLabel="AFTER • PORCELAIN VENEERS"
              bottomLabel={
                <>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0ea5e9', boxShadow: '0 0 5px #0ea5e9', marginRight: '6px' }}></span>
                  ✨ 3D Digital Smile Design • E-Max Porcelain
                </>
              }
            />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-sage)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Don't see what you're looking for?</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              We provide many more specialized treatments. Book a consultation to discuss your specific dental concerns with Dr. Dubey.
            </p>
            <Link to="/contact" className="btn-glow" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
              Book an Appointment
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Services;
