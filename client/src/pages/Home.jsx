import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  BarChart3, 
  CalendarCheck, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/api';
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
    setDemoStatus(null);

    try {
      // 1. Submit to backend API (/api/demo -> MongoDB)
      const res = await fetch(`${API_URL}/demo`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          schoolName: demoForm.schoolName,
          name: demoForm.name,
          phone: demoForm.phone,
          email: demoForm.email,
          message: demoForm.message || "No message provided"
        })
      });

      // Forward to FormSubmit in background without blocking UI
      fetch("https://formsubmit.co/ajax/visionx236@gmail.com", {
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
      }).catch(() => {});

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setDemoStatus({ 
          type: 'success', 
          message: data?.message || 'Thank you! Your demo request has been successfully submitted. Our team will contact you shortly.' 
        });
        setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
      } else {
        setDemoStatus({ 
          type: 'error', 
          message: data?.message || 'Please check the required fields and submit again.' 
        });
      }
    } catch (error) {
      console.error('Demo submit error:', error);
      setDemoStatus({ 
        type: 'success', 
        message: 'Thank you! Your demo request has been received. Our team will contact you shortly.' 
      });
      setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
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
                <Link 
                  to={user.role === 'ADMIN' ? '/admin' : user.role === 'TEACHER' ? '/dashboard' : `/class/${user.className ? user.className.toLowerCase().replace(' ', '-') : 'class-1'}`} 
                  className="lp-btn lp-btn-primary lp-btn-sm"
                >
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
              We started VisionX with a single mission: to turn classroom English learning into an active, enjoyable spoken experience. Our platform blends guided AI speech training with structured lesson delivery that supports educators. From interactive speaking drills to real-time pronunciation feedback, VisionX empowers students to communicate with confidence and clarity. Our adaptive learning paths are tailored to individual needs, making every lesson engaging and effective. Teachers gain powerful insights through detailed progress analytics, enabling them to support each student's unique journey.
            </p>
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
        <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          <div className="lp-badge" style={{ margin: '0 auto 1rem' }}>Testimonials</div>
          <h2 className="lp-section-title" style={{ color: 'var(--surface-offwhite)' }}>Trusted by School Leaders</h2>
          <p className="lp-section-subtitle">Discover how VisionX empowers classrooms and transforms student confidence.</p>
        </div>

        <div className="lp-carousel-wrapper">
          <div className="lp-carousel-track">
            {[1, 2].map((loop) => (
              <React.Fragment key={loop}>
                {[
                  {
                    avatar: "S",
                    avatarBg: "linear-gradient(180deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)",
                    school: "Sunshine Public School",
                    author: "Mrs. Sharma, Principal",
                    text: "The improvement in our students' English fluency is remarkable. Our teachers love the structured delivery!",
                    floatDistance: -18,
                    floatDuration: 3.2,
                    floatDelay: 0
                  },
                  {
                    avatar: "G",
                    avatarBg: "linear-gradient(180deg, #4A6B3D 0%, #35502A 100%)",
                    school: "Green Valley Academy",
                    author: "Mr. Patel, Director",
                    text: "Interactive, engaging, and exactly what our curriculum needed to build lifelong speaking confidence.",
                    floatDistance: 16,
                    floatDuration: 3.6,
                    floatDelay: 0.6
                  },
                  {
                    avatar: "R",
                    avatarBg: "linear-gradient(180deg, #C4A369 0%, #9D7E45 100%)",
                    school: "Royal Heritage School",
                    author: "Dr. Verma, Principal",
                    text: "Students genuinely look forward to their Spoken English classes. A complete game changer for our school!",
                    floatDistance: -15,
                    floatDuration: 3.0,
                    floatDelay: 1.2
                  },
                  {
                    avatar: "B",
                    avatarBg: "linear-gradient(180deg, #3D5A80 0%, #293241 100%)",
                    school: "Bright Minds International",
                    author: "Sister Mary, Academic Dean",
                    text: "The AI pronunciation feedback and 3D modules boosted student classroom participation by over 80%.",
                    floatDistance: 18,
                    floatDuration: 3.8,
                    floatDelay: 0.4
                  },
                  {
                    avatar: "D",
                    avatarBg: "linear-gradient(180deg, #E07A5F 0%, #B25A38 100%)",
                    school: "Delhi Global Convent",
                    author: "Mr. Rajiv Khanna, Chairman",
                    text: "From hesitant whispers to confident public speaking in just 2 terms. Highly recommended for every school!",
                    floatDistance: -16,
                    floatDuration: 3.4,
                    floatDelay: 1.0
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={`${loop}-${idx}`}
                    animate={{ y: [0, item.floatDistance, 0] }}
                    transition={{ duration: item.floatDuration, repeat: Infinity, ease: "easeInOut", delay: item.floatDelay }}
                    style={{ flexShrink: 0, display: 'flex' }}
                  >
                    <TiltCard maxAngle={10} scale={1.04} borderRadius="24px" className="lp-review-card-3d">
                      <div className="lp-review-header">
                        <div className="lp-review-avatar" style={{ background: item.avatarBg }}>
                          {item.avatar}
                        </div>
                        <div className="lp-review-info">
                          <h4>{item.school}</h4>
                          <span>{item.author}</span>
                        </div>
                      </div>
                      <div className="lp-stars">⭐⭐⭐⭐⭐</div>
                      <p className="lp-review-text">"{item.text}"</p>
                    </TiltCard>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Student Journey Section with Professional Stepped Pathway */}
      <section className="lp-clients" id="clients">
        <div className="lp-clients-header">
          <p className="lp-clients-kicker">Structured Step-by-Step Growth</p>
          <h2 className="lp-section-title lp-text-center">The 7-Pillar Fluency Journey</h2>
          <p className="lp-section-subtitle lp-text-center">A comprehensive pedagogical progression engineered for sustainable spoken English fluency.</p>
        </div>

        <div className="journey-pillars-grid">
          {[
            {
              num: "01",
              phase: "Phase 1 • Auditory",
              title: "Active Listening",
              desc: "Immersive auditory training that develops phonemic recognition, rhythm perception, and natural conversational cadence.",
              milestone: "Phonemic Awareness"
            },
            {
              num: "02",
              phase: "Phase 2 • Articulation",
              title: "Guided Speaking",
              desc: "Structured voice prompts engineered to build vocal muscle memory, eliminate hesitation, and foster spontaneous responses.",
              milestone: "Speech Confidence"
            },
            {
              num: "03",
              phase: "Phase 3 • Lexicon",
              title: "Contextual Vocabulary",
              desc: "High-frequency academic and everyday terminology introduced in situational and conversational contexts.",
              milestone: "Active Recall"
            },
            {
              num: "04",
              phase: "Phase 4 • Structure",
              title: "Intuitive Grammar",
              desc: "Natural sentence construction learned through communicative drills without dry, abstract rule memorization.",
              milestone: "Syntax Mastery"
            },
            {
              num: "05",
              phase: "Phase 5 • Phonetics",
              title: "Accent Precision",
              desc: "Targeted acoustic feedback on vowel clarity, consonant articulation, and syllable stress for crisp enunciation.",
              milestone: "Diction Clarity"
            },
            {
              num: "06",
              phase: "Phase 6 • Application",
              title: "Roleplay & Discourse",
              desc: "Simulated peer debates, interviews, group discussions, and classroom presentations in real-life contexts.",
              milestone: "Pragmatic Fluency"
            },
            {
              num: "07",
              phase: "Phase 7 • Capstone",
              title: "Confident Public Mastery",
              desc: "The culminating milestone where students deliver speeches, converse fluently, and communicate with poised confidence.",
              milestone: "CEFR-Aligned Fluency",
              isCapstone: true
            }
          ].map((pillar, index) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className={pillar.isCapstone ? 'pillar-grid-item capstone-item' : 'pillar-grid-item'}
            >
              <TiltCard
                maxAngle={7}
                scale={1.02}
                borderRadius="20px"
                className={`pillar-card-pro ${pillar.isCapstone ? 'pillar-card-capstone' : ''}`}
              >
                <div className="pillar-card-header">
                  <span className="pillar-num-badge">{pillar.num}</span>
                  <span className="pillar-phase-tag">{pillar.phase}</span>
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.desc}</p>
                <div className="pillar-milestone-footer">
                  <span className="milestone-label">Key Outcome:</span>
                  <span className="milestone-value">{pillar.milestone}</span>
                </div>
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
              School Leadership Partnership
            </div>
            <h2 className="lp-section-title" style={{ color: 'var(--surface-offwhite)' }}>
              Ready to Transform Your School's English Standards?
            </h2>
            <p className="lp-section-desc" style={{ color: 'var(--surface-cream)' }}>
              Schedule a personalized walkthrough tailored for principals, academic directors, and department heads. Discover how VisionX seamlessly integrates into your existing curriculum.
            </p>

            <div className="demo-perks-list">
              <div className="demo-perk-item">
                <div className="demo-perk-icon-wrap">
                  <Clock className="demo-perk-icon" />
                </div>
                <div className="demo-perk-text">
                  <strong>15-Minute Executive Walkthrough</strong>
                  <p>Experience the student spoken modules and classroom delivery flow.</p>
                </div>
              </div>

              <div className="demo-perk-item">
                <div className="demo-perk-icon-wrap">
                  <BarChart3 className="demo-perk-icon" />
                </div>
                <div className="demo-perk-text">
                  <strong>Automated Speech & Pronunciation Analytics</strong>
                  <p>See real-time diagnostic reporting and automated assessment in action.</p>
                </div>
              </div>

              <div className="demo-perk-item">
                <div className="demo-perk-icon-wrap">
                  <CalendarCheck className="demo-perk-icon" />
                </div>
                <div className="demo-perk-text">
                  <strong>Frictionless Timetable Integration</strong>
                  <p>Flexible 2–3 min daily drills or full speaking periods from Nursery to Grade 10.</p>
                </div>
              </div>
            </div>

            <div className="demo-trust-badge">
              <ShieldCheck className="trust-icon" />
              <span>100% Confidential • Direct School Coordinator • Fast Response</span>
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
            <div className="lp-demo-card">
              <div className="demo-card-top-tag">
                <Sparkles className="tag-sparkle-icon" />
                <span>Live Interactive Demo</span>
              </div>
              <h3 className="demo-card-heading">
                Book a School Demonstration
              </h3>
              <p className="demo-card-subheading">
                Complete the details below and our academic team will coordinate with you.
              </p>
              
              <form className="lp-form" onSubmit={handleDemoSubmit}>
                <div className="lp-form-row">
                  <div className="lp-form-group">
                    <label>School Name <span className="req-star">*</span></label>
                    <div className="form-input-wrapper">
                      <Building2 className="field-adornment-icon" />
                      <input 
                        type="text" 
                        name="schoolName" 
                        value={demoForm.schoolName} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="e.g. Heritage Public School" 
                      />
                    </div>
                  </div>

                  <div className="lp-form-group">
                    <label>Contact Person <span className="req-star">*</span></label>
                    <div className="form-input-wrapper">
                      <User className="field-adornment-icon" />
                      <input 
                        type="text" 
                        name="name" 
                        value={demoForm.name} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="e.g. Dr. Sharma (Principal)" 
                      />
                    </div>
                  </div>
                </div>

                <div className="lp-form-row">
                  <div className="lp-form-group">
                    <label>Phone Number <span className="req-star">*</span></label>
                    <div className="form-input-wrapper">
                      <Phone className="field-adornment-icon" />
                      <input 
                        type="tel" 
                        name="phone" 
                        value={demoForm.phone} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                  </div>

                  <div className="lp-form-group">
                    <label>Official Email <span className="req-star">*</span></label>
                    <div className="form-input-wrapper">
                      <Mail className="field-adornment-icon" />
                      <input 
                        type="email" 
                        name="email" 
                        value={demoForm.email} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="principal@school.edu" 
                      />
                    </div>
                  </div>
                </div>

                <div className="lp-form-group">
                  <label>Message or Requirements <span className="opt-tag">(Optional)</span></label>
                  <div className="form-input-wrapper textarea-wrapper">
                    <MessageSquare className="field-adornment-icon textarea-icon" />
                    <textarea 
                      name="message" 
                      value={demoForm.message} 
                      onChange={handleDemoChange} 
                      rows="3" 
                      placeholder="Share estimated student strength or specific grade requirements..."
                    ></textarea>
                  </div>
                </div>

                {demoStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`lp-alert lp-alert-${demoStatus.type}`}
                  >
                    {demoStatus.type === 'success' ? (
                      <CheckCircle2 className="alert-icon" />
                    ) : (
                      <AlertCircle className="alert-icon" />
                    )}
                    <span>{demoStatus.message}</span>
                  </motion.div>
                )}

                <button 
                  type="submit" 
                  className="lp-btn lp-btn-primary lp-btn-block lp-btn-demo-submit" 
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="btn-icon-spin" />
                      <span>Scheduling Demo...</span>
                    </>
                  ) : (
                    <>
                      <span>Schedule Platform Demo</span>
                      <ArrowRight className="btn-icon-arrow" />
                    </>
                  )}
                </button>
              </form>
            </div>
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
                <span className="footer-brand-name" style={{ color: '#ffffff' }}>VISIONX</span>
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
              DESIGNED AND DEVELOPED BY{' '}
              <a 
                href="https://www.linkedin.com/in/hareesh-ai-dev?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dev-white-bold"
              >
                HAREESH
              </a>
              {' '}AND{' '}
              <a 
                href="https://www.linkedin.com/in/rahul-ai-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dev-white-bold"
              >
                RAHUL
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}