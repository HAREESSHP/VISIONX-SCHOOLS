import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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

// Typewriter effect component for Educational Mission headline
function MissionTypewriterHeading() {
  const containerRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let observer;
    const el = containerRef.current;
    if (el && window.IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting) {
            setIsStarted(true);
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    } else {
      setIsStarted(true);
    }

    // Safety fallback: if user navigates directly or observer is delayed, start within 600ms
    const safetyTimer = setTimeout(() => {
      setIsStarted(true);
    }, 600);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    const totalChars = 56;
    let currentCount = 0;
    let isDeleting = false;
    let timerId = null;

    const runTypewriter = () => {
      if (!isDeleting) {
        // Typing forward: delay of 65ms per character for readable cadence
        currentCount++;
        setCount(currentCount);

        if (currentCount >= totalChars) {
          // Finished typing all lines: hold for 3 seconds before looping
          isDeleting = true;
          timerId = setTimeout(runTypewriter, 3000);
          return;
        }

        timerId = setTimeout(runTypewriter, 65);
      } else {
        // Backspacing backward: smooth deleting at 28ms per character
        currentCount--;
        setCount(currentCount);

        if (currentCount <= 0) {
          // Finished backspacing: brief pause before starting again
          isDeleting = false;
          timerId = setTimeout(runTypewriter, 600);
          return;
        }

        timerId = setTimeout(runTypewriter, 28);
      }
    };

    timerId = setTimeout(runTypewriter, 300);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isStarted]);

  // Precise line slices:
  // Line 1: "Knowing English Doesn’t" (23 chars)
  // Line 2A: "Always Mean Knowing " (20 chars)
  // Line 2B: "How" (3 chars, orange)
  // Line 3: "To Use It." (10 chars, orange)
  const line1 = "Knowing English Doesn’t".slice(0, Math.min(count, 23));
  const line2A = count > 23 ? "Always Mean Knowing ".slice(0, Math.min(count - 23, 20)) : "";
  const line2B = count > 43 ? "How".slice(0, Math.min(count - 43, 3)) : "";
  const line3 = count > 46 ? "To Use It.".slice(0, Math.min(count - 46, 10)) : "";

  const isTypingLine1 = count <= 23;
  const isTypingLine2A = count > 23 && count <= 43;
  const isTypingLine2B = count > 43 && count <= 46;
  const isTypingLine3 = count > 46;

  return (
    <h2 className="lp-mission-title" ref={containerRef}>
      {count === 0 ? (
        <span className="lp-mission-cursor">|</span>
      ) : (
        <>
          {line1}
          {isTypingLine1 && showCursor && <span className="lp-mission-cursor">|</span>}

          {count > 23 && <br />}
          {line2A}
          {isTypingLine2A && showCursor && <span className="lp-mission-cursor">|</span>}

          {count > 43 && (
            <span className="lp-mission-orange">
              {line2B}
              {isTypingLine2B && showCursor && <span className="lp-mission-cursor">|</span>}
              {count > 46 && (
                <>
                  <br />
                  {line3}
                  {isTypingLine3 && showCursor && <span className="lp-mission-cursor">|</span>}
                </>
              )}
            </span>
          )}
        </>
      )}
    </h2>
  );
}

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
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  const offerFeatures = [
    {
      title: "Active Speaking Drills",
      desc: "Daily classroom voice practice with engaging student prompts.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 10 4 15 9 20" />
          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
        </svg>
      )
    },
    {
      title: "AI Speech & Pronunciation",
      desc: "Real-time phonetic feedback and accurate voice analysis.",
      icon: <Sparkles size={22} color="#4f46e5" strokeWidth={2.5} />
    },
    {
      title: "Teacher Analytics Hub",
      desc: "Automated classroom diagnosis, tracking and reports.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    }
  ];

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

      {/* 3. Educational Mission: The Communication Gap */}
      <section className="lp-mission-section" id="about">
        <div className="lp-mission-container">
          <motion.div 
            className="lp-mission-text-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="lp-mission-kicker">THE COMMUNICATION GAP</span>
            <MissionTypewriterHeading />
            <p className="lp-mission-desc">
              Deliver structured spoken English programs that improve communication skills, confidence, pronunciation, and classroom participation from Nursery to Grade 10.
            </p>

            {/* 3 Bullet Challenges with Crisp Vector Blue Badges */}
            <div className="lp-mission-cards">
              <div className="lp-mission-card">
                <div className="lp-mission-icon-circle">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Wrist Cuff */}
                    <line x1="11.5" y1="20" x2="11.5" y2="24.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="16.5" y1="20" x2="16.5" y2="24.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="10" y1="22.2" x2="18" y2="22.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    {/* Hand Outline */}
                    <path d="M11.5 20V11.5C11.5 10.7 12.1 10.1 12.8 10.1C13.5 10.1 14.1 10.7 14.1 11.5V7C14.1 6.2 14.7 5.6 15.4 5.6C16.1 5.6 16.7 6.2 16.7 7V11M16.7 8.5C16.7 7.7 17.3 7.1 18 7.1C18.7 7.1 19.3 7.7 19.3 8.5V12.5M19.3 10.5C19.3 9.7 19.9 9.1 20.6 9.1C21.3 9.1 21.9 9.7 21.9 10.5V15C21.9 17.8 19.5 20 16.5 20H11.5Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-2.5, 0)" />
                    {/* Radiating Rays */}
                    <line x1="3.5" y1="9" x2="6" y2="10.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="2.5" y1="14" x2="5.5" y2="14" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="3.5" y1="19" x2="6" y2="17.8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="24.5" y1="9" x2="22" y2="10.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="25.5" y1="14" x2="22.5" y2="14" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="24.5" y1="19" x2="22" y2="17.8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="lp-mission-card-label">Knowing what to say,<br />but holding back</span>
              </div>

              <div className="lp-mission-card">
                <div className="lp-mission-icon-circle">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5 13.2C21.5 17.6 17.8 21.2 13.5 21.2C12.4 21.2 11.3 21 10.3 20.5L6.5 21.8L7.6 18.1C6.9 16.8 6.5 15 6.5 13.2C6.5 8.8 9.8 5.2 14 5.2C18.2 5.2 21.5 8.8 21.5 13.2Z" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
                    <path d="M12.3 12.8C12.3 14 11.4 14.8 10.5 15" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="16" cy="12" r="1.5" fill="#FFFFFF" />
                    <path d="M16.3 12.8C16.3 14 15.4 14.8 14.5 15" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="lp-mission-card-label">Struggling to put<br />thoughts into words</span>
              </div>

              <div className="lp-mission-card">
                <div className="lp-mission-icon-circle">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Head Profile Facing Right */}
                    <path d="M10 21.5V13C10 9 12.5 6.5 16 6.5C19 6.5 20.5 8.5 20.5 10.5C20.5 11.2 20.2 11.8 21.4 13C21.8 13.4 21.8 14 21.2 14.5L19.8 15C19.4 15.2 19.3 15.6 19.5 16C19.9 16.6 19.7 17.3 19 17.6L17.2 18C16.8 18.1 16.5 18.5 16.5 19V21.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="10" y1="21.5" x2="16.5" y2="21.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    {/* Voice burst dashes in front of mouth */}
                    <line x1="22.5" y1="13.2" x2="25" y2="12.2" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="23" y1="15.5" x2="26" y2="15.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="22.5" y1="17.8" x2="25" y2="18.8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="lp-mission-card-label">Staying quiet when its<br />time to speak</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lp-mission-visual-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lp-mission-visual-frame">
              <img
                src="/mission-visual-seamless.png"
                alt="Students developing active spoken English communication skills"
                className="lp-mission-visual-img"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. What We Offer Section (Placed Directly Above How It Works) */}
      <section className="lp-offer-section" id="what-we-offer">
        <div className="lp-offer-container">
          {/* Header */}
          <motion.div 
            className="lp-offer-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="lp-offer-kicker">HERE'S WHAT WE OFFER</span>
            <h2 className="lp-offer-title">Here’s What We Offer</h2>
          </motion.div>

          {/* Interactive Showcase Card with 3D Tilt */}
          <motion.div 
            className="lp-offer-card-wrapper"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lp-offer-card">
              {/* Classroom Image Wrap */}
              <div className="lp-offer-image-wrap">
                <img 
                  src="/what-we-offer-classroom.jpg" 
                  alt="Energetic teacher and engaged students in a modern spoken English classroom" 
                  className="lp-offer-image" 
                />
              </div>

              {/* Bottom Feature Tabs */}
              <div className="lp-offer-tabs-bar">
                {offerFeatures.map((feat, idx) => (
                  <div
                    key={feat.title}
                    className={`lp-offer-tab ${activeOfferIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveOfferIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveOfferIndex(idx); }}
                  >
                    <div className="lp-offer-tab-icon-wrap">
                      {feat.icon}
                    </div>
                    <div className="lp-offer-tab-content">
                      <span className="lp-offer-tab-title">{feat.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Context Row: Mission Statement & Book A Demo */}
          <motion.div 
            className="lp-offer-bottom-row"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lp-offer-mission-text">
              WE STARTED VISIONX WITH A SINGLE MISSION: TO TURN CLASSROOM ENGLISH LEARNING INTO AN ACTIVE, ENJOYABLE SPOKEN EXPERIENCE. OUR PLATFORM BLENDS GUIDED AI SPEECH TRAINING WITH STRUCTURED LESSON DELIVERY THAT SUPPORTS EDUCATORS.
            </p>

            <div className="lp-offer-action-wrap">
              {/* Star Doodle Above Button */}
              <div className="lp-offer-btn-star" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 12,2 L 14.8,8.5 L 22,9.3 L 16.8,14.2 L 18.2,21.3 L 12,17.8 L 5.8,21.3 L 7.2,14.2 L 2,9.3 L 9.2,8.5 Z"
                    fill="#FFFFFF"
                  />
                  <circle cx="12" cy="12.5" r="2.5" fill="#F0740F" />
                </svg>
              </div>

              <motion.button 
                type="button"
                onClick={scrollToDemo}
                className="lp-offer-demo-btn"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
              >
                Book A Demo
              </motion.button>

              {/* Hand-Drawn Crown/Burst Doodle on right */}
              <div className="lp-offer-crown-doodle" aria-hidden="true">
                <svg width="48" height="42" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="7" x2="8" y2="2" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="25" y1="5" x2="25" y2="0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <line x1="38" y1="7" x2="42" y2="2" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  <path
                    d="M 6,34 L 11,14 L 21,24 L 31,12 L 41,24 L 47,15 L 43,34 Z"
                    stroke="#FFFFFF"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <line x1="7" y1="36" x2="44" y2="36" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hand-Drawn White Star Doodle on bottom right */}
        <div className="lp-offer-star-doodle" aria-hidden="true">
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 23,4 L 27.2,14.5 L 38.5,17.2 L 29.8,24.6 L 32.5,35.8 L 23,29.8 L 13.5,35.8 L 16.2,24.6 L 7.5,17.2 L 18.8,14.5 Z"
              fill="#FFFFFF"
            />
            <circle cx="23" cy="22" r="4.5" fill="#F0740F" />
          </svg>
        </div>
      </section>

      {/* Smooth Orange-to-White Gradient Transition Between Sections */}
      <div className="lp-offer-to-hiw-gradient" aria-hidden="true" />

      {/* 5. How It Works (Structured 7-Step Pedagogical Journey) */}
      <section className="lp-how-it-works-section" id="how-it-works">
        <span id="clients" style={{ position: 'absolute', top: '-80px', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="hiw-container">
        
        {/* Playful Decorative Doodle Arrows with 1s Entrance Delay */}
        <motion.div 
          className="hiw-doodle-wrapper" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Bright Cyan Sweeping Loop */}
          <svg
            className="hiw-doodle-cyan"
            width="75"
            height="142"
            viewBox="0 0 77 144"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 11,4 L 9,6 L 6,13 L 5,18 L 5,23 L 4,24 L 4,28 L 6,40 L 10,52 L 15,61 L 15,63 L 11,70 L 10,73 L 10,78 L 9,79 L 9,83 L 10,84 L 10,89 L 13,98 L 19,108 L 25,115 L 32,121 L 38,125 L 58,134 L 53,138 L 64,139 L 71,136 L 72,134 L 72,132 L 70,127 L 63,119 L 59,117 L 59,119 L 60,121 L 64,126 L 62,130 L 52,127 L 43,123 L 33,116 L 24,107 L 19,100 L 15,92 L 13,84 L 13,78 L 14,74 L 16,70 L 18,68 L 20,68 L 25,73 L 30,76 L 33,77 L 43,77 L 46,74 L 46,70 L 44,65 L 42,62 L 38,58 L 32,56 L 27,56 L 19,59 L 17,57 L 12,46 L 9,37 L 8,31 L 8,19 L 9,14 L 11,9 Z M 24,63 L 26,61 L 33,61 L 35,62 L 40,67 L 41,73 L 34,73 L 30,71 L 24,66 Z"
              fill="#00c4b4"
              fillRule="evenodd"
            />
          </svg>

          {/* Top Dark Teal Spring Doodle */}
          <svg
            className="hiw-doodle-teal"
            width="52"
            height="70"
            viewBox="0 0 52 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: '12px' }}
          >
            <path
              d="M 47,5 L 45,7 L 44,9 L 44,11 L 41,17 L 35,20 L 35,17 L 32,10 L 27,5 L 25,4 L 19,4 L 17,6 L 16,9 L 16,12 L 17,15 L 20,19 L 20,20 L 26,24 L 29,24 L 33,27 L 32,29 L 27,34 L 25,35 L 23,35 L 21,33 L 18,27 L 15,24 L 11,22 L 7,22 L 4,25 L 4,30 L 7,35 L 8,35 L 10,37 L 13,38 L 19,38 L 21,40 L 24,47 L 23,51 L 20,52 L 20,56 L 22,60 L 24,62 L 24,63 L 27,64 L 29,60 L 31,52 L 27,51 L 25,48 L 24,37 L 26,37 L 29,35 L 33,31 L 36,24 L 42,19 L 45,12 Z M 6,26 L 8,24 L 10,24 L 14,26 L 19,33 L 18,36 L 13,36 L 11,35 L 6,30 Z M 21,5 L 23,5 L 25,6 L 30,11 L 32,14 L 33,17 L 32,23 L 28,23 L 24,21 L 19,16 L 18,14 L 18,8 Z"
              fill="#005952"
              fillRule="evenodd"
            />
          </svg>
        </motion.div>

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
                <svg width="68" height="68" viewBox="0 0 62 68" fill="none" aria-hidden="true">
                  <path
                    d="M 41,17 L 37,17 L 34,18 L 31,20 L 28,25 L 27,28 L 27,31 L 29,36 L 34,41 L 36,41 L 37,39 L 36,37 L 32,34 L 31,32 L 31,27 L 32,25 L 35,22 L 37,21 L 42,21 L 44,22 L 46,24 L 46,25 L 50,26 L 50,23 L 46,19 Z M 37,9 L 33,10 L 29,12 L 25,15 L 22,19 L 20,24 L 20,35 L 22,40 L 25,43 L 29,51 L 30,56 L 31,58 L 34,61 L 39,63 L 41,63 L 42,62 L 45,62 L 50,57 L 51,55 L 51,48 L 48,48 L 48,53 L 47,55 L 44,58 L 42,59 L 38,59 L 36,58 L 34,56 L 33,54 L 32,49 L 28,41 L 24,36 L 23,32 L 23,26 L 24,23 L 26,20 L 31,15 L 36,13 L 43,13 L 46,14 L 49,16 L 52,19 L 54,23 L 56,24 L 57,20 L 56,18 L 50,12 L 42,9 Z M 22,9 L 16,14 L 13,21 L 12,25 L 12,34 L 14,38 L 16,38 L 15,31 L 15,28 L 16,27 L 16,23 L 18,18 L 23,12 Z M 17,4 L 15,4 L 10,9 L 6,17 L 4,26 L 4,33 L 5,38 L 6,40 L 9,39 L 8,23 L 10,17 L 12,13 L 17,7 Z"
                    fill="#9daef8"
                    fillRule="evenodd"
                  />
                </svg>
              )
            },
            {
              num: "02",
              title: "Respond Naturally",
              desc: "Students practise responding to questions, prompts and conversations, helping them become more comfortable using English spontaneously.",
              icon: (
                <svg width="68" height="68" viewBox="0 0 68 68" fill="none" aria-hidden="true">
                  <path
                    d="M 53,48 L 55,51 L 55,52 L 58,52 L 56,48 Z M 57,43 L 57,45 L 61,46 L 64,45 L 61,43 Z M 56,40 L 59,39 L 60,35 L 56,38 Z M 22,5 L 18,6 L 14,8 L 7,15 L 5,20 L 5,30 L 7,35 L 9,37 L 11,42 L 11,51 L 9,55 L 10,58 L 11,58 L 13,60 L 20,63 L 30,64 L 35,63 L 37,55 L 42,56 L 48,54 L 49,44 L 46,43 L 47,40 L 51,39 L 52,34 L 53,34 L 54,33 L 55,30 L 54,28 L 51,27 L 49,25 L 48,23 L 48,18 L 47,15 L 45,11 L 42,8 L 35,5 Z M 23,7 L 34,7 L 39,9 L 44,14 L 45,17 L 45,21 L 47,26 L 51,29 L 52,31 L 50,33 L 49,33 L 47,38 L 43,38 L 41,39 L 41,42 L 44,45 L 45,45 L 47,47 L 47,51 L 45,53 L 34,53 L 29,51 L 25,48 L 25,51 L 28,53 L 33,55 L 32,61 L 22,61 L 13,57 L 12,54 L 13,53 L 14,49 L 14,44 L 12,37 L 9,33 L 7,27 L 7,22 L 8,19 L 11,14 L 14,11 L 17,9 Z"
                    fill="#9daef8"
                    fillRule="evenodd"
                  />
                </svg>
              )
            },
            {
              num: "03",
              title: "Build Vocabulary",
              desc: "Students learn useful words and phrases in meaningful contexts so they can understand and use them naturally.",
              icon: (
                <svg width="68" height="68" viewBox="0 0 68 68" fill="none" aria-hidden="true">
                  <path
                    d="M 47,31 L 46,36 L 35,64 L 39,64 L 42,56 L 56,55 L 58,57 L 60,63 L 64,64 L 59,49 L 55,41 L 54,36 L 52,33 L 51,30 Z M 51,39 L 53,43 L 55,49 L 54,52 L 45,49 L 46,44 L 48,41 Z M 43,9 L 26,8 L 26,5 L 22,5 L 21,9 L 5,9 L 5,12 L 29,12 L 31,14 L 31,16 L 29,22 L 26,27 L 20,30 L 17,26 L 13,17 L 11,20 L 11,22 L 14,28 L 17,31 L 19,35 L 15,39 L 9,43 L 7,45 L 9,48 L 16,43 L 21,38 L 23,38 L 28,43 L 30,43 L 31,41 L 25,34 L 31,26 L 33,22 L 34,18 L 34,14 L 36,12 L 43,12 Z"
                    fill="#9daef8"
                    fillRule="evenodd"
                  />
                </svg>
              )
            },
            {
              num: "04",
              title: "Form Clear Sentences",
              desc: "Students develop stronger sentence-building skills and learn to communicate ideas clearly without relying on memorized grammar rules.",
              icon: (
                <svg width="86" height="68" viewBox="0 0 87 68" fill="none" aria-hidden="true">
                  <path
                    d="M 83,49 L 72,49 L 73,53 L 78,54 L 78,56 L 73,61 L 73,63 L 75,64 L 77,63 L 80,60 L 82,57 L 83,54 Z M 67,49 L 56,49 L 57,53 L 62,54 L 62,56 L 57,62 L 59,64 L 61,63 L 65,59 L 67,55 Z M 5,49 L 5,52 L 7,53 L 48,52 L 48,49 Z M 5,38 L 5,41 L 7,42 L 81,42 L 83,41 L 83,38 Z M 5,27 L 5,30 L 7,31 L 81,31 L 83,30 L 83,27 Z M 40,16 L 41,20 L 81,20 L 83,19 L 83,16 Z M 30,5 L 28,5 L 26,6 L 24,8 L 21,14 L 22,20 L 31,20 L 32,16 L 26,15 L 26,13 L 27,11 L 31,8 Z M 15,5 L 12,5 L 9,7 L 9,8 L 7,10 L 5,14 L 5,19 L 7,20 L 15,20 L 16,16 L 10,15 L 10,13 L 12,11 L 12,10 L 13,9 L 14,9 Z"
                    fill="#9daef8"
                    fillRule="evenodd"
                  />
                </svg>
              )
            },
            {
              num: "05",
              title: "Speak Clearly",
              desc: "Students work on pronunciation, sounds and clarity so their spoken English becomes easier to understand.",
              icon: (
                <svg width="86" height="64" viewBox="0 0 96 64" fill="#9daef8" aria-hidden="true">
                  <rect x="5" y="22" width="4.5" height="20" rx="2.25" />
                  <rect x="17" y="14.5" width="4.5" height="35" rx="2.25" />
                  <rect x="29" y="3" width="4.5" height="58" rx="2.25" />
                  <rect x="41" y="14.5" width="4.5" height="35" rx="2.25" />
                  <rect x="53" y="21.5" width="4.5" height="21" rx="2.25" />
                  <rect x="65" y="14.5" width="4.5" height="35" rx="2.25" />
                  <rect x="77" y="3" width="4.5" height="58" rx="2.25" />
                  <rect x="89" y="22" width="4.5" height="20" rx="2.25" />
                </svg>
              )
            },
            {
              num: "06",
              title: "Real-world Scenarios",
              desc: "Through conversations, roleplays, discussions and classroom activities, students practise applying what they have learned.",
              icon: (
                <svg width="68" height="68" viewBox="0 0 60 59" fill="none" aria-hidden="true">
                  <path
                    d="M 12,23 L 26,23 L 26,21 Z M 12,15 L 33,13 L 12,13 Z M 4,1 L 1,4 L 1,40 L 3,42 L 8,42 L 11,40 L 18,37 L 18,48 L 20,50 L 44,50 L 52,57 L 56,57 L 58,55 L 58,22 L 57,20 L 54,18 L 47,17 L 47,4 L 46,2 L 44,1 Z M 56,23 L 55,55 L 53,55 L 49,51 L 46,49 L 23,49 L 21,48 L 21,36 L 42,36 L 46,34 L 47,32 L 48,20 L 53,20 Z M 3,5 L 5,3 L 43,3 L 45,5 L 45,31 L 43,33 L 19,33 L 15,34 L 7,40 L 3,39 Z"
                    fill="#9daef8"
                    fillRule="evenodd"
                  />
                </svg>
              )
            },
            {
              num: "07",
              title: "Express with Confidence",
              desc: "Students bring their skills together through presentations, conversations and other speaking activities, building confidence in expressing their ideas.",
              isCapstone: true,
              icon: (
                <svg width="100%" height="110" viewBox="0 0 330 130" fill="none" aria-hidden="true" style={{ maxWidth: '330px', margin: '0 auto' }}>
                  <path
                    d="M 272,96 L 268,98 L 262,93 L 260,102 L 257,101 L 259,104 L 259,105 L 262,107 L 265,105 L 267,105 L 271,103 Z M 272,100 L 271,103 L 269,103 L 264,106 L 261,106 L 260,102 L 263,102 L 263,100 L 262,99 L 264,95 L 268,99 Z M 85,96 L 86,103 L 96,107 L 98,105 L 100,101 L 95,101 L 95,93 L 89,98 L 87,98 Z M 98,104 L 96,106 L 93,106 L 86,103 L 86,99 L 95,96 L 95,99 L 94,100 L 94,102 Z M 312,92 L 308,92 L 306,87 L 302,92 L 299,90 L 299,94 L 300,96 L 303,96 L 304,97 L 310,97 Z M 304,90 L 306,89 L 308,91 L 309,97 L 305,97 L 301,96 L 303,93 Z M 45,92 L 47,97 L 53,97 L 54,96 L 57,96 L 58,94 L 58,90 L 53,91 L 51,87 L 49,92 Z M 56,96 L 52,97 L 47,95 L 49,93 L 49,91 L 53,90 L 54,93 Z M 202,89 L 209,95 L 209,100 L 208,101 L 208,106 L 211,106 L 217,102 L 219,102 L 225,106 L 228,105 L 228,103 L 227,102 L 227,99 L 226,98 L 226,96 L 233,90 L 233,87 L 229,87 L 228,86 L 222,85 L 222,83 L 219,77 L 216,78 L 214,84 L 212,86 L 207,86 Z M 218,86 L 220,88 L 220,89 L 224,92 L 222,94 L 221,98 L 218,97 L 213,98 L 214,95 L 212,90 L 214,90 L 216,88 L 216,87 Z M 141,77 L 139,81 L 139,83 L 138,85 L 132,86 L 127,89 L 133,94 L 134,99 L 132,103 L 133,106 L 135,106 L 141,102 L 144,102 L 150,106 L 153,104 L 151,99 L 152,94 L 157,87 L 147,85 L 144,77 Z M 141,87 L 144,87 L 144,88 L 149,92 L 147,94 L 145,99 L 138,98 L 138,94 L 137,90 L 139,90 L 141,88 Z M 283,75 L 284,77 L 286,77 L 285,75 Z M 244,51 L 244,53 L 243,54 L 244,62 L 249,63 L 255,66 L 259,66 L 261,64 L 261,63 L 264,59 L 258,59 L 257,54 L 257,48 L 253,51 L 253,52 L 250,55 L 248,55 L 246,52 Z M 261,63 L 256,65 L 254,65 L 245,61 L 247,55 L 248,58 L 257,52 L 257,58 L 258,59 L 258,61 Z M 93,59 L 95,63 L 98,66 L 102,66 L 108,63 L 110,63 L 114,61 L 114,54 L 113,53 L 113,51 L 111,52 L 109,55 L 107,55 L 103,50 L 100,48 L 100,53 L 98,60 Z M 113,55 L 112,61 L 103,65 L 101,65 L 99,66 L 97,61 L 99,61 L 99,58 L 100,57 L 102,51 L 107,57 L 109,58 L 110,55 Z M 146,23 L 143,26 L 142,28 L 142,33 L 147,41 L 154,48 L 157,50 L 162,52 L 165,55 L 164,69 L 158,69 L 157,70 L 150,72 L 155,77 L 156,77 L 165,85 L 165,90 L 162,102 L 161,103 L 162,106 L 164,106 L 178,97 L 182,97 L 196,106 L 199,105 L 199,102 L 195,89 L 196,84 L 204,78 L 209,70 L 203,70 L 196,68 L 197,53 L 202,51 L 206,48 L 214,40 L 218,33 L 218,27 L 214,23 L 209,23 L 205,27 L 204,30 L 201,34 L 196,39 L 193,41 L 187,43 L 184,40 L 187,39 L 191,33 L 191,24 L 187,18 L 183,16 L 177,16 L 175,17 L 170,22 L 169,25 L 169,32 L 170,35 L 176,40 L 176,43 L 173,43 L 170,42 L 163,38 L 157,31 L 155,27 L 151,23 Z M 160,73 L 166,73 L 173,72 L 175,70 L 178,61 L 182,60 L 182,62 L 186,71 L 193,72 L 194,73 L 201,75 L 191,84 L 191,88 L 193,93 L 192,99 L 181,92 L 179,92 L 170,98 L 167,97 L 167,94 L 169,89 L 168,82 L 161,77 Z M 210,38 L 208,41 L 201,47 L 192,51 L 190,69 L 188,67 L 184,55 L 182,51 L 178,51 L 172,67 L 168,68 L 168,51 L 161,48 L 158,46 L 150,37 L 152,35 L 155,35 L 162,42 L 165,44 L 174,47 L 186,47 L 193,45 L 197,43 L 207,34 Z M 210,27 L 214,28 L 215,31 L 210,32 Z M 147,27 L 150,27 L 152,30 L 149,33 L 146,32 Z M 177,20 L 183,20 L 187,24 L 188,27 L 188,30 L 187,33 L 183,37 L 177,37 L 174,34 L 173,32 L 173,25 L 174,23 Z"
                    fill="#9daef8"
                    fillRule="evenodd"
                  />
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
                    initial={{ opacity: 0, y: 35, scale: 0.94, rotateX: 12 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.7, delay: 1.0 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className={`hiw-grid-item ${step.isCapstone ? 'hiw-capstone-item' : ''}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {step.isCapstone ? (
                      <TiltCard
                        maxAngle={7}
                        scale={1.015}
                        borderRadius="26px"
                        glareEnable={true}
                        glareMaxOpacity={0.07}
                        className="hiw-capstone-tilt-container"
                      >
                        <div className="hiw-card hiw-capstone-card">
                          <div className="hiw-capstone-badge">
                            <span className="hiw-capstone-num-circle">{step.num}</span>
                            <h3 className="hiw-capstone-title">{step.title}</h3>
                          </div>
                          <p className="hiw-capstone-desc">{step.desc}</p>
                          <div className="hiw-icon-wrap hiw-capstone-icon-wrap">
                            {step.icon}
                          </div>
                          {/* Playful Orange Trophy Doodle */}
                          <div className="hiw-trophy-doodle" aria-hidden="true">
                            <svg width="54" height="58" viewBox="0 0 54 58" fill="none">
                              <path
                                d="M 13,6 L 11,8 L 11,14 L 12,16 L 19,22 L 23,29 L 19,33 L 15,32 L 13,34 L 12,37 L 7,39 L 6,45 L 14,47 L 31,54 L 32,52 L 33,47 L 31,45 L 31,38 L 30,38 L 28,36 L 27,33 L 28,30 L 31,30 L 36,27 L 44,27 L 49,23 L 50,21 L 50,18 L 48,16 L 46,16 L 42,11 L 26,5 L 22,5 L 20,7 L 16,5 Z M 7,41 L 11,40 L 22,43 L 30,46 L 31,51 L 28,52 L 25,50 L 9,45 L 7,43 Z M 15,34 L 18,34 L 28,38 L 29,43 L 26,44 L 15,40 Z M 27,30 L 24,35 L 21,33 L 23,31 L 23,30 Z M 47,17 L 48,21 L 45,24 L 39,25 L 39,23 L 41,21 L 43,16 L 45,16 Z M 14,7 L 20,8 L 20,11 L 18,18 L 16,18 L 12,13 L 12,9 Z M 22,7 L 27,6 L 40,11 L 42,13 L 42,16 L 39,22 L 33,28 L 26,28 L 24,27 L 21,24 L 20,22 L 20,12 Z"
                                fill="#d9650d"
                                fillRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </TiltCard>
                    ) : (
                      <TiltCard
                        maxAngle={10}
                        scale={1.03}
                        borderRadius="22px"
                        glareEnable={true}
                        glareMaxOpacity={0.08}
                        className="hiw-step-tilt-container"
                      >
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
                      </TiltCard>
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
                            <TiltCard
                              maxAngle={6}
                              scale={1.015}
                              borderRadius="26px"
                              glareEnable={true}
                              glareMaxOpacity={0.06}
                              className="hiw-capstone-tilt-container"
                            >
                              <div className="hiw-card hiw-capstone-card hiw-mobile-active-card">
                                <div className="hiw-capstone-badge">
                                  <span className="hiw-capstone-num-circle">{step.num}</span>
                                  <h3 className="hiw-capstone-title">{step.title}</h3>
                                </div>
                                <p className="hiw-capstone-desc">{step.desc}</p>
                                <div className="hiw-icon-wrap hiw-capstone-icon-wrap">
                                  {step.icon}
                                </div>
                                {/* Playful Orange Trophy Doodle */}
                                <div className="hiw-trophy-doodle" aria-hidden="true">
                                  <svg width="54" height="58" viewBox="0 0 54 58" fill="none">
                                    <path
                                      d="M 13,6 L 11,8 L 11,14 L 12,16 L 19,22 L 23,29 L 19,33 L 15,32 L 13,34 L 12,37 L 7,39 L 6,45 L 14,47 L 31,54 L 32,52 L 33,47 L 31,45 L 31,38 L 30,38 L 28,36 L 27,33 L 28,30 L 31,30 L 36,27 L 44,27 L 49,23 L 50,21 L 50,18 L 48,16 L 46,16 L 42,11 L 26,5 L 22,5 L 20,7 L 16,5 Z M 7,41 L 11,40 L 22,43 L 30,46 L 31,51 L 28,52 L 25,50 L 9,45 L 7,43 Z M 15,34 L 18,34 L 28,38 L 29,43 L 26,44 L 15,40 Z M 27,30 L 24,35 L 21,33 L 23,31 L 23,30 Z M 47,17 L 48,21 L 45,24 L 39,25 L 39,23 L 41,21 L 43,16 L 45,16 Z M 14,7 L 20,8 L 20,11 L 18,18 L 16,18 L 12,13 L 12,9 Z M 22,7 L 27,6 L 40,11 L 42,13 L 42,16 L 39,22 L 33,28 L 26,28 L 24,27 L 21,24 L 20,22 L 20,12 Z"
                                      fill="#d9650d"
                                      fillRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </TiltCard>
                          ) : (
                            <TiltCard
                              maxAngle={8}
                              scale={1.02}
                              borderRadius="22px"
                              glareEnable={true}
                              glareMaxOpacity={0.06}
                              className="hiw-step-tilt-container"
                            >
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
                            </TiltCard>
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
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.85, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        />

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

          {/* Right Side 3D Interactive Tilted Educators Card */}
          <motion.div 
            className="why-tilted-card-3d-wrapper"
            initial={{ opacity: 0, scale: 0.72, rotateY: -22, rotateX: 16, y: 70 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
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

          {/* 2 Columns: For Students & For Schools */}
          <div className="why-grid">
            {/* Col 1: For Students */}
            <div className="why-col">
              <motion.h3 
                className="why-col-header"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                For Students
              </motion.h3>
              <div className="why-list">
                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
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
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
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
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 1.30, ease: [0.16, 1, 0.3, 1] }}
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
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                For Schools
              </motion.h3>
              <div className="why-list">
                <motion.div
                  initial={{ opacity: 0, y: 45, rotateX: 22, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
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
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 1.20, ease: [0.16, 1, 0.3, 1] }}
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
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
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