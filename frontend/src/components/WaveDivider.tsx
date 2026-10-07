
const WaveDivider = () => (
  <div style={{ width: '100%', overflow: 'hidden', lineHeight: 0, padding: '2rem 0', position: 'relative', zIndex: 0 }}>
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '60px', display: 'block' }}>
      <path d="M0 40C300 80 600 0 900 60C1200 120 1440 50 1440 50" stroke="#d5b866" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M0 50C300 90 600 10 900 70C1200 130 1440 60 1440 60" stroke="#087BC1" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  </div>
);

export default WaveDivider;
