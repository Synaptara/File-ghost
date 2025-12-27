import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Moon,
  X,
  Zap,
  ChevronDown,
  Folder,
  Plus,
  Calendar,
  ShieldCheck,
  Server,
  Network,
  Terminal,
  Twitter,
  Disc,
  ArrowRight,
  BookOpen,
  Code2,
  Cpu,
  Globe,
  Database,
  Lock,
  Key,
  Smile,
  Sun,
  Flashlight,
  Ghost,
  Bot,
  FileCode,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import "../styles/global.css";

const Home = () => {
  const navigate = useNavigate();

  // --- CONFIGURATION ---
  const GITHUB_URL = "https://github.com/Synaptara"; // REPLACE THIS

  // --- STATE MANAGEMENT ---
  const [lightsOutMode, setLightsOutMode] = useState(false); // The "Punishment" view
  const [warnedOnce, setWarnedOnce] = useState(false); // Tracks moon clicks

  // Unified Modal State to handle different humor scenarios
  // Structure: { type: string, title: string, message: string, icon: Component, buttonText: string, action: function }
  const [activeModal, setActiveModal] = useState(null);

  const scrollToUpload = () => {
    const uploadSection = document.getElementById("upload-zone");
    uploadSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNav = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

  const closeModal = () => setActiveModal(null);

  // --- HUMOR HANDLERS ---

  // 1. Moon/Dark Mode Logic
  const handleMoonClick = () => {
    if (!warnedOnce) {
      // First Warning
      setWarnedOnce(true);
      setActiveModal({
        type: "WARNING",
        title: "Whoa there, Night Owl!",
        message:
          "This app is already in Dark Mode. If it gets any darker, you'll need military-grade night vision goggles to read the text.",
        icon: <Moon size={32} color="#fbbf24" />,
        buttonText: "I understand, keep it spooky",
        action: closeModal,
      });
    } else {
      // Punishment
      setLightsOutMode(true);
      closeModal();
    }
  };

  // 2. CLI Logic
  const handleCliClick = (e) => {
    e.preventDefault();
    setActiveModal({
      type: "COMEDY",
      title: "Whoa, Mr. Robot.",
      message:
        "We don't actually have a CLI yet. Real hackers just stare at the matrix code until it makes sense. Just type furiously on your keyboard to look busy.",
      icon: <Terminal size={32} color="#10b981" />,
      buttonText: "I'll pretend I'm hacking",
      action: closeModal,
    });
  };

  // 3. API Reference Logic
  const handleApiClick = (e) => {
    e.preventDefault();
    setActiveModal({
      type: "COMEDY",
      title: "404: Motivation Not Found",
      message:
        "The API documentation is currently written in invisible ink on a napkin somewhere. It's very secure. Even we can't read it.",
      icon: <FileCode size={32} color="#f472b6" />,
      buttonText: "I'll wait for the napkin",
      action: closeModal,
    });
  };

  // 4. Social Bait & Switch (Twitter/Disc -> GitHub)
  const handleSocialBait = (e) => {
    e.preventDefault();
    setActiveModal({
      type: "REDIRECT",
      title: "Wait, this isn't Social Media...",
      message:
        "You really thought I have a social life? Ha! I just write code. You were looking for my work anyway, weren't you? Here is the real treasure.",
      icon: <Ghost size={32} color="#a78bfa" />,
      buttonText: "Fine, take me to GitHub",
      action: () => {
        window.open(GITHUB_URL, "_blank");
        closeModal();
      },
    });
  };

  // --- VIEW: LIGHTS OUT MODE (The Consequence) ---
  if (lightsOutMode) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#333",
          textAlign: "center",
          padding: "20px",
          zIndex: 99999,
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Flashlight size={48} color="#444" />
        </div>
        <h1 style={{ fontSize: "2rem", color: "#222", marginBottom: "10px" }}>
          Happy now?
        </h1>
        <p style={{ maxWidth: "500px", fontSize: "1.1rem", lineHeight: 1.6 }}>
          You wanted "Darker". You ignored the warning. <br />
          Welcome to <strong>Advanced Darkness</strong>.
        </p>
        <p
          style={{
            marginTop: "20px",
            fontStyle: "italic",
            fontSize: "0.9rem",
            color: "#1a1a1a",
          }}
        >
          (Good luck finding your files in this void.)
        </p>

        <button
          onClick={() => setLightsOutMode(false)}
          style={{
            marginTop: "60px",
            background: "transparent",
            border: "1px solid #333",
            color: "#444",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#fff";
            e.target.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#333";
            e.target.style.color = "#444";
          }}
        >
          <Sun size={18} /> I regret my decisions. Turn lights on.
        </button>
      </div>
    );
  }

  // --- VIEW: NORMAL SITE ---
  return (
    <div className="full-screen-wrapper">
      <div className="bg-grid-pattern"></div>

      {/* --- MAIN FRAME --- */}
      <div className="main-frame">
        <div className="corner-mark top-left"></div>
        <div className="corner-mark top-right"></div>
        <div className="corner-mark bottom-left"></div>
        <div className="corner-mark bottom-right"></div>

        {/* --- NAVBAR --- */}
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-left">
              <div className="logo-icon">
                <div className="logo-dot"></div>
              </div>
              <span className="nav-brand">FileGhost</span>
            </div>
            <div className="nav-center hidden-mobile">
              <a href="/" className="nav-link active" onClick={handleNav("/")}>
                Overview
              </a>
              <a
                href="/encryption"
                className="nav-link"
                onClick={handleNav("/encryption")}
              >
                Secure Now
              </a>
              <a href="/docs" className="nav-link" onClick={handleNav("/docs")}>
                Docs
              </a>
            </div>
            <div className="nav-right">
              <a
                href={GITHUB_URL}
                target="_blank"
                className="github-pill"
                rel="noreferrer"
              >
                <Github size={14} fill="black" />
                <span>Star</span>
                <span className="star-count">109</span>
              </a>
              <div className="divider-vertical"></div>
              <div className="nav-icon-group">
                {/* --- THE TRAP BUTTON --- */}
                <button
                  className="icon-btn"
                  onClick={handleMoonClick}
                  title={warnedOnce ? "Don't push it..." : "Dark Mode"}
                >
                  <Moon size={18} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="content-scroll">
          {/* 1. HERO SECTION */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="badge-wrapper">
                <span className="hero-badge">New: CLI Tool v2.0</span>
              </div>
              <h1 className="hero-title">
                Share files securely with <br />
                <span className="text-gradient">Zero Knowledge.</span>
              </h1>
              <p className="hero-sub">
                End-to-end encrypted file sharing. You control the keys, we just
                hold the encrypted blob. Open source and auditable.
              </p>

              {/* Hero Action Buttons */}
              <div className="hero-actions-group">
                <button className="btn-hero-primary" onClick={scrollToUpload}>
                  Start Encrypting <ArrowRight size={16} />
                </button>

                <button
                  className="btn-hero-secondary"
                  onClick={() => navigate("/docs")}
                >
                  <BookOpen size={16} /> Documentation
                </button>
              </div>
            </div>

            <div className="scroll-hint" onClick={scrollToUpload}>
              <span className="hint-text">Enter Encryption Zone</span>
              <ChevronDown size={20} className="animate-bounce" />
            </div>
          </section>

          {/* 2. TECH STACK STRIP */}
          <div className="logo-strip">
            <span className="strip-label">Powered by modern web standards</span>
            <div className="logos-row">
              <div className="logo-item">
                <Code2 size={16} /> React 19
              </div>
              <div className="logo-item">
                <Zap size={16} /> Vite
              </div>
              <div className="logo-item">
                <Cpu size={16} /> WebCrypto API
              </div>
              <div className="logo-item">
                <Globe size={16} /> Vercel Edge
              </div>
              <div className="logo-item">
                <Database size={16} /> Blob Store
              </div>
            </div>
          </div>

          {/* 3. ENCRYPTION ZONE */}
          <section
            className="upload-section"
            id="upload-zone"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: "80px 24px",
            }}
          >
            <div
              className="section-label-center"
              style={{ marginBottom: "32px" }}
            >
              <span className="label-text">Encryption Zone</span>
            </div>

            <div
              className="terminal-window"
              style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <div className="terminal-bar">
                <div className="window-dots">
                  <div className="dot red"></div>
                  <div className="dot yellow"></div>
                  <div className="dot green"></div>
                </div>
                <div className="terminal-title">
                  fileghost-encrypt-engine — zsh
                </div>
              </div>

              <div
                className="terminal-body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "60px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  className="terminal-content-wrapper"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  <div className="encrypt-icon-large">
                    <Lock size={32} color="#fff" />
                  </div>
                  <div>
                    <h2 className="encrypt-heading">Initialize Encryption</h2>
                    <p className="encrypt-sub">
                      Establishing secure AES-256 GCM session. <br />
                      Files are encrypted locally before upload.
                    </p>
                  </div>

                  <button
                    className="btn-terminal-encrypt"
                    onClick={() => navigate("/encryption")}
                  >
                    <Terminal size={16} />
                    <span>Start Process</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 4. SECURITY SYSTEM PIPELINE */}
          <section className="grid-section">
            <div className="section-header-row">
              <h3>Security Lifecycle</h3>
              <div className="header-line"></div>
            </div>

            {/* Pipeline Wrapper */}
            <div className="pipeline-wrapper">
              <div className="pipeline-track">
                <div className="pipeline-beam"></div>
              </div>

              <div className="cards-grid pipeline-grid">
                <div className="ui-card pipeline-card">
                  <div className="card-visual">
                    <div className="visual-shield">
                      <ShieldCheck size={28} color="#e4e4e7" />
                    </div>
                  </div>
                  <div className="card-footer">
                    <span className="card-title">Client-Side</span>
                    <span className="card-subtitle">Local encryption</span>
                  </div>
                </div>

                <div className="ui-card pipeline-card">
                  <div className="card-visual">
                    <div className="visual-network">
                      <Network size={28} color="#71717a" />
                      <div className="connector-dot"></div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <span className="card-title">Secure Transit</span>
                    <span className="card-subtitle">TLS 1.3 tunnel</span>
                  </div>
                </div>

                <div className="ui-card pipeline-card">
                  <div className="card-visual">
                    <div className="visual-server">
                      <Server size={28} color="#fff" />
                    </div>
                  </div>
                  <div className="card-footer">
                    <span className="card-title">Blob Storage</span>
                    <span className="card-subtitle">Ciphertext only</span>
                  </div>
                </div>

                <div className="ui-card pipeline-card">
                  <div className="card-visual">
                    <div className="visual-key">
                      <Key size={28} color="#a1a1aa" />
                    </div>
                  </div>
                  <div className="card-footer">
                    <span className="card-title">Key Management</span>
                    <span className="card-subtitle">User controlled</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. FOOTER */}
          <footer className="site-footer">
            <div className="footer-content">
              <div className="footer-top">
                <div className="footer-brand-col">
                  <div className="nav-left" style={{ marginBottom: "20px" }}>
                    <div className="logo-icon">
                      <div className="logo-dot"></div>
                    </div>
                    <span className="nav-brand">FileGhost</span>
                  </div>
                  <div className="social-links">
                    {/* SOCIAL BAIT: Clicking Twitter triggers humor + Github Link */}
                    <a
                      href="#"
                      className="social-icon"
                      onClick={handleSocialBait}
                    >
                      <Twitter size={16} />
                    </a>
                    {/* GENUINE GITHUB LINK */}
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="social-icon"
                    >
                      <Github size={16} />
                    </a>
                    {/* SOCIAL BAIT: Clicking Disc triggers humor + Github Link */}
                    <a
                      href="#"
                      className="social-icon"
                      onClick={handleSocialBait}
                    >
                      <Disc size={16} />
                    </a>
                  </div>
                </div>
                <div className="footer-links-group">
                  <div className="footer-col">
                    <h4>Product</h4>
                    <a href="/features" onClick={handleNav("/features")}>
                      Features
                    </a>
                    <a href="/encryption" onClick={handleNav("/encryption")}>
                      Security
                    </a>
                    {/* CLI HUMOR TRIGGER */}
                    <a href="#" onClick={handleCliClick}>
                      CLI
                    </a>
                  </div>
                  <div className="footer-col">
                    <h4>Resources</h4>
                    <a href="/docs" onClick={handleNav("/docs")}>
                      Documentation
                    </a>
                    {/* API HUMOR TRIGGER */}
                    <a href="#" onClick={handleApiClick}>
                      API Reference
                    </a>
                  </div>
                  <div className="footer-col">
                    <h4>Legal</h4>
                    <a href="/privacy" onClick={handleNav("/privacy")}>
                      Privacy Policy
                    </a>
                    <a href="/terms" onClick={handleNav("/terms")}>
                      Terms
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="big-text-container">
                  <h1 className="footer-watermark">FileGhost</h1>
                  <div className="copyright-row">
                    <p>&copy; 2025 FileGhost Inc.</p>
                    <div className="status-dot-row">
                      <div className="status-dot-active"></div>
                      <span>Systems Operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* --- UNIFIED HUMOR MODAL --- */}
      {activeModal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "400px",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {/* Dynamic Header with Icon */}
            <div
              className="modal-header"
              style={{
                justifyContent: "center",
                border: "none",
                paddingBottom: 0,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {activeModal.icon}
              </div>
            </div>

            <h3
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {activeModal.title}
            </h3>

            <p
              className="modal-subtitle"
              style={{
                marginBottom: "20px",
                color: "#a1a1aa",
                lineHeight: "1.5",
              }}
            >
              {activeModal.message}
            </p>

            <button
              className="btn-primary-modal"
              onClick={activeModal.action}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {activeModal.type === "REDIRECT" && <ExternalLink size={16} />}
              {activeModal.buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
