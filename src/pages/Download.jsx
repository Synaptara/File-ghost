import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Download,
  File,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Moon,
  Key,
  Unlock,
  X,
  ArrowLeft,
  Trash2,
  Flame,
} from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import {
  importKeyFromBase64,
  deriveKeyFromPassword,
  decryptFile,
} from "../utils/crypto";
import "../styles/global.css";

const DownloadPage = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();

  // UI States
  // status: loading | prompt_pass | ready_to_decrypt | decrypting | success | expired | manually_burned
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [blobData, setBlobData] = useState(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [decryptedFile, setDecryptedFile] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchFile(fileId);
  }, [fileId]);

  // --- DELETE FUNCTION ---
  const deleteFileFromStorage = async () => {
    console.log(`Attempting to burn file: ${fileId}.enc`);
    const { error } = await supabase.storage
      .from("fileghost_uploads")
      .remove([`${fileId}.enc`]);

    if (error) {
      console.error("Supabase Delete Error:", error);
      showToast("error", "Error: Could not verify deletion.");
      return false;
    }
    return true;
  };

  // --- MANUAL BURN HANDLER ---
  const handleManualBurn = async () => {
    const confirmBurn = window.confirm(
      "Are you sure you want to incinerate this payload? This cannot be undone."
    );
    if (!confirmBurn) return;

    const success = await deleteFileFromStorage();
    if (success) {
      setStatus("manually_burned");
      showToast("success", "Payload incinerated successfully.");
    }
  };

  const fetchFile = async (id) => {
    try {
      const { data, error } = await supabase.storage
        .from("fileghost_uploads")
        .download(`${id}.enc?t=${Date.now()}`);

      if (error) {
        setStatus("expired");
        setErrorMsg("This link has been burned or does not exist.");
        return;
      }

      setBlobData(data);

      const hash = window.location.hash.substring(1);
      if (hash) {
        setStatus("ready_to_decrypt");
      } else {
        setStatus("prompt_pass");
      }
    } catch (err) {
      console.error(err);
      setStatus("expired");
      setErrorMsg("Link expired or network error.");
    }
  };

  const handleDecryption = async () => {
    if (!blobData) return;
    setStatus("decrypting");

    try {
      const arrayBuffer = await blobData.arrayBuffer();
      const salt = arrayBuffer.slice(0, 16);
      const iv = arrayBuffer.slice(16, 28);
      const ciphertext = arrayBuffer.slice(28);

      let key;
      const hashKey = window.location.hash.substring(1);

      if (hashKey) {
        key = await importKeyFromBase64(hashKey);
      } else {
        if (!passwordInput) throw new Error("Password required");
        key = await deriveKeyFromPassword(passwordInput, salt);
      }

      const decryptedBuffer = await decryptFile(ciphertext, key, iv);

      const dec = new TextDecoder();
      const jsonString = dec.decode(decryptedBuffer);
      const filePackage = JSON.parse(jsonString);

      // --- CHECK 24H EXPIRY ---
      if (filePackage.x === "24h") {
        const now = Date.now();
        const hours24 = 24 * 60 * 60 * 1000;
        if (now - filePackage.ts > hours24) {
          await deleteFileFromStorage();
          setStatus("expired");
          setErrorMsg("This 24-hour link has expired.");
          return;
        }
      }

      setDecryptedFile(filePackage);
      setStatus("success");
      showToast("success", "File decrypted successfully.");
    } catch (err) {
      console.error(err);
      setStatus("prompt_pass");
      setPasswordInput("");
      showToast("error", "Incorrect password.");
    }
  };

  const handleDownload = async () => {
    if (!decryptedFile) return;

    // 1. Download
    const link = document.createElement("a");
    link.href = decryptedFile.d;
    link.download = decryptedFile.n;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Burn if needed
    if (decryptedFile.x === "burn") {
      await deleteFileFromStorage();
      setStatus("expired");
      setErrorMsg("File downloaded. Link has been destroyed.");
      showToast("success", "Download complete. Link burned.");
    } else {
      showToast("success", "Download started.");
    }
  };

  return (
    <div className="full-screen-wrapper">
      <div className="bg-grid-pattern"></div>

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
            <div className="nav-right">
              <button className="icon-btn">
                <Moon size={18} />
              </button>
            </div>
          </div>
        </nav>

        <div className="content-scroll">
          <div className="center-layout">
            <div
              className="enc-container"
              style={{ maxWidth: "440px", width: "100%" }}
            >
              {/* --- VIEW 1: MANUALLY BURNED (FIRE ANIMATION) --- */}
              {status === "manually_burned" && (
                <div className="fade-in-up">
                  <div
                    className="expired-card"
                    style={{
                      borderColor: "#f97316",
                      boxShadow: "0 0 50px rgba(249, 115, 22, 0.1)",
                    }}
                  >
                    <div
                      className="expired-icon-box"
                      style={{
                        background: "rgba(249, 115, 22, 0.1)",
                        borderColor: "rgba(249, 115, 22, 0.2)",
                        animation: "pulse 2s infinite",
                      }}
                    >
                      <Flame size={32} color="#f97316" />
                    </div>
                    <h2 className="expired-title">Payload Incinerated</h2>
                    <p className="expired-desc">
                      You have manually burned this file. It has been
                      permanently deleted from the server.
                    </p>
                    <button
                      className="btn-action btn-ghost-action"
                      onClick={() => navigate("/")}
                    >
                      <ArrowLeft size={16} /> Return to Home
                    </button>
                  </div>
                </div>
              )}

              {/* --- VIEW 2: EXPIRED / ERROR --- */}
              {(status === "error" || status === "expired") && (
                <div className="fade-in-up">
                  <div className="expired-card">
                    <div className="expired-icon-box">
                      <AlertTriangle size={32} color="#ef4444" />
                    </div>
                    <h2 className="expired-title">Link Expired</h2>
                    <p className="expired-desc">{errorMsg}</p>
                    <button
                      className="btn-action btn-ghost-action"
                      onClick={() => navigate("/")}
                    >
                      <ArrowLeft size={16} /> Return to Home
                    </button>
                  </div>
                </div>
              )}

              {/* --- VIEW 3: ACTIVE --- */}
              {status !== "manually_burned" &&
                status !== "error" &&
                status !== "expired" && (
                  <>
                    <div className="enc-header fade-in-up">
                      <h1>
                        Secure <span className="text-gradient">Receive</span>
                      </h1>
                      <p>You have received an encrypted payload.</p>
                    </div>

                    <div
                      className="enc-split-view fade-in-up"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gridTemplateColumns: "none",
                        height: "auto",
                        minHeight: "320px",
                        padding: "40px 32px",
                        gap: "24px",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        animationDelay: "0.1s",
                      }}
                    >
                      {/* 1. LOADING */}
                      {status === "loading" && (
                        <div className="fade-in">
                          <div
                            className="loading-spinner"
                            style={{ margin: "0 auto 16px" }}
                          ></div>
                          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
                            Locating secure blob...
                          </p>
                        </div>
                      )}

                      {/* 2. PASSWORD PROMPT */}
                      {status === "prompt_pass" && (
                        <div className="fade-in" style={{ width: "100%" }}>
                          <div
                            className="file-icon-box"
                            style={{
                              margin: "0 auto 24px",
                              background: "#eab308",
                            }}
                          >
                            <Key size={32} color="#000" />
                          </div>
                          <h3 style={{ color: "#fff", marginBottom: "8px" }}>
                            Password Protected
                          </h3>
                          <p
                            style={{
                              color: "#a1a1aa",
                              fontSize: "13px",
                              marginBottom: "24px",
                            }}
                          >
                            Enter the password to decrypt this file.
                          </p>
                          <input
                            type="password"
                            className="modal-input"
                            placeholder="Enter Password..."
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            style={{
                              width: "100%",
                              marginBottom: "16px",
                              textAlign: "center",
                              fontSize: "16px",
                            }}
                            autoFocus
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleDecryption()
                            }
                          />

                          {/* ACTION ROW: Decrypt + Trash */}
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              width: "100%",
                            }}
                          >
                            <button
                              className="btn-action btn-primary-action"
                              onClick={handleDecryption}
                              style={{ flex: 1 }}
                            >
                              <Unlock size={16} /> Decrypt
                            </button>
                            <button
                              className="btn-action"
                              onClick={handleManualBurn}
                              title="Burn File Now"
                              style={{
                                width: "48px",
                                flex: "none",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                color: "#ef4444",
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 3. READY TO DECRYPT */}
                      {status === "ready_to_decrypt" && (
                        <div className="fade-in" style={{ width: "100%" }}>
                          <div
                            className="file-icon-box"
                            style={{ margin: "0 auto 24px" }}
                          >
                            <File size={32} color="#fff" />
                          </div>
                          <h3 style={{ color: "#fff", marginBottom: "8px" }}>
                            Encrypted Blob Found
                          </h3>
                          <p
                            style={{
                              color: "#a1a1aa",
                              fontSize: "13px",
                              marginBottom: "24px",
                            }}
                          >
                            Ready to decrypt using the link key.
                          </p>

                          {/* ACTION ROW: Decrypt + Trash */}
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              width: "100%",
                            }}
                          >
                            <button
                              className="btn-action btn-primary-action"
                              onClick={handleDecryption}
                              style={{ flex: 1 }}
                            >
                              <Unlock size={16} /> Decrypt File
                            </button>
                            <button
                              className="btn-action"
                              onClick={handleManualBurn}
                              title="Burn File Now"
                              style={{
                                width: "48px",
                                flex: "none",
                                background: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                color: "#ef4444",
                              }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 4. DECRYPTING */}
                      {status === "decrypting" && (
                        <div className="fade-in">
                          <div
                            className="loading-spinner"
                            style={{ margin: "0 auto 16px" }}
                          ></div>
                          <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
                            Decrypting & Verifying...
                          </p>
                        </div>
                      )}

                      {/* 5. SUCCESS (Download) */}
                      {status === "success" && decryptedFile && (
                        <div className="fade-in" style={{ width: "100%" }}>
                          <div
                            className="file-icon-box"
                            style={{
                              margin: "0 auto 24px",
                              background: "#22c55e",
                              boxShadow: "0 0 20px rgba(34,197,94,0.4)",
                            }}
                          >
                            <CheckCircle size={32} color="#fff" />
                          </div>
                          <h3 style={{ color: "#fff", marginBottom: "8px" }}>
                            Decryption Successful
                          </h3>
                          <p
                            style={{
                              color: "#fff",
                              fontSize: "14px",
                              marginBottom: "4px",
                              fontWeight: "500",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {decryptedFile.n}
                          </p>
                          <p
                            style={{
                              color: "#a1a1aa",
                              fontSize: "12px",
                              marginBottom: "32px",
                            }}
                          >
                            Ready for download
                          </p>
                          <button
                            className="btn-action btn-success-action"
                            onClick={handleDownload}
                          >
                            <Download size={16} /> Download File
                          </button>
                          <div
                            className="security-summary"
                            style={{
                              marginTop: "24px",
                              justifyContent: "center",
                            }}
                          >
                            <div className="summary-item">
                              <ShieldCheck size={14} color="#22c55e" />
                              <span>End-to-End Encrypted</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
