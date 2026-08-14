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

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setDemoStatus(null);
    try {
      await api.post('/demo', demoForm);
      setDemoStatus({ type: 'success', message: 'Demo request submitted successfully! Our team will contact you soon.' });
      setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
    } catch (error) {
      setDemoStatus({ type: 'error', message: error.message || 'Failed to submit demo request.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lp-container">
      {/* Navbar */}
      <nav className={`lp-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="lp-navbar-inner">
          <div className="lp-nav-left">
            <span className="lp-logo-icon">🎓</span>
            <span className="lp-logo-text">VISIONX</span>
          </div>

          <div className="lp-nav-center">
            <a href="#about" className="lp-nav-link">About</a>
            <a href="#reviews" className="lp-nav-link">Reviews</a>
            <a href="#clients" className="lp-nav-link">Clients</a>
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
          <h2 className="lp-section-title">About Our Company</h2>
          <p className="lp-section-desc">
            We are dedicated to transforming how school students learn Spoken English. 
            By integrating our dynamic curriculum with advanced technology, we help 
            students build confidence, expand their vocabulary, and master grammar intuitively.
          </p>
          <div className="lp-highlights">
            <div className="lp-highlight-card">
              <div className="lp-highlight-icon">👨‍🏫</div>
              <div className="lp-highlight-text">Experienced Trainers</div>
            </div>
            <div className="lp-highlight-card">
              <div className="lp-highlight-icon">🎮</div>
              <div className="lp-highlight-text">Interactive Learning</div>
            </div>
            <div className="lp-highlight-card">
              <div className="lp-highlight-icon">🤝</div>
              <div className="lp-highlight-text">Trusted by Schools</div>
            </div>
          </div>
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
        <h2 className="lp-section-title lp-text-center">Our Trusted Schools</h2>
        <div className="lp-clients-grid">
          <div className="lp-client-logo">
            <span className="lp-client-icon">🏫</span>
            <span className="lp-client-name">Sunshine Public</span>
          </div>
          <div className="lp-client-logo">
            <span className="lp-client-icon">🎓</span>
            <span className="lp-client-name">Green Valley</span>
          </div>
          <div className="lp-client-logo">
            <span className="lp-client-icon">🎒</span>
            <span className="lp-client-name">Royal Heritage</span>
          </div>
          <div className="lp-client-logo">
            <span className="lp-client-icon">🏛️</span>
            <span className="lp-client-name">Elite International</span>
          </div>
          <div className="lp-client-logo">
            <span className="lp-client-icon">🚌</span>
            <span className="lp-client-name">Bright Future</span>
          </div>
          <div className="lp-client-logo">
            <span className="lp-client-icon">🏢</span>
            <span className="lp-client-name">Modern Academy</span>
          </div>
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
      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-col">
            <div className="lp-footer-logo">
              <span className="lp-logo-icon">🎓</span> VISIONX
            </div>
            <p className="lp-footer-desc">
              The premier Spoken English platform empowering students to communicate confidently.
            </p>
          </div>
          <div className="lp-footer-col">
            <h4 className="lp-footer-heading">Quick Links</h4>
            <div className="lp-footer-links">
              <a href="#about">About</a>
              <a href="#reviews">Reviews</a>
              <a href="#clients">Clients</a>
              <a href="#book-demo">Book Demo</a>
              <Link to="/login">Student Login</Link>
              <Link to="/login">Admin Login</Link>
            </div>
          </div>
          <div className="lp-footer-col">
            <h4 className="lp-footer-heading">Contact Us</h4>
            <div className="lp-footer-contact">
              <p>Email: contact@visionx.edu</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Education Park, Tech City, IN</p>
            </div>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>Designed & Developed by Hareesh</p>
          <p>© 2026 VisionX. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}