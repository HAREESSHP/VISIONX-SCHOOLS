import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import TiltCard from '../components/TiltCard';
import Hero3DScene from '../components/Hero3DScene';
import About3DVisual from '../components/About3DVisual';

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
      setScrolled(window.scrollY > 40);
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

    try {
      const response = await fetch("https://formsubmit.co/ajax/visionx236@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Demo Request - ${demoForm.schoolName}`,
          School_Name: demoForm.schoolName,
          Contact_Person: demoForm.name,
          Phone: demoForm.phone,
          Email: demoForm.email,
          Message: demoForm.message || "No message provided",
          _template: "table"
        })
      });

      if (response.ok) {
        setDemoStatus({ type: 'success', message: 'Thank you! Your demo request has been received.' });
        setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
      } else {
        setDemoStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setDemoStatus({ type: 'error', message: 'Failed to send request. Please check your connection.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lp-container">
      {/* 1. Navbar */}
      <motion.nav 
        className={`lp-navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="lp-navbar-inner">
          <div className="lp-nav-left">
            <img src="/visionx-logo.png" alt="VISIONX Logo" className="lp-logo-icon" />
            <span className="lp-logo-text">VISIONX</span>
          </div>

          <div className="lp-nav-center">
            <a href="#about" className="lp-nav-link">About</a>
            <a href="#reviews" className="lp-nav-link">Reviews</a>
            <a href="#clients" className="lp-nav-link">Student Path</a>
            <a href="#contact" className="lp-nav-link">Contact</a>
          </div>

          <div className="lp-nav-right">
            <motion.a 
              href="#book-demo" 
              className="lp-btn lp-btn-outline lp-btn-sm"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Book Demo
            </motion.a>
            {user ? (
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to={user.role === 'ADMIN' ? '/admin' : user.className ? '/dashboard' : '/class-selection'} className="lp-btn lp-btn-primary lp-btn-sm">
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link to="/login" className="lp-btn lp-btn-secondary lp-btn-sm">Student/Teacher Login</Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* 2. Hero Section with Real WebGL 3D Scene */}
      <section className="lp-hero" id="home">
        <motion.div 
          className="lp-hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
              <motion.a 
                href="#about" 
                className="lp-btn lp-btn-primary lp-btn-lg"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Explore Platform
              </motion.a>
              <motion.a 
                href="#book-demo" 
                className="lp-btn lp-btn-secondary lp-btn-lg"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Book Live Demo
              </motion.a>
            </div>

            <div className="lp-scroll-mouse" aria-label="Scroll down">
              <span className="lp-scroll-wheel"></span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lp-hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Hero3DScene />
        </motion.div>
      </section>

      {/* 3. About Section with 3D Visual & Interactive Features */}
      <section className="lp-about-grid-section" id="about">
        <div className="lp-about-split">
          <motion.div 
            className="lp-about-text-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lp-badge" style={{ background: 'rgba(196, 163, 105, 0.2)', color: 'var(--golden-tan)', borderColor: 'rgba(196, 163, 105, 0.4)' }}>
              Our Educational Mission
            </div>
            <h2 className="lp-section-title" style={{ color: 'var(--surface-offwhite)' }}>
              Learning Designed <em>For</em> Children, Not Delivered <em>At</em> Them.
            </h2>
            <p className="lp-section-desc" style={{ color: 'var(--surface-cream)' }}>
              We started VisionX with a single mission: to turn classroom English learning into an active, enjoyable spoken experience. 
              Our platform blends guided AI speech training with structured lesson delivery that supports educators.
            </p>

            <div className="about-3d-highlights">
              <TiltCard maxAngle={10} scale={1.03} borderRadius="18px" className="about-highlight-box">
                <span className="highlight-emoji">🎯</span>
                <div>
                  <strong>Active Speech Training</strong>
                  <p>Guided oral drills that eliminate hesitation.</p>
                </div>
              </TiltCard>
              <TiltCard maxAngle={10} scale={1.03} borderRadius="18px" className="about-highlight-box">
                <span className="highlight-emoji">📊</span>
                <div>
                  <strong>Measurable Outcomes</strong>
                  <p>Granular progress tracking for each student.</p>
                </div>
              </TiltCard>
            </div>
          </motion.div>

          <motion.div 
            className="lp-about-visual-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <About3DVisual />
          </motion.div>
        </div>
      </section>

      {/* 4. Reviews Section with 3D Cards */}
      <section className="lp-reviews" id="reviews">
        <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
          <div className="lp-badge" style={{ margin: '0 auto 1rem' }}>Testimonials</div>
          <h2 className="lp-section-title" style={{ color: 'var(--surface-offwhite)' }}>Trusted by School Leaders</h2>
          <p className="lp-section-subtitle">Discover how VisionX empowers classrooms and transforms student confidence.</p>
        </div>

        <div className="lp-carousel-wrapper">
          <div className="lp-carousel-track">
            {[1, 2].map((loop) => (
              <React.Fragment key={loop}>
                <TiltCard maxAngle={10} scale={1.04} borderRadius="24px" className="lp-review-card-3d">
                  <div className="lp-review-header">
                    <div className="lp-review-avatar">S</div>
                    <div className="lp-review-info">
                      <h4>Sunshine Public School</h4>
                      <span>Mrs. Sharma, Principal</span>
                    </div>
                  </div>
                  <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                  <p className="lp-review-text">"The improvement in our students' English fluency is remarkable. Our teachers love the structured delivery!"</p>
                </TiltCard>
                <TiltCard maxAngle={10} scale={1.04} borderRadius="24px" className="lp-review-card-3d">
                  <div className="lp-review-header">
                    <div className="lp-review-avatar" style={{ background: 'linear-gradient(180deg, #4A6B3D 0%, #35502A 100%)' }}>G</div>
                    <div className="lp-review-info">
                      <h4>Green Valley Academy</h4>
                      <span>Mr. Patel, Director</span>
                    </div>
                  </div>
                  <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                  <p className="lp-review-text">"Interactive, engaging, and exactly what our curriculum needed to build lifelong speaking confidence."</p>
                </TiltCard>
                <TiltCard maxAngle={10} scale={1.04} borderRadius="24px" className="lp-review-card-3d">
                  <div className="lp-review-header">
                    <div className="lp-review-avatar" style={{ background: 'linear-gradient(180deg, #C4A369 0%, #9D7E45 100%)' }}>R</div>
                    <div className="lp-review-info">
                      <h4>Royal Heritage School</h4>
                      <span>Dr. Verma, Principal</span>
                    </div>
                  </div>
                  <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                  <p className="lp-review-text">"Students genuinely look forward to their Spoken English classes. A complete game changer for our school!"</p>
                </TiltCard>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Student Journey Section with 3D Stepped Pathway */}
      <section className="lp-clients" id="clients">
        <div className="lp-clients-header">
          <p className="lp-clients-kicker">Structured Step-by-Step Growth</p>
          <h2 className="lp-section-title lp-text-center">The 7-Pillar Fluency Journey</h2>
          <p className="lp-section-subtitle lp-text-center">A comprehensive 3D progressive pathway engineered for every learner.</p>
        </div>

        <div className="journey-3d-grid">
          {[
            { num: "01", icon: "🎧", title: "Active Listening", desc: "Absorb natural phonetics, rhythm, and intonation through immersive stories." },
            { num: "02", icon: "🗣️", title: "Guided Speaking", desc: "Structured voice prompts build muscle memory and overcome speech hesitation." },
            { num: "03", icon: "📚", title: "Contextual Vocab", desc: "Learn essential vocabulary situated in everyday, real-world situations." },
            { num: "04", icon: "✍️", title: "Intuitive Grammar", desc: "Master sentence structures naturally without dry rote memorization." },
            { num: "05", icon: "🎙️", title: "Accent Precision", desc: "Fine-tune clarity, diction, and syllable stress with feedback loops." },
            { num: "06", icon: "💬", title: "Roleplay Scenarios", desc: "Apply spoken English in mock debates, interviews, and public presentations." },
            { num: "07", icon: "🏆", title: "Confident Mastery", desc: "Deliver speeches and participate in conversations with complete confidence." }
          ].map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <TiltCard
                maxAngle={9}
                scale={1.03}
                borderRadius="22px"
                className="journey-3d-card"
              >
                <div className="journey-card-top">
                  <span className="journey-3d-num">{step.num}</span>
                  <span className="journey-3d-icon">{step.icon}</span>
                </div>
                <h4 className="journey-card-title">{step.title}</h4>
                <p className="journey-card-desc">{step.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Book Demo Section with Split 3D Perks */}
      <section className="lp-demo" id="book-demo">
        <div className="lp-demo-split-wrapper">
          {/* Left Perks Side */}
          <motion.div 
            className="demo-perks-side"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lp-badge" style={{ background: 'var(--sage-bg)', color: 'var(--sage-green)' }}>
              School Partnership
            </div>
            <h2 className="lp-section-title" style={{ color: 'var(--surface-offwhite)' }}>
              Ready to Transform Your School's English Standards?
            </h2>
            <p className="lp-section-desc" style={{ color: 'var(--surface-cream)' }}>
              Book a live walkthrough tailored for principals, directors, and department heads. We'll show you how VisionX integrates seamlessly into your timetable.
            </p>

            <div className="demo-3d-badges">
              <TiltCard maxAngle={8} scale={1.03} borderRadius="16px" className="demo-perk-card">
                <span className="perk-3d-icon">⚡</span>
                <div>
                  <strong>Turnkey School Setup</strong>
                  <p>Full student & teacher IDs generated in under 24 hours.</p>
                </div>
              </TiltCard>
              <TiltCard maxAngle={8} scale={1.03} borderRadius="16px" className="demo-perk-card">
                <span className="perk-3d-icon">🔒</span>
                <div>
                  <strong>Protected Student Data</strong>
                  <p>Role-based access security built specifically for schools.</p>
                </div>
              </TiltCard>
              <TiltCard maxAngle={8} scale={1.03} borderRadius="16px" className="demo-perk-card">
                <span className="perk-3d-icon">📈</span>
                <div>
                  <strong>Principal Analytics</strong>
                  <p>Live visibility into class-by-class student learning pace.</p>
                </div>
              </TiltCard>
            </div>
          </motion.div>

          {/* Right 3D Form Card */}
          <motion.div 
            className="demo-form-side"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TiltCard
              maxAngle={6}
              scale={1.01}
              borderRadius="26px"
              className="lp-demo-card"
            >
              <h3 className="lp-section-title text-center" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                Schedule Platform Demo
              </h3>
              <p className="lp-section-subtitle text-center" style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Fill out the details below and our team will contact you.
              </p>
              
              <form className="lp-form" onSubmit={handleDemoSubmit}>
                <div className="lp-form-row">
                  <div className="lp-form-group">
                    <label>School Name</label>
                    <input type="text" name="schoolName" value={demoForm.schoolName} onChange={handleDemoChange} required placeholder="e.g. Sunshine Public School" />
                  </div>
                  <div className="lp-form-group">
                    <label>Contact Person</label>
                    <input type="text" name="name" value={demoForm.name} onChange={handleDemoChange} required placeholder="e.g. Mr. Sharma (Principal)" />
                  </div>
                </div>
                <div className="lp-form-row">
                  <div className="lp-form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={demoForm.phone} onChange={handleDemoChange} required placeholder="+91 98765 43210" />
                  </div>
                  <div className="lp-form-group">
                    <label>Official Email</label>
                    <input type="email" name="email" value={demoForm.email} onChange={handleDemoChange} required placeholder="principal@school.com" />
                  </div>
                </div>
                <div className="lp-form-group">
                  <label>Message (Optional)</label>
                  <textarea name="message" value={demoForm.message} onChange={handleDemoChange} rows="3" placeholder="Tell us about student count or grade requirements..."></textarea>
                </div>

                {demoStatus && (
                  <div className={`lp-alert lp-alert-${demoStatus.type}`}>
                    {demoStatus.message}
                  </div>
                )}

                <motion.button 
                  type="submit" 
                  className="lp-btn lp-btn-primary lp-btn-block lp-btn-lg" 
                  disabled={submitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {submitting ? 'Submitting Request...' : 'Request School Demo →'}
                </motion.button>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* 7. Colorful 3D Footer */}
      <footer className="lp-footer" id="contact">
        <div className="lp-footer-glow-1"></div>
        <div className="lp-footer-glow-2"></div>
        <div className="lp-footer-glow-3"></div>

        {/* Floating Top CTA Ribbon Card */}
        <div className="lp-footer-cta-container">
          <TiltCard maxAngle={5} scale={1.01} borderRadius="24px" className="lp-footer-cta-card">
            <div className="cta-card-left">
              <span className="cta-sparkle-pill">✨ Empower Your Classroom</span>
              <h3 className="cta-card-heading">Ready to revolutionize English speaking at your school?</h3>
              <p className="cta-card-sub">Join over 100+ partner schools and watch your students speak with confidence.</p>
            </div>
            <div className="cta-card-right">
              <a href="#book-demo" className="lp-btn lp-btn-vibrant">
                <span>Book a Live Demo →</span>
              </a>
            </div>
          </TiltCard>
        </div>

        <div className="lp-footer-main">
          <div className="lp-footer-grid">
            {/* Column 1: Brand & Bio */}
            <div className="lp-footer-col brand-col">
              <div className="footer-brand-title">
                <img src="/visionx-logo.png" alt="VISIONX Logo" className="footer-brand-logo" />
                <span className="footer-brand-name">VISIONX</span>
              </div>
              <p className="lp-footer-desc">
                Pioneering joyful, active, and structured spoken English learning for schools across India.
              </p>
              <div className="footer-pill-badges">
                <span className="pill-badge pill-terracotta">🎯 Spoken English</span>
                <span className="pill-badge pill-gold">⭐ CEFR Aligned</span>
                <span className="pill-badge pill-sage">🏫 100+ Schools</span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lp-footer-col">
              <h4 className="lp-footer-heading">Navigation</h4>
              <ul className="footer-nav-links">
                <li><a href="#home" className="footer-link"><span className="link-bullet bullet-coral"></span>Home</a></li>
                <li><a href="#about" className="footer-link"><span className="link-bullet bullet-gold"></span>About VisionX</a></li>
                <li><a href="#reviews" className="footer-link"><span className="link-bullet bullet-sage"></span>School Reviews</a></li>
                <li><a href="#clients" className="footer-link"><span className="link-bullet bullet-indigo"></span>Fluency Journey</a></li>
                <li><a href="#book-demo" className="footer-link"><span className="link-bullet bullet-teal"></span>Request Demo</a></li>
                <li><Link to="/login" className="footer-link"><span className="link-bullet bullet-amber"></span>Student/Teacher Portal</Link></li>
                <li><Link to="/admin-login" className="footer-link"><span className="link-bullet bullet-purple"></span>Admin Access</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Channels */}
            <div className="lp-footer-col contact-col">
              <h4 className="lp-footer-heading">Get in Touch</h4>
              <div className="footer-contact-cards">
                <a href="tel:+919381304491" className="contact-card-chip chip-phone">
                  <span className="contact-chip-icon">📞</span>
                  <div>
                    <small>Call Support</small>
                    <strong>+91 93813 04491</strong>
                  </div>
                </a>

                <a href="mailto:visionx236@gmail.com" className="contact-card-chip chip-email">
                  <span className="contact-chip-icon">📧</span>
                  <div>
                    <small>Email Inquiries</small>
                    <strong>visionx236@gmail.com</strong>
                  </div>
                </a>

                <div className="contact-card-chip chip-location">
                  <span className="contact-chip-icon">📍</span>
                  <div>
                    <small>Headquarters</small>
                    <strong>Hyderabad, Telangana, India</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-footer-bottom-bar">
            <p className="copyright-text">
              © 2026 <strong>Vision English Platform</strong>. All Rights Reserved.
            </p>
            <p className="developer-credit">
              Crafted with <span className="heart-pulse">❤️</span> by{' '}
              <a 
                href="https://linkedin.com/in/hareesh-ai-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dev-gradient-link"
              >
                Hareesh
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}