import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effect to detect scroll and add a border/shadow if needed
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* LOGO */}
        <div className="logo-group" onClick={() => navigate("/")}>
          <div className="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 22h20L12 2z" fill="white" stroke="none" />
            </svg>
          </div>
          <span className="brand">FileGhost</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="desktop-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
        </div>

        {/* DESKTOP AUTH */}
        <div className="desktop-auth">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="signup-btn">Sign Up</button>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
          <span className={`bar ${isOpen ? "open" : ""}`}></span>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
          <div className="mobile-links">
            <a href="#features" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)}>
              How it works
            </a>
            <a href="#pricing" onClick={() => setIsOpen(false)}>
              Pricing
            </a>
            <div className="mobile-divider"></div>
            <button
              className="mobile-login"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            >
              Log In
            </button>
            <button className="mobile-signup">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
