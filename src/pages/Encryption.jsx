import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Moon,
  Github,
  UploadCloud,
  File,
  X,
  Clock,
  Key,
  CheckCircle,
  Copy,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  Twitter,
  Disc,
  AlertTriangle,
} from "lucide-react";
import {
  generateRandomKey,
  deriveKeyFromPassword,
  encryptFile,
  exportKeyToBase64,
} from "../utils/crypto";
import { supabase } from "../utils/supabaseClient";
import "../styles/global.css";

const Encryption = () => {
  const navigate = useNavigate();

  // Data States
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [expiryMode, setExpiryMode] = useState("burn"); // 'burn' | '24h'

  // UI States
  const [status, setStatus] = useState("idle"); // idle, encrypting, complete
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [shareLink, setShareLink] = useState("");
  const [toast, setToast] = useState(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Toast Helper
  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });
  };

  const startProcess = async () => {
    if (!file) return;

    try {
      setStatus("encrypting");
      setProgress(5);
      setLogs((p) => [...p, "Initializing Secure Context..."]);

      // 1. Pack Metadata + Expiration Rules
      setLogs((p) => [
        ...p,
        `Packing mode: ${expiryMode === "burn" ? "Burn on Read" : "24 Hours"}`,
      ]);
      const dataUrl = await readFileAsDataURL(file);

      const filePackage = JSON.stringify({
        n: file.name,
        t: file.type,
        d: dataUrl,
        x: expiryMode, // 'burn' or '24h'
        ts: Date.now(),
      });

      const enc = new TextEncoder();
      const packedBuffer = enc.encode(filePackage);

      setProgress(20);

      // 2. Generate Key
      let key;
      let salt = window.crypto.getRandomValues(new Uint8Array(16));

      if (password) {
        setLogs((p) => [...p, "Deriving Key from Password (PBKDF2)..."]);
        key = await deriveKeyFromPassword(password, salt);
      } else {
        setLogs((p) => [...p, "Generating Random AES-256 Key..."]);
        key = await generateRandomKey();
      }
      setProgress(30);

      // 3. Encrypt
      const { ciphertext, iv } = await encryptFile(packedBuffer, key);
      setProgress(60);

      // 4. Combine & Upload
      const combinedBlob = new Blob([salt, iv, ciphertext]);
      const fileId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const fileName = `${fileId}.enc`;

      const { error } = await supabase.storage
        .from("fileghost_uploads")
        .upload(fileName, combinedBlob);

      if (error) throw error;

      setProgress(90);
      setLogs((p) => [...p, "Upload successful."]);

      // 5. Generate Link
      let link = `${window.location.origin}/d/${fileId}`;
      if (!password) {
        const keyString = await exportKeyToBase64(key);
        link += `#${keyString}`;
      }

      setShareLink(link);
      setProgress(100);
      setStatus("complete");
      setLogs((p) => [...p, "Link generated."]);
      showToast("success", "File secured successfully.");
    } catch (error) {
      console.error(error);
      setLogs((p) => [...p, `ERROR: ${error.message}`]);
      setStatus("idle");
      showToast("error", "Encryption failed.");
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    showToast("success", "Link copied to clipboard!");
  };

  return (
    <div className="full-screen-wrapper">
      <div className="bg-grid-pattern"></div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === "error" ? (
              <AlertTriangle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
            <span>{toast.msg}</span>
            <button
              onClick={() => setToast(null)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                marginLeft: "auto",
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="main-frame">
        <div className="corner-mark top-left"></div>
        <div className="corner-mark top-right"></div>
        <div className="corner-mark bottom-left"></div>
        <div className="corner-mark bottom-right"></div>

        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-left">
              <div className="logo-icon">
                <div className="logo-dot"></div>
              </div>
              <span className="nav-brand">FileGhost</span>
            </div>
            <div className="nav-center hidden-mobile">
              <a href="/" className="nav-link">
                Home
              </a>
              <a
                href="#"
                className="nav-link"
                onClick={() => navigate("/docs")}
              >
                Docs
              </a>
              <a href="#" className="nav-link active">
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

        <div className="content-scroll">
          <div className="enc-layout">
            <div className="enc-container">
              <div className="enc-header">
                <h1>
                  Secure Transport{" "}
                  <span className="text-gradient">Protocol</span>
                </h1>
                <p>Configure your payload. Encryption happens locally.</p>
              </div>

              {/* IDLE STATE */}
              {status === "idle" && (
                <div className="enc-split-view">
                  <div
                    className={`drop-zone-area ${file ? "active" : ""}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                  >
                    {file ? (
                      <div className="file-preview">
                        <div className="file-icon-box">
                          <File size={32} color="#fff" />
                        </div>
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">
                            {(file.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                        <button
                          className="btn-remove"
                          onClick={() => setFile(null)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="upload-icon-circle">
                          <UploadCloud size={24} color="#a1a1aa" />
                        </div>
                        <p className="drop-text">Drag file here</p>
                        <div
                          style={{ position: "relative", overflow: "hidden" }}
                        >
                          <button className="btn-browse-file">
                            Browse Files
                          </button>
                          <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              opacity: 0,
                              width: "100%",
                              height: "100%",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="config-panel">
                    <div className="config-group">
                      <label>
                        <Key size={14} /> Password (Optional)
                      </label>
                      <input
                        type="password"
                        placeholder="Set decryption password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* EXPIRY SELECTOR */}
                    <div className="config-group">
                      <label>
                        <Clock size={14} /> Expiration
                      </label>
                      <div className="select-wrapper">
                        <select
                          value={expiryMode}
                          onChange={(e) => setExpiryMode(e.target.value)}
                        >
                          <option value="burn">
                            Burn on Read (1 Download)
                          </option>
                          <option value="24h">24 Hours</option>
                        </select>
                        <ChevronDown className="select-arrow" size={14} />
                      </div>
                    </div>

                    <div className="security-summary">
                      <div className="summary-item">
                        <ShieldCheck size={14} color="#22c55e" />
                        <span>AES-256-GCM</span>
                      </div>
                    </div>
                    <button
                      className="btn-start-encrypt"
                      disabled={!file}
                      onClick={startProcess}
                    >
                      Encrypt & Upload <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* ENCRYPTING STATE */}
              {status === "encrypting" && (
                <div className="terminal-process">
                  <div className="terminal-header-bar">
                    <span className="term-title">
                      crypto_worker.js — processing
                    </span>
                    <div className="loading-spinner"></div>
                  </div>
                  <div className="terminal-logs">
                    {logs.map((log, index) => (
                      <div key={index} className="log-line">
                        <span className="log-arrow">{">"}</span> {log}
                      </div>
                    ))}
                    <div className="log-cursor"></div>
                  </div>
                  <div className="progress-bar-container">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* COMPLETE STATE */}
              {status === "complete" && (
                <div className="success-view">
                  <div className="success-icon">
                    <CheckCircle size={48} color="#22c55e" />
                  </div>
                  <h2>Payload Secured.</h2>
                  <p>
                    {password
                      ? "Password set. Link does NOT contain the key."
                      : "Link contains the decryption key."}
                  </p>

                  <div className="link-box">
                    <input type="text" readOnly value={shareLink} />
                    <button className="btn-copy" onClick={copyToClipboard}>
                      <Copy size={16} />
                    </button>
                  </div>

                  <div className="action-row">
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setStatus("idle");
                        setFile(null);
                        setPassword("");
                        setLogs([]);
                        setProgress(0);
                      }}
                    >
                      <RefreshCw size={14} /> Encrypt Another
                    </button>
                    <span className="burn-notice">
                      {expiryMode === "burn"
                        ? "Link expires after 1 read."
                        : "Link expires in 24 hours."}
                    </span>
                  </div>
                </div>
              )}
            </div>
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
                    <a href="#" onClick={() => navigate("/features")}>
                      Features
                    </a>
                    <a href="#">Security</a>
                    <a href="#">CLI</a>
                  </div>
                  <div className="footer-col">
                    <h4>Resources</h4>
                    <a href="#" onClick={() => navigate("/docs")}>
                      Documentation
                    </a>
                    <a href="#">API Reference</a>
                  </div>
                  <div className="footer-col">
                    <h4>Legal</h4>
                    <a href="#" onClick={() => navigate("/privacy")}>
                      Privacy Policy
                    </a>
                    <a href="#" onClick={() => navigate("/terms")}>
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
    </div>
  );
};

const ChevronDown = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default Encryption;
