import { Shield, Award, Heart, CheckCircle, Clock, Users } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import Hover3DCard from '../components/Hover3DCard';
import FloatingElement from '../components/FloatingElement';
import WaveDivider from '../components/WaveDivider';

const About = () => {
  return (
    <div className="animate-fade-in" style={{ padding: '0', backgroundColor: 'var(--color-sage)' }}>
      {/* Hero Section */}
      <section style={{ padding: 'var(--spacing-2xl) 0 var(--spacing-2xl)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(230,244,248,0.8) 0%, rgba(255,255,255,0) 100%)', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal>
            <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>
              Redefining <span style={{ color: 'var(--color-accent)' }}>Dental Care</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: 1.6 }}>
              At Manorama Multispeciality Dental Clinic, we combine cutting-edge technology with compassionate care to deliver world-class dental experiences to the Varanasi community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider />

      {/* Doctor Profile Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: '#fff' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <FloatingElement duration={4} yOffset={20}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: '-15px', background: 'var(--color-accent)', opacity: 0.1, borderRadius: '24px', transform: 'rotate(-3deg)' }}></div>
                  <img 
                    src="/images/dr_amit_nobg.png" 
                    alt="Dr. Amit Kumar Dubey" 
                    style={{ width: '100%', borderRadius: '24px', position: 'relative', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                  />
                </div>
              </FloatingElement>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Chief Dental Surgeon</span>
                </div>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Dr. Amit Kumar Dubey</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <span style={{ backgroundColor: 'rgba(8,123,193,0.1)', color: 'var(--color-accent)', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem' }}>BDS</span>
                  <span style={{ backgroundColor: 'rgba(8,123,193,0.1)', color: 'var(--color-accent)', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem' }}>12+ Years Experience</span>
                  <span style={{ backgroundColor: 'rgba(8,123,193,0.1)', color: 'var(--color-accent)', padding: '0.5rem 1rem', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem' }}>Implantologist</span>
                </div>
                
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                  Dr. Amit Kumar Dubey brings over a decade of dedicated healthcare experience to Manorama Multispeciality Dental Clinic. His commitment to continuing education and adopting the latest in dental technology ensures that patients receive the highest standard of care.
                </p>
                <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                  Known for his gentle approach and meticulous attention to detail, Dr. Dubey focuses on patient comfort while delivering precise, lasting results. Whether it's a routine checkup or complex oral surgery, you are in safe hands.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                    <CheckCircle size={20} color="var(--color-accent)" /> 10k+ Successful Treatments
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 500 }}>
                    <CheckCircle size={20} color="var(--color-accent)" /> Advanced Certification
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-sage)' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>Mission & Vision</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <Hover3DCard className="premium-card" style={{ padding: '3rem', background: 'url("/images/mission_bg.jpg") center/cover', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(8,123,193,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Heart size={40} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#000', fontWeight: '900', textShadow: '1px 1px 3px rgba(255,255,255,0.9), -1px -1px 3px rgba(255,255,255,0.9), 1px -1px 3px rgba(255,255,255,0.9), -1px 1px 3px rgba(255,255,255,0.9)' }}>Our Mission</h3>
                <p style={{ fontSize: '1.2rem', color: '#000', fontWeight: '700', lineHeight: 1.8, textShadow: '1px 1px 3px rgba(255,255,255,0.9), -1px -1px 3px rgba(255,255,255,0.9), 1px -1px 3px rgba(255,255,255,0.9), -1px 1px 3px rgba(255,255,255,0.9)' }}>
                  To provide exceptional, affordable, and painless dental care using state-of-the-art technology, ensuring every patient leaves with a healthy, confident smile.
                </p>
              </Hover3DCard>
              
              <Hover3DCard className="premium-card" style={{ padding: '3rem', background: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url("/images/vision_bg.jpg") center/cover', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(8,123,193,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                  <Shield size={40} color="var(--color-accent)" />
                </div>
                <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: '#000', fontWeight: '800', textShadow: '0 2px 15px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,0.8)' }}>Our Vision</h3>
                <p style={{ fontSize: '1.2rem', color: '#111', fontWeight: '600', lineHeight: 1.8, textShadow: '0 2px 10px rgba(255,255,255,1), 0 0 5px rgba(255,255,255,0.8)' }}>
                  To become the most trusted and recognized center of dental excellence in Varanasi, setting new benchmarks in patient comfort, safety, and hygiene.
                </p>
              </Hover3DCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Clinic Tour / Features */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: '#fff' }}>
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Our Clinic</span>
                <span style={{ width: '40px', height: '2px', backgroundColor: 'var(--color-accent)' }}></span>
              </div>
              <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)' }}>Why Choose Manorama Dental?</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {[
                { title: "Advanced Equipment", icon: <Award />, desc: "We utilize modern RVG X-rays, rotary endodontics, and premium sterilization protocols." },
                { title: "Experienced Team", icon: <Users />, desc: "Our team comprises highly qualified specialists ensuring precise and painless treatments." },
                { title: "Flexible Timings", icon: <Clock />, desc: "We are open 6 days a week with convenient evening slots to fit your busy schedule." }
              ].map((item, i) => (
                <Hover3DCard key={i} className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ color: 'var(--color-accent)', marginBottom: '1.5rem' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{item.title}</h4>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </Hover3DCard>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
              <Hover3DCard>
                <img src="/images/clinic-01.jpg" alt="Clinic Interior" style={{ width: '100%', borderRadius: '16px', height: '300px', objectFit: 'cover' }} />
              </Hover3DCard>
              <Hover3DCard>
                <img src="/images/clinic-03.jpg" alt="Advanced Equipment" style={{ width: '100%', borderRadius: '16px', height: '300px', objectFit: 'cover' }} />
              </Hover3DCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-primary)', textAlign: 'center' }}>
        <div className="container">
          <ScrollReveal>
            <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1.5rem' }}>Ready to transform your smile?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Join thousands of happy patients who trust Dr. Amit Kumar Dubey for their dental care needs.
            </p>
            <a href="/contact" className="btn-glow" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
              Schedule Your Visit Today
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
