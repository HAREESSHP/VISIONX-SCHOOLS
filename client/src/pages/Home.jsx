import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function Home() {
  const { user } = useAuth();
  
  // States for demo form
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    message: ''
  });
  const [demoStatus, setDemoStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoChange = (e) => {
    setDemoForm({
      ...demoForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Build email message with form details
    const subject = encodeURIComponent(`Demo Request - ${demoForm.schoolName}`);
    const body = encodeURIComponent(
      [
        'Hello VISIONX! I would like to book a free demo.',
        '',
        `School Name: ${demoForm.schoolName}`,
        `Contact Person: ${demoForm.name}`,
        `Phone: ${demoForm.phone}`,
        `Email: ${demoForm.email}`,
        demoForm.message ? `Message: ${demoForm.message}` : ''
      ].join('\n')
    );

    const mailtoUrl = `mailto:visionx236@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setDemoStatus({ type: 'success', message: 'Opening email to send your demo request...' });
    setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
    setSubmitting(false);
  };

  return (
    <div className="lp-container">
      {/* Navbar */}
      <nav className={`lp-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="lp-navbar-inner">
          <div className="lp-nav-left">
            <img src="/visionx-logo.png" alt="VISIONX Logo" className="lp-logo-icon" />
          </div>

          <div className="lp-nav-center">
            <a href="#about" className="lp-nav-link">About</a>
            <a href="#reviews" className="lp-nav-link">Reviews</a>
            <a href="#clients" className="lp-nav-link">Benefits</a>
            <a href="#contact" className="lp-nav-link">Contact Us</a>
          </div>

          <div className="lp-nav-right">
            <a href="#book-demo" className="lp-btn lp-btn-outline lp-btn-sm">Book Demo</a>
            {user ? (
              <Link to={user.role === 'ADMIN' ? '/admin' : '/class-selection'} className="lp-btn lp-btn-primary lp-btn-sm">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="lp-btn lp-btn-ghost lp-btn-sm">Student Login</Link>
                <Link to="/login" className="lp-btn lp-btn-primary lp-btn-sm">Admin Login</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="lp-hero" id="home">
        <div className="lp-hero-visual">
          <div className="lp-image-card">
            <div className="lp-hero-illustration">
              <div className="lp-illustration-inner">
                <span className="lp-emoji-large">👦</span>
                <div className="lp-magnifier">
                  <div className="lp-magnifier-ring"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lp-hero-content">
          <div className="lp-badge">Spoken English Excellence for Schools</div>
          <h1 className="lp-hero-title">
            Empowering Students with <span className="lp-highlight">Confident English Communication</span>
          </h1>
          <p className="lp-hero-desc">
            Deliver structured spoken English programs that improve communication skills, confidence,
            pronunciation, and classroom participation from Nursery to Grade 10.
          </p>
          <div className="lp-hero-bottom-row">
            <div className="lp-hero-actions">
              <a href="#about" className="lp-btn lp-btn-primary lp-btn-lg">Learn More</a>
              <a href="#book-demo" className="lp-btn lp-btn-secondary lp-btn-lg">Book Demo</a>
            </div>

            <div className="lp-scroll-mouse" aria-label="Scroll down">
              <span className="lp-scroll-wheel"></span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="lp-about" id="about">
        <div className="lp-about-visual">
          <div className="lp-about-illustration">
             <span className="lp-emoji-large">🏫</span>
          </div>
        </div>
        <div className="lp-about-content">
          <h2 className="lp-section-title">About VisionX</h2>
          <p className="lp-section-desc">
            We started VisionX with one belief: children engage when learning feels designed for them, not delivered at them.
            We work alongside schools to bring that idea into the classroom through practical, easy-to-use tools that help teachers teach better and students learn with confidence.
          </p>
          <p className="lp-section-desc">
            Every feature is built around one question: does this make a lesson easier to teach, or easier to learn? From classroom delivery to teacher support and learner progress, we focus on experiences that are engaging, measurable, and genuinely useful in real school environments.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="lp-reviews" id="reviews">
        <h2 className="lp-section-title lp-text-center">What Schools Say</h2>
        <p className="lp-section-subtitle lp-text-center">Join hundreds of schools already using VISIONX</p>
        <div className="lp-carousel-wrapper">
          <div className="lp-carousel-track">
            {/* Render items twice to create seamless infinite loop effect */}
            {[1, 2].map((loop) => (
              <React.Fragment key={loop}>
                <div className="lp-review-card">
                  <div className="lp-review-header">
                    <div className="lp-review-avatar">S</div>
                    <div className="lp-review-info">
                      <h4>Sunshine Public School</h4>
                      <span>Mrs. Sharma, Principal</span>
                    </div>
                  </div>
                  <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                  <p className="lp-review-text">"The improvement in our students' English fluency is remarkable. Highly recommended!"</p>
                </div>
                <div className="lp-review-card">
                  <div className="lp-review-header">
                    <div className="lp-review-avatar">G</div>
                    <div className="lp-review-info">
                      <h4>Green Valley Academy</h4>
                      <span>Mr. Patel, Director</span>
                    </div>
                  </div>
                  <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                  <p className="lp-review-text">"Interactive, engaging, and exactly what our curriculum needed to boost confidence."</p>
                </div>
                <div className="lp-review-card">
                  <div className="lp-review-header">
                    <div className="lp-review-avatar">R</div>
                    <div className="lp-review-info">
                      <h4>Royal Heritage School</h4>
                      <span>Dr. Verma, Principal</span>
                    </div>
                  </div>
                  <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                  <p className="lp-review-text">"Students look forward to their Spoken English classes. A game changer!"</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="lp-clients" id="clients">
        <div className="lp-clients-header">
          <p className="lp-clients-kicker">What Schools Get With VisionX</p>
          <h2 className="lp-section-title lp-text-center">More Than English Lessons</h2>
          <p className="lp-section-subtitle lp-text-center">A complete learning experience designed for students, teachers, and school leadership.</p>
        </div>

        <div className="lp-flow-map">
          <p className="lp-flow-student">Student:</p>
          <ol className="lp-student-flow" aria-label="Student spoken English learning flow map">
            <li className="lp-flow-node">Learn English</li>
            <li className="lp-flow-node">Listen and Understand</li>
            <li className="lp-flow-node">Speak and Practice</li>
            <li className="lp-flow-node">Build Vocabulary</li>
            <li className="lp-flow-node">Improve Pronunciation</li>
            <li className="lp-flow-node">Use English in Real-Life Situations</li>
            <li className="lp-flow-node lp-flow-node-final">Speak with Confidence</li>
          </ol>
        </div>
      </section>

      {/* Book Demo Section */}
      <section className="lp-demo" id="book-demo">
        <div className="lp-demo-container">
          <div className="lp-demo-card">
            <h2 className="lp-section-title lp-text-center">Book a Free Demo</h2>
            <p className="lp-section-subtitle lp-text-center">Transform your school's English curriculum today.</p>
            
            <form className="lp-form" onSubmit={handleDemoSubmit}>
              <div className="lp-form-row">
                <div className="lp-form-group">
                  <label>School Name</label>
                  <input type="text" name="schoolName" value={demoForm.schoolName} onChange={handleDemoChange} required placeholder="e.g. Sunshine Public School" />
                </div>
                <div className="lp-form-group">
                  <label>Contact Person</label>
                  <input type="text" name="name" value={demoForm.name} onChange={handleDemoChange} required placeholder="e.g. Mr. Sharma" />
                </div>
              </div>
              <div className="lp-form-row">
                <div className="lp-form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={demoForm.phone} onChange={handleDemoChange} required placeholder="+91 98765 43210" />
                </div>
                <div className="lp-form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={demoForm.email} onChange={handleDemoChange} required placeholder="principal@school.com" />
                </div>
              </div>
              <div className="lp-form-group">
                <label>Message (Optional)</label>
                <textarea name="message" value={demoForm.message} onChange={handleDemoChange} rows="4" placeholder="Tell us about your requirements..."></textarea>
              </div>

              {demoStatus && (
                <div className={`lp-alert lp-alert-${demoStatus.type}`}>
                  {demoStatus.message}
                </div>
              )}

              <button type="submit" className="lp-btn lp-btn-primary lp-btn-block lp-btn-lg" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer" id="contact">
        <div className="lp-footer-tagline">
          Making English Learning Fun for Every Student
        </div>
        <div className="lp-footer-content">
          <div className="lp-footer-col">
            <div className="lp-footer-logo">
              <img src="/visionx-logo.png" alt="VISIONX Logo" className="lp-footer-logo-img" />
            </div>
            <p className="lp-footer-desc">
              Helping schools empower students with confidence,
              communication, and interactive spoken English learning.
            </p>
          </div>
          <div className="lp-footer-col">
            <h4 className="lp-footer-heading">Quick Links</h4>
            <div className="lp-footer-links">
              <a href="#about">About Us</a>
              <a href="#book-demo">Book a Demo</a>
              <a href="#clients">Partner Schools</a>
            </div>
          </div>
          <div className="lp-footer-col">
            <h4 className="lp-footer-heading">Contact</h4>
            <div className="lp-footer-contact">
              <p>📞 +91 93813 04491</p>
              <p>📧 visionx236@gmail.com</p>
              <p>📍 Hyderabad, India</p>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>© 2026 Vision English Platform</p>
          <p>Designed & Developed by <a href="https://linkedin.com/in/hareesh-ai-dev" target="_blank" rel="noopener noreferrer" className="lp-footer-credit-link">Hareesh</a></p>
        </div>
      </footer>
    </div>
  );
}