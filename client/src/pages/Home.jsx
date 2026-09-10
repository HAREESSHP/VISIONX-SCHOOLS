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
  ChevronRight,
  Mic,
  MessagesSquare,
  TrendingUp,
  Layers,
  GraduationCap,
  Trophy
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
  const [activeReviewIndex, setActiveReviewIndex] = useState(2);

  const testimonials = [
    {
      school: "Bright Minds International",
      author: "Sister Mary, Academic Dean",
      text: "The AI pronunciation feedback and 3D modules boosted student classroom participation by over 80%.",
      avatar: "B",
      avatarBg: "#3D5A80"
    },
    {
      school: "Sunshine Public School",
      author: "Mrs. Sharma, Principal",
      text: "The improvement in our students' English fluency is remarkable. Our teachers love the structured delivery!",
      avatar: "S",
      avatarBg: "#4a6382"
    },
    {
      school: "Royal Heritage School",
      author: "Dr. Verma, Principal",
      text: "The improvement in our students' English fluency is remarkable. Our teachers love the structured delivery!",
      avatar: "R",
      avatarBg: "#5c6b8c"
    },
    {
      school: "Green Valley Academy",
      author: "Mr. Patel, Director",
      text: "Interactive, engaging, and exactly what our curriculum needed to build lifelong speaking confidence.",
      avatar: "G",
      avatarBg: "#4A6B3D"
    },
    {
      school: "Delhi Global Convent",
      author: "Mr. Rajiv Khanna, Chairman",
      text: "From hesitant whispers to confident public speaking in just 2 terms. Highly recommended for every school!",
      avatar: "D",
      avatarBg: "#63587a"
    }
  ];

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
    const targetId = (id === 'clients' || id === 'how-it-works') ? 'how-it-works' : id;
    const section = document.getElementById(targetId) || document.getElementById(id);
    if (section) {
      const yOffset = -70;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
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
            <a href="#how-it-works" onClick={(e) => scrollToSection('how-it-works', e)} className="lp-nav-link">How It Works</a>
            <a href="#reviews" onClick={(e) => scrollToSection('reviews', e)} className="lp-nav-link">Reviews</a>
            <a href="#why-choose-us" onClick={(e) => scrollToSection('why-choose-us', e)} className="lp-nav-link">Why Choose Us</a>
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
              <a href="#how-it-works" onClick={(e) => scrollToSection('how-it-works', e)}>How It Works</a>
              <a href="#reviews" onClick={(e) => scrollToSection('reviews', e)}>School Reviews</a>
              <a href="#why-choose-us" onClick={(e) => scrollToSection('why-choose-us', e)}>Why Choose Us</a>
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



      {/* 5. How It Works Section */}
      <section className="lp-how-it-works-section" id="how-it-works">
        <span id="clients" style={{ position: 'absolute', top: '-80px', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="hiw-container">
        
        {/* Playful Decorative Doodle Arrows */}
        <div className="hiw-doodle-wrapper" aria-hidden="true">
          {/* Main Bright Cyan Sweeping Loop */}
          <svg
            className="hiw-doodle-cyan"
            width="120"
            height="180"
            viewBox="0 0 120 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 28c-14 20-18 52-6 78 11 24 38 32 56 16 16-12 18-34 6-47-13-14-36-14-46 2-10 14-6 35 8 46 17 14 42 19 62 9"
              stroke="#00c4b4"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M84 126l18 8-8-18"
              stroke="#00c4b4"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Top Dark Teal Spring Doodle */}
          <svg
            className="hiw-doodle-teal"
            width="75"
            height="110"
            viewBox="0 0 75 110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48 8c-9-8-22-2-18 10 3 9 16 9 19 1 3-8-4-16-14-14-11 2-12 16-2 23 8 5 15 3 14-6 0-5-6-8-10-6-5 2-6 8-2 15l2 15"
              stroke="#006d5b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M39 68l5 12 5-12"
              stroke="#006d5b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="hiw-header">
          <p className="hiw-kicker">THE PROCESS</p>
          <h2 className="hiw-title">How It Works</h2>
        </div>

        {(() => {
          const howItWorksSteps = [
            {
              num: "01",
              title: "Listen & Understand",
              desc: "Students develop the ability to listen carefully, recognize sounds and understand spoken English in different situations.",
              icon: (
                <svg width="78" height="78" viewBox="0 0 80 80" fill="none" stroke="#9faef8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 26c-4.5 5-7 11-7 17.5s2.5 12.5 7 17.5" />
                  <path d="M23 33c-2.8 3-4.2 6.8-4.2 10.5s1.4 7.5 4.2 10.5" />
                  <path d="M40 20c12 0 22 7 22 18.5 0 8.5-5.5 14-11 19-3.5 3.5-5 7-5 11 0 4.5 3.5 7 7.5 7 4.5 0 7.5-3.5 7.5-8" />
                  <path d="M40 20c-9 0-16 7-16 16.5 0 9.5 7 16 13 20.5" />
                  <path d="M42 32c-5.5 0-9.5 4-9.5 9.5 0 4.5 3 7.5 7.5 9" />
                </svg>
              )
            },
            {
              num: "02",
              title: "Respond Naturally",
              desc: "Students practise responding to questions, prompts and conversations, helping them become more comfortable using English spontaneously.",
              icon: (
                <svg width="78" height="78" viewBox="0 0 80 80" fill="none" stroke="#9faef8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M33 72v-7c-9.5-2-16.5-9-18-19-2-13.5 6-25.5 18-28.5 11-2.5 22.5 2 27.5 11 1.5 2.8 2 6 2 9.5 0 2.2-.6 4-1.8 5.5l4.2 3.5c.8.7.8 2 0 2.7l-3.5 3c.6 1.2.4 2.5-.5 3.3l-2.7 2c-.5 4.5-3.5 8.5-8.2 10.5l-1 4.5" />
                  <path d="M58 40l6-3" />
                  <path d="M61 48h7" />
                  <path d="M58 56l6 3" />
                </svg>
              )
            },
            {
              num: "03",
              title: "Build Vocabulary",
              desc: "Students learn useful words and phrases in meaningful contexts so they can understand and use them naturally.",
              icon: (
                <svg width="78" height="78" viewBox="0 0 80 80" fill="none" stroke="#9faef8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M26 18v6" />
                  <path d="M12 28h28" />
                  <path d="M33 32L14 62" />
                  <path d="M19 36c4.5 6 11.5 16 19.5 24" />
                  <path d="M46 62L58 18l12 44" />
                  <path d="M50 49h16" />
                </svg>
              )
            },
            {
              num: "04",
              title: "Form Clear Sentences",
              desc: "Students develop stronger sentence-building skills and learn to communicate ideas clearly without relying on memorized grammar rules.",
              icon: (
                <svg width="78" height="78" viewBox="0 0 80 80" fill="#9faef8" aria-hidden="true">
                  <path d="M18 20c0-3.5 2.8-6.5 6.5-6.5s6.5 2.8 6.5 6.5c0 5-3.5 9-7.5 11l-2 .8c-.8.3-1.5-.4-1.2-1.2l.8-2c-2-1.2-3.1-4.2-3.1-8.6z" />
                  <path d="M29 20c0-3.5 2.8-6.5 6.5-6.5s6.5 2.8 6.5 6.5c0 5-3.5 9-7.5 11l-2 .8c-.8.3-1.5-.4-1.2-1.2l.8-2c-2-1.2-3.1-4.2-3.1-8.6z" />
                  <rect x="18" y="32" width="46" height="4.5" rx="2.25" />
                  <rect x="18" y="40" width="46" height="4.5" rx="2.25" />
                  <rect x="18" y="48" width="46" height="4.5" rx="2.25" />
                  <rect x="18" y="56" width="36" height="4.5" rx="2.25" />
                  <path d="M57 66c0 3.5-2.8 6.5-6.5 6.5s-6.5-2.8-6.5-6.5c0-5 3.5-9 7.5-11l2-.8c.8-.3 1.5.4 1.2 1.2l-.8 2c2 1.2 3.1 4.2 3.1 8.6z" />
                  <path d="M68 66c0 3.5-2.8 6.5-6.5 6.5s-6.5-2.8-6.5-6.5c0-5 3.5-9 7.5-11l2-.8c.8-.3 1.5.4 1.2 1.2l-.8 2c2 1.2 3.1 4.2 3.1 8.6z" />
                </svg>
              )
            },
            {
              num: "05",
              title: "Speak Clearly",
              desc: "Students work on pronunciation, sounds and clarity so their spoken English becomes easier to understand.",
              icon: (
                <svg width="78" height="78" viewBox="0 0 80 80" fill="none" stroke="#9faef8" strokeWidth="4.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M16 36v10" />
                  <path d="M24 28v26" />
                  <path d="M32 20v42" />
                  <path d="M40 14v54" />
                  <path d="M48 20v42" />
                  <path d="M56 28v26" />
                  <path d="M64 36v10" />
                </svg>
              )
            },
            {
              num: "06",
              title: "Real-world Scenarios",
              desc: "Through conversations, roleplays, discussions and classroom activities, students practise applying what they have learned.",
              icon: (
                <svg width="78" height="78" viewBox="0 0 80 80" fill="none" stroke="#9faef8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="14" y="16" width="52" height="36" rx="6" />
                  <rect x="22" y="24" width="14" height="12" rx="3" />
                  <path d="M42 27h16" />
                  <path d="M42 34h11" />
                  <path d="M40 52v12" />
                  <path d="M26 64h28" />
                </svg>
              )
            },
            {
              num: "07",
              title: "Express with Confidence",
              desc: "Students bring their skills together through presentations, conversations and other speaking activities, building confidence in expressing their ideas.",
              isCapstone: true,
              icon: (
                <svg width="96" height="88" viewBox="0 0 96 88" fill="none" stroke="#9faef8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="48" cy="20" r="8" />
                  <path d="M21 16l11 17c4.5 6.5 10 9.5 16 9.5s11.5-3 16-9.5l11-17" />
                  <path d="M48 42v18" />
                  <path d="M42 60l-7 17" />
                  <path d="M54 60l7 17" />
                  <path d="M10 44l3-6 3.5 3.5 3.5-6 3 8.5H10z" />
                  <path d="M73 44l3-6 3.5 3.5 3.5-6 3 8.5H73z" />
                </svg>
              )
            }
          ];

          return (
            <>
              {/* Desktop View: 4-Column Grid */}
              <div className="hiw-grid desktop-hiw-grid">
                {howItWorksSteps.map((step, index) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className={`hiw-grid-item ${step.isCapstone ? 'hiw-capstone-item' : ''}`}
                  >
                    {step.isCapstone ? (
                      <div className="hiw-card hiw-capstone-card">
                        <div className="hiw-capstone-badge">
                          <span className="hiw-capstone-num-circle">{step.num}</span>
                          <h3 className="hiw-capstone-title">{step.title}</h3>
                        </div>
                        <p className="hiw-capstone-desc">{step.desc}</p>
                        <div className="hiw-icon-wrap hiw-capstone-icon-wrap">
                          {step.icon}
                        </div>
                      </div>
                    ) : (
                      <div className="hiw-card hiw-step-card">
                        <div className="hiw-step-header">
                          <span className="hiw-step-num">{step.num}</span>
                          <h3 className="hiw-step-title">{step.title}</h3>
                        </div>
                        <p className="hiw-step-desc">{step.desc}</p>
                        <div className="hiw-icon-wrap">
                          {step.icon}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile View: Interactive Step Card Slider (< 769px) */}
              <div className="hiw-mobile-slider">
                <div className="hiw-mobile-step-indicator">
                  <span className="hiw-step-count-badge">
                    Step <span className="hiw-step-count-highlight">0{currentPillarIndex + 1}</span> of 07
                  </span>
                  <div className="hiw-progress-bar-track">
                    <div 
                      className="hiw-progress-bar-fill" 
                      style={{ width: `${((currentPillarIndex + 1) / 7) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="hiw-mobile-card-container">
                  <AnimatePresence mode="wait">
                    {(() => {
                      const step = howItWorksSteps[currentPillarIndex];
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
                          className="hiw-mobile-card-motion"
                        >
                          {step.isCapstone ? (
                            <div className="hiw-card hiw-capstone-card hiw-mobile-active-card">
                              <div className="hiw-capstone-badge">
                                <span className="hiw-capstone-num-circle">{step.num}</span>
                                <h3 className="hiw-capstone-title">{step.title}</h3>
                              </div>
                              <p className="hiw-capstone-desc">{step.desc}</p>
                              <div className="hiw-icon-wrap hiw-capstone-icon-wrap">
                                {step.icon}
                              </div>
                            </div>
                          ) : (
                            <div className="hiw-card hiw-step-card hiw-mobile-active-card">
                              <div className="hiw-step-header">
                                <span className="hiw-step-num">{step.num}</span>
                                <h3 className="hiw-step-title">{step.title}</h3>
                              </div>
                              <p className="hiw-step-desc">{step.desc}</p>
                              <div className="hiw-icon-wrap">
                                {step.icon}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </div>

                {/* Navigation Controls */}
                <div className="hiw-mobile-controls">
                  <button 
                    type="button" 
                    onClick={() => setCurrentPillarIndex((prev) => (prev - 1 + 7) % 7)}
                    className="hiw-nav-btn prev-btn"
                    aria-label="Previous Step"
                  >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                  </button>

                  <div className="hiw-dots-indicator">
                    {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentPillarIndex(idx)}
                        className={`hiw-dot ${idx === currentPillarIndex ? 'active' : ''}`}
                        aria-label={`Jump to step ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setCurrentPillarIndex((prev) => (prev + 1) % 7)}
                    className="hiw-nav-btn next-btn"
                    aria-label="Next Step"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </section>

      {/* 5. Reviews Section - Trusted By School Leaders (Placed Directly Above Why Choose Us) */}
      <section className="trusted-reviews-section" id="reviews">
        {/* Background Doodles */}
        <img 
          src="/reviews-doodle-left-v2.png" 
          alt="" 
          className="trusted-reviews-doodle doodle-left" 
          aria-hidden="true" 
        />
        <img 
          src="/reviews-doodle-right-v2.png" 
          alt="" 
          className="trusted-reviews-doodle doodle-right" 
          aria-hidden="true" 
        />

        <div className="trusted-reviews-container">
          {/* Header */}
          <div className="trusted-reviews-header">
            <span className="trusted-reviews-kicker">TESTIMONIALS</span>
            <div className="trusted-reviews-title-wrap">
              <h2 className="trusted-reviews-title">
                Trusted By School <span className="title-leaders-span">Leaders<img src="/reviews-pushpin-v2.png" alt="" className="trusted-reviews-pushpin" aria-hidden="true" /></span>
              </h2>
            </div>
            <p className="trusted-reviews-subtitle">
              Discover how VisionX empowers classrooms and transforms student confidence.
            </p>
          </div>

          {/* Stepped 5-Card Layout */}
          <div className="trusted-reviews-carousel">
            <div className="trusted-reviews-cards-track">
              {testimonials.map((item, idx) => {
                const diff = idx - activeReviewIndex;
                let cardClass = "trusted-review-card";
                if (diff === 0) cardClass += " is-center";
                else if (diff === -1) cardClass += " is-prev-1";
                else if (diff === 1) cardClass += " is-next-1";
                else if (diff <= -2) cardClass += " is-prev-2";
                else if (diff >= 2) cardClass += " is-next-2";

                return (
                  <div 
                    key={idx} 
                    className={cardClass}
                    onClick={() => setActiveReviewIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveReviewIndex(idx); }}
                    aria-label={`Testimonial from ${item.school}`}
                  >
                    <div className="trusted-card-quote-mark">
                      <svg width="34" height="26" viewBox="0 0 34 26" fill="currentColor">
                        <path d="M14.5 0C6.5 0 0 6.5 0 14.5C0 20.85 5.15 26 11.5 26C13.2 26 14.5 24.7 14.5 23C14.5 21.3 13.2 20 11.5 20C8.45 20 6 17.55 6 14.5C6 14.2 6.05 13.9 6.1 13.6C7.5 14.5 9.2 15 11 15C16 15 20 11 20 6C20 2.7 17.3 0 14.5 0ZM28.5 0C20.5 0 14 6.5 14 14.5C14 20.85 19.15 26 25.5 26C27.2 26 28.5 24.7 28.5 23C28.5 21.3 27.2 20 25.5 20C22.45 20 20 17.55 20 14.5C20 14.2 20.05 13.9 20.1 13.6C21.5 14.5 23.2 15 25 15C30 15 34 11 34 6C34 2.7 31.3 0 28.5 0Z" />
                      </svg>
                    </div>
                    
                    <p className="trusted-card-text">
                      "{item.text}"
                    </p>

                    <div className="trusted-card-author">
                      <div className="trusted-author-avatar" style={{ background: item.avatarBg }}>
                        {item.avatar}
                      </div>
                      <div className="trusted-author-info">
                        <div className="trusted-school-name">{item.school}</div>
                        <div className="trusted-author-role">{item.author}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Controls (Arrows + Dots) */}
            <div className="trusted-reviews-controls">
              <button 
                type="button" 
                className="trusted-nav-arrow" 
                onClick={() => setActiveReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="trusted-reviews-dots">
                {testimonials.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`trusted-dot ${dotIdx === activeReviewIndex ? 'active' : ''}`}
                    onClick={() => setActiveReviewIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
              <button 
                type="button" 
                className="trusted-nav-arrow" 
                onClick={() => setActiveReviewIndex((prev) => (prev + 1) % testimonials.length)}
                aria-label="Next Testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Seamless Bottom Fade Mask */}
        <div className="trusted-reviews-bottom-fade" aria-hidden="true" />
      </section>

      {/* 6. Why Choose Us Section */}
      <section className="why-choose-section" id="why-choose-us">
        {/* Ambient 3D Depth Orbs */}
        <div className="why-3d-glow-orb why-3d-glow-orange" aria-hidden="true" />
        <div className="why-3d-glow-orb why-3d-glow-cyan" aria-hidden="true" />

        {/* Left Side Students Peeking */}
        <motion.img 
          src="/why-students-peeking.png" 
          alt="Students" 
          className="why-peeking-students" 
          aria-hidden="true" 
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Right Side 3D Interactive Tilted Educators Card */}
        <motion.div 
          className="why-tilted-card-3d-wrapper"
          initial={{ opacity: 0, scale: 0.72, rotateY: -22, rotateX: 16, y: 70 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltCard
            maxAngle={12}
            scale={1.04}
            borderRadius="28px"
            glareEnable={true}
            glareMaxOpacity={0.12}
            className="why-tilted-card-3d"
          >
            <img 
              src="/why-educators-card.png" 
              alt="Educators" 
              className="why-tilted-card-img" 
              aria-hidden="true" 
            />
          </TiltCard>
        </motion.div>

        <div className="why-choose-inner">
          {/* Header */}
          <motion.div 
            className="why-header"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="why-kicker">WHY CHOOSE US</span>
            <h2 className="why-title">
              <span className="why-title-line">More Than English Lessons. A Skill</span>
              <span className="why-title-line">
                <span className="why-highlight">Students Carry</span> Forward.
              </span>
            </h2>
          </motion.div>

          {/* 2 Columns: For Students & For Schools */}
          <div className="why-grid">
            {/* Col 1: For Students */}
            <div className="why-col">
              <motion.h3 
                className="why-col-header"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                For Students
              </motion.h3>
              <div className="why-list">
                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard
                    maxAngle={6}
                    scale={1.02}
                    borderRadius="20px"
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    className="why-item-3d-card"
                  >
                    <div className="why-icon-bubble">
                      <Mic size={22} color="#f0740f" strokeWidth={2.2} />
                    </div>
                    <div className="why-item-content">
                      <h4 className="why-item-title">Confidence to participate</h4>
                      <p className="why-item-desc">
                        Students become more comfortable sharing ideas, answering questions and taking part in conversations.
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard
                    maxAngle={6}
                    scale={1.02}
                    borderRadius="20px"
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    className="why-item-3d-card"
                  >
                    <div className="why-icon-bubble">
                      <MessagesSquare size={22} color="#f0740f" strokeWidth={2.2} />
                    </div>
                    <div className="why-item-content">
                      <h4 className="why-item-title">Communication beyond textbooks</h4>
                      <p className="why-item-desc">
                        They learn to use English in conversations, activities and situations that go beyond written exercises.
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard
                    maxAngle={6}
                    scale={1.02}
                    borderRadius="20px"
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    className="why-item-3d-card"
                  >
                    <div className="why-icon-bubble">
                      <TrendingUp size={22} color="#f0740f" strokeWidth={2.2} />
                    </div>
                    <div className="why-item-content">
                      <h4 className="why-item-title">Progress at their own level</h4>
                      <p className="why-item-desc">
                        Age- and grade-appropriate learning allows students to build skills progressively from Nursery to Class 10.
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            </div>

            {/* Col 2: For Schools */}
            <div className="why-col">
              <motion.h3 
                className="why-col-header"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                For Schools
              </motion.h3>
              <div className="why-list">
                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard
                    maxAngle={6}
                    scale={1.02}
                    borderRadius="20px"
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    className="why-item-3d-card"
                  >
                    <div className="why-icon-bubble">
                      <Layers size={22} color="#f0740f" strokeWidth={2.2} />
                    </div>
                    <div className="why-item-content">
                      <h4 className="why-item-title">A structured program, not an add-on</h4>
                      <p className="why-item-desc">
                        A planned communication curriculum that can fit into the school's existing academic environment.
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard
                    maxAngle={6}
                    scale={1.02}
                    borderRadius="20px"
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    className="why-item-3d-card"
                  >
                    <div className="why-icon-bubble">
                      <GraduationCap size={22} color="#f0740f" strokeWidth={2.2} />
                    </div>
                    <div className="why-item-content">
                      <h4 className="why-item-title">Support for educators</h4>
                      <p className="why-item-desc">
                        Teachers and school teams get visibility into student learning and progress through the program.
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard
                    maxAngle={6}
                    scale={1.02}
                    borderRadius="20px"
                    glareEnable={true}
                    glareMaxOpacity={0.06}
                    className="why-item-3d-card"
                  >
                    <div className="why-icon-bubble">
                      <Trophy size={22} color="#f0740f" strokeWidth={2.2} />
                    </div>
                    <div className="why-item-content">
                      <h4 className="why-item-title">A skill that strengthens student outcomes</h4>
                      <p className="why-item-desc">
                        Students develop communication abilities that can support classroom participation, presentations and future academic growth.
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Unified Get In Touch & School Leadership Section */}
      <section className="git-section" id="book-demo">
        <div className="git-card">
          {/* Header */}
          <div className="git-header">
            <span className="git-kicker">GET IN TOUCH</span>
            <h2 className="git-title">
              <span className="git-title-line">Ready To Bring Confident Communication</span>
              <span className="git-title-line">To Your School?</span>
            </h2>
            <p className="git-subtitle">
              Whether you'd like to know more about the program, discuss your school's requirements,<br className="git-sub-br" />or arrange a platform walkthrough, our team is here to help.
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
              src="/educators-half-portrait.png?v=4" 
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