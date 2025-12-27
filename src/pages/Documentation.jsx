import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Moon,
  Terminal,
  ShieldAlert,
  Zap,
  Ghost,
  Cpu,
  Lock,
  AlertTriangle,
  Eye,
  Hash,
  Fingerprint,
  FileKey,
  Network,
  Twitter,
  Disc,
} from "lucide-react";
import "../styles/global.css";

const Documentation = () => {
  const navigate = useNavigate();

  // Helper to handle navigation without page reload
  const handleNav = (path) => (e) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo(0, 0); // Reset scroll to top
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
              <a href="/" className="nav-link" onClick={handleNav("/")}>
                Home
              </a>
              <a
                href="/docs"
                className="nav-link active"
                onClick={handleNav("/docs")}
              >
                Docs
              </a>
              <a
                href="/encryption"
                className="nav-link"
                onClick={handleNav("/encryption")}
              >
                Security
              </a>
            </div>
            <div className="nav-right">
              <div className="nav-icon-group">
                <button className="icon-btn">
                  <Moon size={18} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- DOCS LAYOUT --- */}
        <div className="docs-layout">
          {/* SIDEBAR (Sticky on Desktop, Top Scroll on Mobile) */}
          <aside className="docs-sidebar">
            <div className="sidebar-group">
              <span className="group-header">Briefing</span>
              <a href="#intro" className="sidebar-link active">
                <Ghost size={14} /> The Mission
              </a>
              <a href="#how-it-works" className="sidebar-link">
                <Cpu size={14} /> The Mechanics
              </a>
              <a href="#features" className="sidebar-link">
                <Zap size={14} /> Capabilities
              </a>
            </div>

            <div className="sidebar-group">
              <span className="group-header">Protocols</span>
              <a href="#encryption" className="sidebar-link">
                <Lock size={14} /> Encryption Specs
              </a>
              <a href="#privacy" className="sidebar-link">
                <Eye size={14} /> Privacy Model
              </a>
            </div>
          </aside>

          {/* MAIN ARTICLE AREA */}
          <main className="docs-content">
            <div className="article-container">
              {/* HEADER */}
              <div className="doc-header">
                <div className="doc-badge">v2.0.0 Classified</div>
                <h1>
                  The Paranoid’s Guide to <br />
                  <span className="text-gradient">Secure Transport.</span>
                </h1>
                <p className="doc-lead">
                  FileGhost is a zero-knowledge transfer tool for people who
                  trust no one. Not even us.{" "}
                  <span className="highlight">Especially not us.</span>
                </p>
              </div>

              <hr className="doc-divider" />

              {/* 1. INTRODUCTION */}
              <section id="intro" className="doc-section">
                <h2>
                  <Hash className="section-icon" /> The Mission
                </h2>
                <p>
                  Sending files via email creates a paper trail longer than a
                  CVS receipt. Google Drive scans your photos. Dropbox keeps
                  logs.
                </p>
                <p>
                  <strong>FileGhost is different.</strong> We perform encryption
                  right inside your browser. We store the encrypted blob, give
                  you a link, and then—poof—we forget it ever happened.
                </p>

                <div className="doc-callout warning">
                  <div className="callout-icon-box">
                    <AlertTriangle size={18} />
                  </div>
                  <div className="callout-text">
                    <strong>Warning:</strong> If you lose the share link, your
                    file is gone forever. We cannot recover it. We don't have
                    the keys. We are mathematically incapable of helping you.
                  </div>
                </div>
              </section>

              {/* 2. THE MECHANICS */}
              <section id="how-it-works" className="doc-section">
                <h2>
                  <Cpu className="section-icon" /> The Mechanics
                </h2>
                <p>
                  It's not magic, it's just math. Here is the lifecycle of a
                  file:
                </p>

                <div className="step-list">
                  <div className="step-item">
                    <div className="step-number">01</div>
                    <div className="step-content">
                      <h4>Browser Encryption</h4>
                      <p>
                        You select a file. Your browser generates a random key
                        locally using the WebCrypto API.
                      </p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">02</div>
                    <div className="step-content">
                      <h4>The Transformation</h4>
                      <p>
                        The file is turned into unreadable ciphertext
                        (AES-256-GCM). Only this blob is sent to our servers.
                      </p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-number">03</div>
                    <div className="step-content">
                      <h4>The URL Fragment</h4>
                      <p>
                        The key is added to the URL after the <code>#</code>{" "}
                        symbol.
                        <strong>
                          Servers never see what comes after the #.
                        </strong>{" "}
                        That part stays on your device.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. CAPABILITIES */}
              <section id="features" className="doc-section">
                <h2>
                  <Zap className="section-icon" /> Capabilities
                </h2>
                <div className="feature-grid-doc">
                  <div className="doc-card">
                    <ShieldAlert size={20} className="doc-card-icon" />
                    <h3>Zero Knowledge</h3>
                    <p>
                      A court order for your data would yield nothing but
                      useless, encrypted noise.
                    </p>
                  </div>
                  <div className="doc-card">
                    <FileKey size={20} className="doc-card-icon" />
                    <h3>Burn on Read</h3>
                    <p>
                      Set files to self-destruct immediately after one
                      successful download.
                    </p>
                  </div>
                  <div className="doc-card">
                    <Fingerprint size={20} className="doc-card-icon" />
                    <h3>No Accounts</h3>
                    <p>
                      No email required. No "Sign up with Google". Just upload
                      and disappear.
                    </p>
                  </div>
                  <div className="doc-card">
                    <Network size={20} className="doc-card-icon" />
                    <h3>P2P Mode</h3>
                    <p>
                      Direct peer-to-peer transfer via WebRTC for extreme
                      paranoia.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. SPECS & CODE */}
              <section id="encryption" className="doc-section">
                <h2>
                  <Terminal className="section-icon" /> Encryption Specs
                </h2>
                <p>For the engineers checking our work, here is the stack:</p>

                <ul className="spec-list">
                  <li>
                    <strong>Algorithm:</strong> AES-256-GCM (Galois/Counter
                    Mode)
                  </li>
                  <li>
                    <strong>Key Derivation:</strong> PBKDF2 with SHA-256 (100k
                    iterations)
                  </li>
                  <li>
                    <strong>IV:</strong> Unique 12-byte initialization vector
                    per file
                  </li>
                </ul>

                <div className="code-snippet">
                  <div className="code-header">
                    <div className="dots">
                      <div className="d r"></div>
                      <div className="d y"></div>
                      <div className="d g"></div>
                    </div>
                    <span>crypto_engine.ts</span>
                  </div>
                  <pre>
                    {`// Native Web Crypto API
const key = await window.crypto.subtle.generateKey(
  {
    name: "AES-GCM",
    length: 256
  },
  true,
  ["encrypt", "decrypt"]
);

// The key never leaves your RAM.`}
                  </pre>
                </div>
              </section>

              {/* 5. PRIVACY */}
              <section id="privacy" className="doc-section">
                <h2>
                  <Eye className="section-icon" /> Privacy Model
                </h2>
                <p>
                  Our business model is simple:{" "}
                  <strong>We don't want to know you.</strong> Holding user data
                  is a liability. If we get hacked, the hackers get nothing but
                  encrypted blobs.
                </p>
                <div className="doc-quote">
                  "You cannot leak what you do not have." <br />
                  <span className="quote-author">— FileGhost Principle</span>
                </div>
              </section>
            </div>
          </main>
        </div>

        {/* --- FOOTER --- */}
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
                    Privacy
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
  );
};

export default Documentation;
