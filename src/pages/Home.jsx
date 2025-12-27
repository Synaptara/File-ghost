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
  ChevronDown as ChevronDownSm,
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
} from "lucide-react";
import "../styles/global.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const scrollToUpload = () => {
    const uploadSection = document.getElementById("upload-zone");
    uploadSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper for smooth navigation
  const handleNav = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0);
  };

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
                href="https://github.com/your-repo"
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
                <button className="icon-btn">
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

          {/* 3. ENCRYPTION ZONE (TERMINAL STYLE) */}
          <section className="upload-section" id="upload-zone">
            <div className="section-label-center">
              <span className="label-text">Encryption Zone</span>
            </div>

            <div className="terminal-window">
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

              <div className="terminal-body">
                <div className="terminal-content-wrapper">
                  <div className="encrypt-icon-large">
                    <Lock size={32} color="#fff" />
                  </div>
                  <div className="text-center">
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
              {/* Connecting Chain */}
              <div className="pipeline-track">
                <div className="pipeline-beam"></div>
              </div>

              <div className="cards-grid pipeline-grid">
                {/* Card 1 */}
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

                {/* Card 2 */}
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

                {/* Card 3 */}
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

                {/* Card 4 */}
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
                    <a href="#" className="social-icon">
                      <Twitter size={16} />
                    </a>
                    <a href="#" className="social-icon">
                      <Github size={16} />
                    </a>
                    <a href="#" className="social-icon">
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
                    <a href="#">CLI</a>
                  </div>
                  <div className="footer-col">
                    <h4>Resources</h4>
                    <a href="/docs" onClick={handleNav("/docs")}>
                      Documentation
                    </a>
                    <a href="#">API Reference</a>
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

      {/* --- MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Create a new project</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <p className="modal-subtitle">
              Drag and drop files to create a new project.
            </p>

            <div className="modal-drop-zone">
              <Folder size={48} color="#52525b" />
              <p className="drop-title-modal">Upload an image or video</p>
              <p className="drop-subtitle-modal">
                or, click to browse (4 MB max)
              </p>
            </div>

            <div className="modal-form-row">
              <div className="form-group">
                <label>Project name</label>
                <input
                  type="text"
                  className="modal-input"
                  defaultValue="Ollie's Project"
                />
              </div>
              <div className="form-group">
                <label>Team</label>
                <div className="modal-select">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div className="team-avatar">W</div>
                    <span>Watchtower</span>
                  </div>
                  <ChevronDownSm size={16} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Add tags (optional)</label>
                <span className="label-hint">20 tags remaining</span>
              </div>
              <div className="tags-input-container">
                <input
                  type="text"
                  className="tags-input"
                  placeholder="Type to search..."
                />
              </div>
              <div className="tags-list">
                <span className="tag-badge">
                  <Plus size={12} /> Web Design
                </span>
                <span className="tag-badge">
                  <Plus size={12} /> UI Design
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary">Save as draft</button>
              <div className="footer-right">
                <button className="btn-secondary">
                  <Calendar size={16} /> Schedule
                </button>
                <button className="btn-primary-modal">Share now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
