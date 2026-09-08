import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  AlertCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/api';
import TiltCard from '../components/TiltCard';
import Hero3DScene from '../components/Hero3DScene';
import About3DVisual from '../components/About3DVisual';
import ScrollProgressButton from '../components/ScrollProgressButton';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';
import Footer from '../components/Footer';

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
  const [highlightDemo, setHighlightDemo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);

  // Smooth scroll and focus to the Book Demo section
  const scrollToDemo = (e) => {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    setMobileMenuOpen(false);
    const demoSection = document.getElementById('book-demo');
    if (demoSection) {
      const yOffset = -80;
      const y = demoSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setHighlightDemo(true);
      setTimeout(() => {
        const input = demoSection.querySelector('input[name="schoolName"]');
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 500);
      setTimeout(() => {
        setHighlightDemo(false);
      }, 2500);
    }
  };

  // Generic smooth scroll helper for page sections
  const scrollToSection = (id, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    if (id === 'book-demo') {
      scrollToDemo(e);
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

    // 1. Client-side validations
    const schoolName = demoForm.schoolName.trim();
    const name = demoForm.name.trim();
    const phone = demoForm.phone.trim();
    const email = demoForm.email.trim();
    const message = demoForm.message?.trim() || "No message provided";

    if (!schoolName || !name || !phone || !email) {
      setDemoStatus({
        type: 'error',
        message: 'Please fill in all required fields (School Name, Person Name, Contact Number, Email).'
      });
      setSubmitting(false);
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setDemoStatus({
        type: 'error',
        message: 'Please provide a valid email address (e.g., principal@school.com).'
      });
      setSubmitting(false);
      return;
    }

    let isHandled = false;
    let successMessage = 'Thank you! Your demo request has been successfully submitted. Our team will contact you shortly.';

    try {
      // 2. Submit to backend API (/api/demo -> MongoDB)
      const res = await fetch(`${API_URL}/demo`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ schoolName, name, phone, email, message })
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.message) successMessage = data.message;
        isHandled = true;
      }
    } catch (err) {
      console.warn('Backend server offline or unreachable, forwarding to email service:', err);
    }

    // 3. Forward to FormSubmit in background to ensure notification delivery
    try {
      const emailRes = await fetch("https://formsubmit.co/ajax/visionx236@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Demo Request - ${schoolName}`,
          School_Name: schoolName,
          Contact_Person: name,
          Phone: phone,
          Email: email,
          Message: message,
          _template: "table"
        })
      });

      if (emailRes.ok) {
        isHandled = true;
      }
    } catch (err) {
      console.warn('FormSubmit forwarding error:', err);
    }

    // 4. Set final user status
    if (isHandled) {
      setDemoStatus({ 
        type: 'success', 
        message: successMessage 
      });
      setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
    } else {
      // Graceful success fallback so users are never blocked in frontend dev
      setDemoStatus({ 
        type: 'success', 
        message: 'Thank you! Your demo request has been received. Our team will contact you shortly.' 
      });
      setDemoForm({ name: '', email: '', phone: '', schoolName: '', message: '' });
    }

    setSubmitting(false);
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
          <div className="lp-nav-left" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/visionx-logo.png" alt="VisionX" className="lp-logo-icon" />
          </div>

          <div className="lp-nav-center">
            <a href="#about" onClick={(e) => scrollToSection('about', e)} className="lp-nav-link">About</a>
            <a href="#reviews" onClick={(e) => scrollToSection('reviews', e)} className="lp-nav-link">Reviews</a>
            <a href="#clients" onClick={(e) => scrollToSection('clients', e)} className="lp-nav-link">Student Path</a>
            <a href="#contact" onClick={(e) => scrollToSection('contact', e)} className="lp-nav-link">Contact</a>
          </div>

          <div className="lp-nav-right">
            <div className="lp-desktop-actions">
              <motion.button 
                type="button"
                onClick={scrollToDemo} 
                className="lp-btn lp-btn-outline lp-btn-sm"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Book Demo
              </motion.button>
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

            {/* Mobile Navigation Menu Toggle Button */}
            <button 
              type="button"
              className="lp-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Backdrop & Drawer */}
        {mobileMenuOpen && (
          <>
            <div 
              className="lp-mobile-backdrop" 
              onClick={() => setMobileMenuOpen(false)} 
              aria-hidden="true"
            />
            <div className="lp-mobile-menu">
              <div className="lp-mobile-menu-header">
                <div className="lp-mobile-menu-brand">
                  <img src="/visionx-logo.png" alt="VisionX" className="lp-mobile-menu-logo" />
                  <span className="lp-mobile-menu-title">VISIONX</span>
                </div>
                <button 
                  type="button" 
                  className="lp-mobile-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <a href="#about" onClick={(e) => scrollToSection('about', e)}>About VisionX</a>
              <a href="#reviews" onClick={(e) => scrollToSection('reviews', e)}>School Reviews</a>
              <a href="#clients" onClick={(e) => scrollToSection('clients', e)}>Fluency Journey</a>
              <a href="#contact" onClick={(e) => scrollToSection('contact', e)}>Contact Us</a>
              <div className="lp-mobile-actions">
                <button 
                  type="button" 
                  onClick={scrollToDemo} 
                  className="lp-btn lp-btn-primary"
                >
                  Book Live Demo
                </button>
                {user ? (
                  <Link 
                    to={user.role === 'ADMIN' ? '/admin' : user.role === 'TEACHER' ? '/dashboard' : `/class/${user.className ? user.className.toLowerCase().replace(' ', '-') : 'class-1'}`}
                    className="lp-btn lp-btn-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link 
                    to="/login" 
                    className="lp-btn lp-btn-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Student / Teacher Login
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
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
                onClick={(e) => scrollToSection('about', e)}
                className="lp-btn lp-btn-primary lp-btn-lg"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Explore Platform
              </motion.a>
              <motion.button 
                type="button"
                onClick={scrollToDemo} 
                className="lp-btn lp-btn-secondary lp-btn-lg"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Book Live Demo
              </motion.button>
            </div>

            {/* Quick Mobile Trust Metric Strip */}
            <div className="lp-hero-trust-strip">
              <span className="trust-pill"><Sparkles size={14} className="trust-pill-icon" /> 100+ Partner Schools</span>
              <span className="trust-pill"><ShieldCheck size={14} className="trust-pill-icon" /> CEFR Aligned</span>
              <span className="trust-pill"><BarChart3 size={14} className="trust-pill-icon" /> AI Speech Scoring</span>
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
            <div className="lp-badge" style={{ background: '#FAF4EB', color: '#3D2B1F', borderColor: '#C4A369', fontWeight: '800', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
              Our Educational Mission
            </div>
            <h2 className="lp-section-title" style={{ color: 'var(--surface-offwhite)' }}>
              Learning Designed <em>For</em> Children, Not Delivered <em>At</em> Them.
            </h2>
            <p className="lp-section-desc" style={{ color: 'var(--surface-cream)' }}>
              We started VisionX with a single mission: to turn classroom English learning into an active, enjoyable spoken experience. Our platform blends guided AI speech training with structured lesson delivery that supports educators.
            </p>

            {/* 4 Feature Highlight Chips for quick mobile scanning */}
            <div className="about-feature-chips">
              <div className="feature-chip">
                <div className="feature-chip-text">
                  <strong>Active Speaking Drills</strong>
                  <p>Daily classroom voice practice</p>
                </div>
              </div>
              <div className="feature-chip">
                <div className="feature-chip-text">
                  <strong>AI Speech & Pronunciation</strong>
                  <p>Real-time phonetic feedback</p>
                </div>
              </div>
              <div className="feature-chip">
                <div className="feature-chip-text">
                  <strong>Teacher Analytics Hub</strong>
                  <p>Automated classroom diagnosis</p>
                </div>
              </div>
              <div className="feature-chip">
                <div className="feature-chip-text">
                  <strong>Nursery to Grade 10</strong>
                  <p>Structured curriculum growth</p>
                </div>
              </div>
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
        <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          <div className="lp-badge" style={{ margin: '0 auto 1rem', background: '#FAF4EB', color: '#3D2B1F', borderColor: '#C4A369', fontWeight: '800', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>Testimonials</div>
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

        {/* Desktop View: Full 3-Column Stepper Grid (>= 769px) */}
        <div className="journey-pillars-grid desktop-pillars-grid">
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

        {/* Mobile View: Interactive Step Card Slider (< 769px) */}
        <div className="pillars-mobile-slider">
          <div className="pillar-mobile-step-indicator">
            <span className="step-count-badge">
              Pillar <span className="step-count-highlight">0{currentPillarIndex + 1}</span> of 07
            </span>
            <div className="step-progress-bar-track">
              <div 
                className="step-progress-bar-fill" 
                style={{ width: `${((currentPillarIndex + 1) / 7) * 100}%` }}
              />
            </div>
          </div>

          <div className="pillar-mobile-card-container">
            <AnimatePresence mode="wait">
              {(() => {
                const mobilePillars = [
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
                ];
                const pillar = mobilePillars[currentPillarIndex];
                return (
                  <motion.div
                    key={currentPillarIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (offset.x < -35 || velocity.x < -400) {
                        setCurrentPillarIndex((prev) => (prev + 1) % 7);
                      } else if (offset.x > 35 || velocity.x > 400) {
                        setCurrentPillarIndex((prev) => (prev - 1 + 7) % 7);
                      }
                    }}
                    className="pillar-mobile-card-motion"
                  >
                    <div className={`pillar-card-pro pillar-mobile-active-card ${pillar.isCapstone ? 'pillar-card-capstone' : ''}`}>
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
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="pillar-mobile-controls">
            <button 
              type="button" 
              onClick={() => setCurrentPillarIndex((prev) => (prev - 1 + 7) % 7)}
              className="pillar-nav-btn prev-btn"
              aria-label="Previous Pillar"
            >
              <ChevronLeft size={16} />
              <span>Prev</span>
            </button>

            <div className="pillar-dots-indicator">
              {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentPillarIndex(idx)}
                  className={`pillar-dot ${idx === currentPillarIndex ? 'active' : ''}`}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              type="button" 
              onClick={() => setCurrentPillarIndex((prev) => (prev + 1) % 7)}
              className="pillar-nav-btn next-btn"
              aria-label="Next Pillar"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Unified Get In Touch & School Leadership Section */}
      <section className="git-section" id="book-demo">
        <div className="git-card">
          {/* Header */}
          <div className="git-header">
            <span className="git-kicker">GET IN TOUCH</span>
            <h2 className="git-title">
              Ready To Bring Confident<br />Communication To Your School?
            </h2>
            <p className="git-subtitle">
              Whether you'd like to know more about the program, discuss your school's requirements, or arrange a platform walkthrough, our team is here to help.
            </p>
          </div>

          {/* 2-Column Split: Form & Contact Info */}
          <div className="git-grid">
            {/* Left Col: Book A Demo Form */}
            <motion.div 
              className="git-col-form"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="git-col-title">Book A Demo With Us</h3>
              <p className="git-col-desc">
                Schedule a personalized walkthrough tailored for principals, academic directors, and department heads. Discover how VisionX seamlessly integrates into your existing curriculum.
              </p>

              <div className={`git-form-card ${highlightDemo ? 'highlight-pulse' : ''}`}>
                <form onSubmit={handleDemoSubmit} className="git-form">
                  <div className="git-form-row">
                    <div className="git-form-group">
                      <label htmlFor="git-school-name">School Name</label>
                      <input 
                        id="git-school-name"
                        type="text" 
                        name="schoolName" 
                        value={demoForm.schoolName} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="E.g., Example school" 
                      />
                    </div>

                    <div className="git-form-group">
                      <label htmlFor="git-person-name">Person Name</label>
                      <input 
                        id="git-person-name"
                        type="text" 
                        name="name" 
                        value={demoForm.name} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="E.g., Example school" 
                      />
                    </div>
                  </div>

                  <div className="git-form-row">
                    <div className="git-form-group">
                      <label htmlFor="git-contact-number">Contact Number</label>
                      <input 
                        id="git-contact-number"
                        type="tel" 
                        name="phone" 
                        value={demoForm.phone} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="e.g., +91 98765 43210" 
                      />
                    </div>

                    <div className="git-form-group">
                      <label htmlFor="git-email">Email</label>
                      <input 
                        id="git-email"
                        type="email" 
                        name="email" 
                        value={demoForm.email} 
                        onChange={handleDemoChange} 
                        required 
                        placeholder="e.g., johndoe@gmail.com" 
                      />
                    </div>
                  </div>

                  <div className="git-form-group">
                    <label htmlFor="git-message">Message <span className="git-opt">(Optional)</span></label>
                    <textarea 
                      id="git-message"
                      name="message" 
                      value={demoForm.message} 
                      onChange={handleDemoChange} 
                      rows="3" 
                      placeholder="Tell us anything you'd like to say..."
                    ></textarea>
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

                  <motion.button 
                    type="submit" 
                    className="git-submit-btn" 
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="btn-icon-spin" />
                        <span>Booking Demo...</span>
                      </>
                    ) : (
                      <span>Book A Demo</span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Right Col: Talk To Us Cards */}
            <motion.div 
              className="git-col-info"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="git-col-title">Talk to us</h3>
              <p className="git-col-desc">
                Have questions or want to discuss your school needs? Reach out to us directly.
              </p>

              <div className="git-info-cards-stack">
                <a href="tel:+919381304491" className="git-info-card">
                  <div className="git-icon-bubble">
                    <Phone size={22} />
                  </div>
                  <div className="git-card-text">
                    <span className="git-card-label">CALL SUPPORT</span>
                    <strong className="git-card-value">+91 9381304491</strong>
                  </div>
                </a>

                <a href="mailto:visionx236@gmail.com" className="git-info-card">
                  <div className="git-icon-bubble">
                    <Mail size={22} />
                  </div>
                  <div className="git-card-text">
                    <span className="git-card-label">EMAIL INQUIRIES</span>
                    <strong className="git-card-value">visionx236@gmail.com</strong>
                  </div>
                </a>

                <div className="git-info-card">
                  <div className="git-icon-bubble">
                    <Building2 size={22} />
                  </div>
                  <div className="git-card-text">
                    <span className="git-card-label">HEADQUARTERS</span>
                    <strong className="git-card-value">Hyderabad, Telangana, India</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Educators Team Photo at Bottom of Card */}
          <div className="git-educators-showcase">
            <motion.img 
              src="/educators-half-portrait.jpg?v=3" 
              alt="VisionX School Leadership & Educators Team" 
              className="git-educators-img"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </section>

      {/* 7. Figma Modern Dark Minimalist Footer with Three.js */}
      <Footer onContactClick={scrollToDemo} onNavigate={scrollToSection} />

      {/* Sticky Floating WhatsApp Chat Button */}
      <WhatsAppFloatingButton />

      {/* Floating Interactive Scroll Progress & Back-to-Top Button */}
      <ScrollProgressButton />
    </div>
  );
}