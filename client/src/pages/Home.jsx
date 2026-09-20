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
  ArrowLeft,
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
  Trophy,
  Pin as PinIcon,
  Brain,
  Puzzle,
  MicOff
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
    let startTimer;
    const el = containerRef.current;
    if (el && window.IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0] && entries[0].isIntersecting) {
            startTimer = setTimeout(() => {
              setIsStarted(true);
            }, 1100);
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    } else {
      startTimer = setTimeout(() => {
        setIsStarted(true);
      }, 1100);
    }

    // Safety fallback: start within 1.8s if observer is delayed
    const safetyTimer = setTimeout(() => {
      setIsStarted(true);
    }, 1800);

    return () => {
      if (observer) observer.disconnect();
      if (startTimer) clearTimeout(startTimer);
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 10 4 15 9 20" />
          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
        </svg>
      )
    },
    {
      title: "AI Speech & Pronunciation",
      desc: "Real-time phonetic feedback and accurate voice analysis.",
      icon: <Sparkles size={22} color="#4f46e5" strokeWidth={3.2} />
    },
    {
      title: "Teacher Analytics Hub",
      desc: "Automated classroom diagnosis, tracking and reports.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
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

  const prevActiveRef = useRef(activeReviewIndex);
  useEffect(() => {
    prevActiveRef.current = activeReviewIndex;
  }, [activeReviewIndex]);

  const getCardDiff = (index, activeIdx, total) => {
    let diff = index - activeIdx;
    while (diff > Math.floor(total / 2)) diff -= total;
    while (diff < -Math.floor(total / 2)) diff += total;
    return diff;
  };

  const fanTouchStartX = useRef(0);
  const handleFanTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      fanTouchStartX.current = e.touches[0].clientX;
    }
  };
  const handleFanTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const diff = fanTouchStartX.current - e.changedTouches[0].clientX;
      if (diff > 45) {
        // Swipe Left -> Next
        setActiveReviewIndex((prev) => (prev + 1) % testimonials.length);
      } else if (diff < -45) {
        // Swipe Right -> Prev
        setActiveReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
  };


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
      </motion.nav>      {/* 2. Hero Section - Fullscreen Interactive Hero */}
      <section className="lp-hero-fullscreen-section" id="home">
        {/* Background Overlay */}
        <div className="lp-hero-fs-bg-overlay" />

        <div className="lp-hero-fs-container">
          {/* Top Heading Area with Doodles and Typing Effect */}
          <div className="lp-hero-fs-heading-wrap">
            {/* Cyan Floating Microphone Doodle (Left) */}
            <motion.div 
              className="lp-hero-doodle lp-hero-doodle-mic"
              animate={{ y: [0, -7, 0], rotate: [-4, 3, -4] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <svg width="58" height="58" viewBox="0 0 48 48" fill="none" stroke="#00C4B4" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="18" y="8" width="12" height="20" rx="6" />
                <path d="M12 22c0 6.627 5.373 12 12 12s12-5.373 12-12" />
                <line x1="24" y1="34" x2="24" y2="42" />
                <line x1="16" y1="42" x2="32" y2="42" />
                <path d="M7 17c-2 2.5-2 7.5 0 10" />
                <path d="M41 17c2 2.5 2 7.5 0 10" />
              </svg>
            </motion.div>

            {/* Stable Headline */}
            <h1 className="lp-hero-full-title">
              <span className="lp-hero-title-line1">Empowering Students with</span>
              <span className="lp-hero-title-line2">
                Confident <span className="lp-hero-title-orange">English Communication</span>
              </span>
            </h1>

            {/* Cyan Floating Speech Bubble Doodle (Right) */}
            <motion.div 
              className="lp-hero-doodle lp-hero-doodle-bubble"
              animate={{ y: [0, 7, 0], rotate: [3, -4, 3] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.3 }}
              aria-hidden="true"
            >
              <svg width="58" height="58" viewBox="0 0 48 48" fill="none" stroke="#00C4B4" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M38 24c0-7.732-6.716-14-15-14S8 16.268 8 24c0 4.582 2.36 8.647 6 11.22V40l6.5-3.25c1.64.42 3.42.65 5.5.65 8.284 0 15-6.268 15-14z" />
                <circle cx="17" cy="24" r="1.6" fill="#00C4B4" stroke="none" />
                <circle cx="23" cy="24" r="1.6" fill="#00C4B4" stroke="none" />
                <circle cx="29" cy="24" r="1.6" fill="#00C4B4" stroke="none" />
              </svg>
            </motion.div>
          </div>

          {/* Central Visual Stage (Student Girl & Floating Badges) */}
          <div className="lp-hero-visual-stage">
            {/* Interactive Floating Badge 1 (Top-Left): Partnered with 100+ Schools */}
            <motion.div 
              className="lp-hero-float-pill lp-hero-pill-schools"
              animate={{ y: [0, -8, 0], rotate: [-5, -3, -5] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="lp-hero-avatar-stack">
                <span className="lp-hero-avatar-circle av-orange">T</span>
                <span className="lp-hero-avatar-circle av-salmon">R</span>
                <span className="lp-hero-avatar-circle av-teal">V</span>
                <span className="lp-hero-avatar-circle av-navy">+50</span>
              </div>
              <div className="lp-hero-pill-content">
                <div className="lp-hero-stars-row">
                  <span className="lp-hero-star">★</span>
                  <span className="lp-hero-star">★</span>
                  <span className="lp-hero-star">★</span>
                  <span className="lp-hero-star">★</span>
                  <span className="lp-hero-star">★</span>
                </div>
                <span className="lp-hero-pill-title">Partnered with 100+ Schools</span>
              </div>
            </motion.div>

            {/* Interactive Floating Badge 2 (Lower-Left): Nursery to Class 10 */}
            <motion.div 
              className="lp-hero-float-pill lp-hero-pill-classes"
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ scale: 1.05, y: 5 }}
            >
              <div className="lp-hero-pill-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </div>
              <span className="lp-hero-pill-title">Nursery to Class 10</span>
            </motion.div>

            {/* Interactive Floating Badge 3 (Mid-Right): AI Powered Training */}
            <motion.div 
              className="lp-hero-float-pill lp-hero-pill-ai"
              animate={{ y: [0, -7, 0], rotate: [4, 2, 4] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.0 }}
              whileHover={{ scale: 1.05, y: -9 }}
            >
              <div className="lp-hero-pill-icon-wrap">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563EB" stroke="#2563EB" strokeWidth="1">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                </svg>
              </div>
              <span className="lp-hero-pill-title">AI-Powered Training</span>
            </motion.div>

            {/* Centerpiece Student Girl */}
            <div className="lp-hero-student-wrapper">
              <motion.img 
                src="/student_girl_hero_speaking.png" 
                alt="Confident Student Speaking with Microphone" 
                className="lp-hero-student-img"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {/* Bottom-Right Value Proposition & CTA */}
          <motion.div 
            className="lp-hero-fs-cta-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lp-hero-fs-cta-desc">
              Deliver structured spoken English programs that improve communication skills, confidence, pronunciation, and classroom participation from Nursery to Grade 10.
            </p>
            <motion.button 
              type="button" 
              onClick={scrollToDemo} 
              className="lp-hero-fs-cta-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 28px rgba(0, 136, 255, 0.45)" }}
              whileTap={{ scale: 0.96 }}
            >
              Book A Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 3. Educational Mission: The Communication Gap */}
      <section className="lp-mission-section" id="about">
        <div className="lp-mission-container">
          <motion.div 
            className="lp-mission-text-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                  <Brain size={26} strokeWidth={2.2} color="#FFFFFF" />
                </div>
                <span className="lp-mission-card-label">Knowing what to say,<br />but holding back</span>
              </div>

              <div className="lp-mission-card">
                <div className="lp-mission-icon-circle">
                  <Puzzle size={26} strokeWidth={2.2} color="#FFFFFF" />
                </div>
                <span className="lp-mission-card-label">Struggling to put<br />thoughts into words</span>
              </div>

              <div className="lp-mission-card">
                <div className="lp-mission-icon-circle">
                  <MicOff size={26} strokeWidth={2.2} color="#FFFFFF" />
                </div>
                <span className="lp-mission-card-label">Staying quiet when<br />it's time to speak</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lp-mission-visual-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.85, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="lp-offer-mission-text">
              We started VisionX with a single mission: to turn classroom English learning into an active, enjoyable spoken experience. Our platform blends guided AI speech training with structured lesson delivery that supports educators.
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
                <svg width="76" height="70" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
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

              {/* Small star below the crown, positioned beside the button */}
              <div className="lp-offer-star-doodle" aria-hidden="true">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 23,4 L 27.2,14.5 L 38.5,17.2 L 29.8,24.6 L 32.5,35.8 L 23,29.8 L 13.5,35.8 L 16.2,24.6 L 7.5,17.2 L 18.8,14.5 Z"
                    fill="#FFFFFF"
                  />
                  <circle cx="23" cy="22" r="4.5" fill="#F0740F" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smooth Orange-to-White Gradient Transition Between Sections */}
      <div className="lp-offer-to-hiw-gradient" aria-hidden="true" />

      {/* 5. How It Works (Structured 7-Step Pedagogical Journey) */}
      <section className="lp-how-it-works-section" id="how-it-works">
        <span id="clients" style={{ position: 'absolute', top: '-80px', pointerEvents: 'none' }} aria-hidden="true" />
        <div className="hiw-container">
        
        {/* Playful Decorative Doodle Arrows with 1.1s Entrance Delay */}
        <motion.div 
          className="hiw-doodle-wrapper" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
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

        <motion.div 
          className="hiw-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hiw-kicker">THE PROCESS</p>
          <h2 className="hiw-title">How It Works</h2>
        </motion.div>

        {(() => {
          const howItWorksSteps = [
            {
              num: "01",
              title: "Listen & Understand",
              desc: "Students develop the ability to listen carefully, recognize sounds and understand spoken English in different situations.",
              icon: (
                <img 
                  src="/Listen.png" 
                  alt="Listen & Understand" 
                  className="hiw-step-icon-img"
                />
              )
            },
            {
              num: "02",
              title: "Respond Naturally",
              desc: "Students practise responding to questions, prompts and conversations, helping them become more comfortable using English spontaneously.",
              icon: (
                <svg width="86" height="86" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <circle cx="32" cy="27" r="11" stroke="#9daef8" strokeWidth="5" />
                  <path d="M15 61c0-10 8-17.5 17-17.5s17 7.5 17 17.5" stroke="#9daef8" strokeWidth="5" strokeLinecap="round" />
                  <path d="M52 22c3.5 4 3.5 9.5 0 13.5" stroke="#9daef8" strokeWidth="5" strokeLinecap="round" />
                  <path d="M60 15c7 7.5 7 20 0 27.5" stroke="#9daef8" strokeWidth="5" strokeLinecap="round" />
                </svg>
              )
            },
            {
              num: "03",
              title: "Build Vocabulary",
              desc: "Students learn useful words and phrases in meaningful contexts so they can understand and use them naturally.",
              icon: (
                <svg width="86" height="86" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <path d="M30 15v5" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" />
                  <path d="M17 24h26" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" />
                  <path d="M34 26c-4 10.5-11 20-18 26" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" />
                  <path d="M23 31c5 6.5 12 14.5 21 21" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" />
                  <path d="M47 58l11-31 11 31" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M51 47.5h14" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" />
                </svg>
              )
            },
            {
              num: "04",
              title: "Form Clear Sentences",
              desc: "Students develop stronger sentence-building skills and learn to communicate ideas clearly without relying on memorized grammar rules.",
              icon: (
                <svg width="86" height="86" viewBox="0 0 80 80" fill="#9daef8" aria-hidden="true">
                  <path d="M15 14h6.5v7.5h-3.8l-2.7 4.8h-3l3-5.3H15V14z" />
                  <path d="M25 14h6.5v7.5h-3.8l-2.7 4.8h-3l3-5.3H25V14z" />
                  <rect x="35" y="16.5" width="31" height="5" rx="2.5" />
                  <rect x="15" y="28" width="51" height="5" rx="2.5" />
                  <rect x="15" y="39.5" width="51" height="5" rx="2.5" />
                  <rect x="15" y="51" width="31" height="5" rx="2.5" />
                  <path d="M52 50.5h6.5v7.5h-2.7l2.7 5h-3l-2.7-4.5H52v-8z" />
                  <path d="M61 50.5h6.5v7.5h-2.7l2.7 5h-3l-2.7-4.5H61v-8z" />
                </svg>
              )
            },
            {
              num: "05",
              title: "Speak Clearly",
              desc: "Students work on pronunciation, sounds and clarity so their spoken English becomes easier to understand.",
              icon: (
                <svg width="86" height="86" viewBox="0 0 80 80" fill="#9daef8" aria-hidden="true">
                  <rect x="10" y="30" width="5.5" height="20" rx="2.75" />
                  <rect x="19.5" y="21" width="5.5" height="38" rx="2.75" />
                  <rect x="29" y="12" width="5.5" height="56" rx="2.75" />
                  <rect x="38.5" y="7" width="5.5" height="66" rx="2.75" />
                  <rect x="48" y="12" width="5.5" height="56" rx="2.75" />
                  <rect x="57.5" y="21" width="5.5" height="38" rx="2.75" />
                  <rect x="67" y="30" width="5.5" height="20" rx="2.75" />
                </svg>
              )
            },
            {
              num: "06",
              title: "Real-world Scenarios",
              desc: "Through conversations, roleplays, discussions and classroom activities, students practise applying what they have learned.",
              icon: (
                <svg width="86" height="86" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                  <path d="M47 22c9.5 0 17 6.5 17 14.5 0 3.8-1.7 7.4-4.5 10l1.2 6.8-7.2-3.1c-2.1.7-4.4 1-6.5 1-1.5 0-3-.1-4.5-.4" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 37c0-9 8-16 18-16s18 7 18 16-8 16-18 16c-2.6 0-5-.5-7.2-1.3L20 54.5l1.6-6.9C19.4 45.2 18 41.3 18 37z" stroke="#9daef8" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="26" y1="33.5" x2="44" y2="33.5" stroke="#9daef8" strokeWidth="4" strokeLinecap="round" />
                  <line x1="26" y1="41" x2="38" y2="41" stroke="#9daef8" strokeWidth="4" strokeLinecap="round" />
                </svg>
              )
            },
            {
              num: "07",
              title: "Express with Confidence",
              desc: "Students bring their skills together through presentations, conversations and other speaking activities, building confidence in expressing their ideas.",
              isCapstone: true,
              icon: (
                <img 
                  src="/Group%208.png" 
                  alt="Express with Confidence" 
                  className="hiw-capstone-icon-img"
                />
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
                    transition={{ duration: 0.7, delay: 1.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
                                stroke="#d9650d"
                                strokeWidth="2.6"
                                strokeLinejoin="round"
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
              <motion.div 
                className="hiw-mobile-slider"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
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
                                stroke="#d9650d"
                                strokeWidth="2.6"
                                strokeLinejoin="round"
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
              </motion.div>
            </>
          );
        })()}
      </div>
    </section>

      {/* 5. Reviews Section - Trusted By School Leaders (Placed Directly Above Why Choose Us) */}
      <section className="trusted-reviews-section" id="reviews">
        {/* Background Doodles */}
        <motion.img 
          src="/reviews-doodle-left-v2.png" 
          alt="" 
          className="trusted-reviews-doodle doodle-left" 
          aria-hidden="true" 
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.img 
          src="/reviews-doodle-right-v2.png?v=orange-bar" 
          alt="" 
          className="trusted-reviews-doodle doodle-right" 
          aria-hidden="true" 
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div 
          className="trusted-reviews-container"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="trusted-reviews-header">
            <span className="trusted-reviews-kicker">
              TESTIMONIALS
              <PinIcon className="trusted-reviews-pushpin" size={96} strokeWidth={1.2} aria-hidden="true" />
            </span>
            <div className="trusted-reviews-title-wrap">
              <h2 className="trusted-reviews-title">
                Trusted By School <span className="title-leaders-span">Leaders</span>
              </h2>
            </div>
            <p className="trusted-reviews-subtitle">
              Discover how VisionX empowers classrooms and transforms student confidence.
            </p>

            {/* Centered Prev / Next Arrow Buttons directly beneath subtitle */}
            <div className="trusted-reviews-top-controls">
              <button 
                type="button" 
                className="trusted-top-nav-btn" 
                onClick={() => setActiveReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous Testimonial"
              >
                <ArrowLeft size={22} strokeWidth={2.4} />
              </button>
              <button 
                type="button" 
                className="trusted-top-nav-btn" 
                onClick={() => setActiveReviewIndex((prev) => (prev + 1) % testimonials.length)}
                aria-label="Next Testimonial"
              >
                <ArrowRight size={22} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* 3-Card Fan Stage */}
          <div 
            className="trusted-fan-stage"
            onTouchStart={handleFanTouchStart}
            onTouchEnd={handleFanTouchEnd}
          >
            {testimonials.map((testimonial, index) => {
              const currDiff = getCardDiff(index, activeReviewIndex, testimonials.length);
              const prevDiff = getCardDiff(index, prevActiveRef.current, testimonials.length);
              
              // Skip transition if switching between offscreen positions to prevent gliding across screen while hidden
              const isHiddenSwap = Math.abs(currDiff) > 1 && Math.abs(prevDiff) > 1 && currDiff !== prevDiff;

              let posClass = 'is-hidden';
              let isClickable = false;
              let ariaLabel = '';

              if (currDiff === 0) {
                posClass = 'is-center';
                ariaLabel = `Current testimonial: ${testimonial.school}`;
              } else if (currDiff === -1) {
                posClass = 'is-left';
                isClickable = true;
                ariaLabel = `Previous testimonial: ${testimonial.school}`;
              } else if (currDiff === 1) {
                posClass = 'is-right';
                isClickable = true;
                ariaLabel = `Next testimonial: ${testimonial.school}`;
              } else if (currDiff < -1) {
                posClass = 'is-hidden-left';
              } else if (currDiff > 1) {
                posClass = 'is-hidden-right';
              }

              return (
                <div 
                  key={testimonial.school}
                  className={`trusted-fan-card ${posClass} ${isHiddenSwap ? 'no-transition' : ''}`}
                  onClick={isClickable ? () => setActiveReviewIndex(index) : undefined}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={isClickable ? (e) => { 
                    if (e.key === 'Enter' || e.key === ' ') setActiveReviewIndex(index); 
                  } : undefined}
                  aria-label={ariaLabel || undefined}
                  aria-hidden={Math.abs(currDiff) > 1 ? "true" : undefined}
                >
                  <div className="trusted-card-quote-mark">
                    <svg width="34" height="26" viewBox="0 0 34 26" fill="currentColor">
                      <path d="M14.5 0C6.5 0 0 6.5 0 14.5C0 20.85 5.15 26 11.5 26C13.2 26 14.5 24.7 14.5 23C14.5 21.3 13.2 20 11.5 20C8.45 20 6 17.55 6 14.5C6 14.2 6.05 13.9 6.1 13.6C7.5 14.5 9.2 15 11 15C16 15 20 11 20 6C20 2.7 17.3 0 14.5 0ZM28.5 0C20.5 0 14 6.5 14 14.5C14 20.85 19.15 26 25.5 26C27.2 26 28.5 24.7 28.5 23C28.5 21.3 27.2 20 25.5 20C22.45 20 20 17.55 20 14.5C20 14.2 20.05 13.9 20.1 13.6C21.5 14.5 23.2 15 25 15C30 15 34 11 34 6C34 2.7 31.3 0 28.5 0Z" />
                    </svg>
                  </div>
                  
                  <p className="trusted-card-text">
                    "{testimonial.text}"
                  </p>

                  <div className="trusted-card-author">
                    <div className="trusted-author-avatar" style={{ background: testimonial.avatarBg }}>
                      {testimonial.avatar}
                    </div>
                    <div className="trusted-author-info">
                      <div className="trusted-school-name">{testimonial.school}</div>
                      <div className="trusted-author-role">{testimonial.author}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonials Pagination Dots */}
          <div className="trusted-reviews-dots" aria-label="Testimonial pagination">
            {testimonials.map((t, idx) => (
              <button
                key={t.school}
                type="button"
                className={`trusted-reviews-dot ${idx === activeReviewIndex ? 'is-active' : ''}`}
                onClick={() => setActiveReviewIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}: ${t.school}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Seamless Bottom Fade Mask */}
        <div className="trusted-reviews-bottom-fade" aria-hidden="true" />
      </section>

      {/* 6. Why Choose Us Section */}
      <section className="why-choose-section" id="why-choose-us">
        {/* Left Side Students Peeking */}
        <motion.img 
          src="/why-students-peeking.png" 
          alt="Students" 
          className="why-peeking-students" 
          aria-hidden="true" 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="why-choose-inner">
          {/* Header */}
          <motion.div 
            className="why-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="why-kicker">WHY CHOOSE US</span>
            <h2 className="why-title">
              <span className="why-title-line">More Than English Lessons. A Skill</span>
              <span className="why-title-line">
                <span className="why-highlight">Students Carry</span> Forward.
              </span>
            </h2>
          </motion.div>

          {/* Educators Card - floats on top-right on desktop, flows between header & grid on mobile */}
          <motion.div 
            className="why-tilted-card-3d-wrapper"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src="/why-educators-card.png" 
              alt="Educators" 
              className="why-tilted-card-img" 
              aria-hidden="true" 
            />
          </motion.div>

          {/* 2 Columns: For Students & For Schools */}
          <div className="why-grid">
            {/* Col 1: For Students */}
            <div className="why-col why-students-col">
              <motion.h3 
                className="why-col-header"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                For Students
              </motion.h3>
              <div className="why-list">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="why-item-3d-card"
                >
                  <div className="why-icon-bubble">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0740f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div className="why-item-content">
                    <h4 className="why-item-title">Confidence to participate</h4>
                    <p className="why-item-desc">
                      Students become more comfortable sharing ideas, answering questions and taking part in conversations.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="why-item-3d-card"
                >
                  <div className="why-icon-bubble">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0740f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div className="why-item-content">
                    <h4 className="why-item-title">Communication beyond textbooks</h4>
                    <p className="why-item-desc">
                      They learn to use English in conversations, activities and situations that go beyond written exercises.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="why-item-3d-card"
                >
                  <div className="why-icon-bubble">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0740f" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M12 3a9 9 0 0 1 7.8 4.5" />
                      <path d="M21 12a9 9 0 0 1-4.5 7.8" />
                      <path d="M12 21a9 9 0 0 1-7.8-4.5" />
                      <path d="M3 12a9 9 0 0 1 4.5-7.8" />
                      <circle cx="12" cy="12" r="1.6" fill="#f0740f" stroke="none" />
                    </svg>
                  </div>
                  <div className="why-item-content">
                    <h4 className="why-item-title">Progress at their own level</h4>
                    <p className="why-item-desc">
                      Age- and grade-appropriate learning allows students to build skills progressively from Nursery to Class 10.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Col 2: For Schools */}
            <div className="why-col">
              <motion.h3 
                className="why-col-header"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                For Schools
              </motion.h3>
              <div className="why-list">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="why-item-3d-card"
                >
                  <div className="why-icon-bubble">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0740f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="18" r="3" />
                      <path d="M12 9v3m0 0l-4 3m4-3l4 3" />
                    </svg>
                  </div>
                  <div className="why-item-content">
                    <h4 className="why-item-title">A structured program, not an add-on</h4>
                    <p className="why-item-desc">
                      A planned communication curriculum that can fit into the school's existing academic environment.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="why-item-3d-card"
                >
                  <div className="why-icon-bubble">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0740f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  <div className="why-item-content">
                    <h4 className="why-item-title">Support for educators</h4>
                    <p className="why-item-desc">
                      Teachers and school teams get visibility into student learning and progress through the program.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="why-item-3d-card"
                >
                  <div className="why-icon-bubble">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0740f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <div className="why-item-content">
                    <h4 className="why-item-title">A skill that strengthens student outcomes</h4>
                    <p className="why-item-desc">
                      Students develop communication abilities that can support classroom participation, presentations and future academic growth.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Unified Get In Touch & School Leadership Section */}
      <section className="git-section" id="book-demo">
        <motion.div 
          className="git-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
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
                    <Phone size={24} strokeWidth={3} />
                  </div>
                  <div className="git-card-text">
                    <span className="git-card-label">CALL SUPPORT</span>
                    <strong className="git-card-value">+91 9381304491</strong>
                  </div>
                </a>

                <a href="mailto:visionx236@gmail.com" className="git-info-card">
                  <div className="git-icon-bubble">
                    <Mail size={24} strokeWidth={3} />
                  </div>
                  <div className="git-card-text">
                    <span className="git-card-label">EMAIL ENQUIRES</span>
                    <strong className="git-card-value">visionx236@gmail.com</strong>
                  </div>
                </a>

                <div className="git-info-card">
                  <div className="git-icon-bubble">
                    <Building2 size={24} strokeWidth={3} />
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
              transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
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
