import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import "../styles/global.css";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="full-screen-wrapper">
      <div className="bg-grid-pattern"></div>
      <div className="main-frame" style={{ overflowY: "auto" }}>
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-left">
              <span className="nav-brand">Terms of Service</span>
            </div>
            <div className="nav-right">
              <button className="btn-secondary" onClick={() => navigate("/")}>
                <ArrowLeft size={16} /> Home
              </button>
            </div>
          </div>
        </nav>

        <div
          className="content-scroll"
          style={{
            padding: "60px 20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: "700px", color: "#a1a1aa" }}>
            <h1
              style={{ color: "#fff", fontSize: "36px", marginBottom: "24px" }}
            >
              The Rules of Engagement
            </h1>

            <p
              style={{
                marginBottom: "24px",
                fontSize: "18px",
                lineHeight: "1.6",
              }}
            >
              By using FileGhost, you agree to the following terms. If you don't
              agree, simply close the tab and go outside. It's nice out there.
            </p>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>
              1. Don't be Evil
            </h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              Do not upload malware, viruses, illegal content, or nuclear launch
              codes. If you use our service for evil, we will be very
              disappointed in you. Also, we will ban you.
            </p>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>2. No Warranty</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              FileGhost is provided "as is." If the service goes down, or if a
              solar flare wipes out the internet, we are not liable for your
              lost cat photos.
            </p>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>
              3. The "Burn" Promise
            </h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              When we say a file is deleted, it is deleted. Do not email us
              asking to restore it. We can't. It's electronic dust.
            </p>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>4. File Sizes</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              Don't try to upload the entire internet. Keep file sizes
              reasonable, or our servers will cry.
            </p>

            <div
              style={{
                marginTop: "60px",
                padding: "20px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <AlertTriangle color="#ef4444" size={20} />
                <h4 style={{ color: "#fff", margin: 0 }}>Legal Disclaimer</h4>
              </div>
              <p style={{ fontSize: "13px" }}>
                We are not responsible for what you send. You are the captain of
                your own ship. We just provide the invisible ink.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
