import React from 'react';
import { motion } from 'framer-motion';
import Footer3DCanvas from './Footer3DCanvas';

export default function Footer({ onContactClick, onNavigate }) {
  const handleLinkClick = (id, e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate(id, e);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleContact = (e) => {
    if (e) e.preventDefault();
    if (onContactClick) {
      onContactClick(e);
    } else {
      const demoEl = document.getElementById('book-demo');
      if (demoEl) {
        demoEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="figma-footer" id="contact">
      {/* Interactive Three.js Background Canvas */}
      <Footer3DCanvas />

      <div className="figma-footer-inner">
        {/* TOP SECTION: Massive Headline + Description & Contact Button */}
        <div className="figma-footer-top">
          <div className="figma-footer-top-left">
            <h2 className="figma-footer-title">
              Let’s Work
              <br />
              Together
            </h2>
          </div>

          <div className="figma-footer-top-right">
            <p className="figma-footer-description">
              The purpose of a FAQ is generally to provide information on
              frequent questions or concerns The purpose of a FAQ is generally
              to provide information on frequent questions or concerns.
            </p>

            <motion.button
              type="button"
              onClick={handleContact}
              className="figma-footer-contact-btn"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(155, 182, 255, 0.4)' }}
              whileTap={{ scale: 0.96 }}
            >
              Contact Now
            </motion.button>
          </div>
        </div>

        {/* BOTTOM SECTION: 4 Column Links & Info Grid */}
        <div className="figma-footer-bottom">
          {/* Col 1: Logo & Socials */}
          <div className="figma-footer-col figma-footer-col-logo">
            <div className="figma-footer-brand-wrap">
              <img 
                src="/secound logo.png" 
                alt="VISIONX" 
                className="figma-footer-white-logo" 
              />
            </div>
            <div className="figma-footer-socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="figma-social-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="figma-social-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="figma-social-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Location */}
          <div className="figma-footer-col">
            <h3 className="figma-footer-col-title">Location</h3>
            <p className="figma-footer-text">Hyderabad, Telangana, india</p>
          </div>

          {/* Col 3: Quick Links */}
          <div className="figma-footer-col">
            <h3 className="figma-footer-col-title">Quick Links</h3>
            <ul className="figma-footer-nav-list">
              <li>
                <a href="#home" onClick={(e) => handleLinkClick('home', e)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick('about', e)}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleLinkClick('about', e)}>
                  What We Offer
                </a>
              </li>
              <li>
                <a href="#clients" onClick={(e) => handleLinkClick('clients', e)}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLinkClick('reviews', e)}>
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={(e) => handleLinkClick('reviews', e)}>
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="figma-footer-col">
            <h3 className="figma-footer-col-title">Legal</h3>
            <ul className="figma-footer-nav-list">
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()}>
                  Our Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()}>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer Copyright & Developer Credits */}
        <div className="figma-footer-bottom-bar">
          <p className="figma-footer-copyright">
            © 2026 VisionX English Platform. All rights reserved.
          </p>
          <p className="figma-footer-credits">
            Design and Developed by{' '}
            <a
              href="https://www.linkedin.com/in/hareesh-ai-dev?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-dev-link"
            >
              Hareesh
            </a>
            {' '}and{' '}
            <a
              href="https://www.linkedin.com/in/rahul-ai-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-dev-link"
            >
              Ragul
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
