import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import "../styles/global.css";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="full-screen-wrapper">
      <div className="bg-grid-pattern"></div>
      <div className="main-frame" style={{ overflowY: "auto" }}>
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-left">
              <span className="nav-brand">FileGhost Policy</span>
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
              The "We Know Nothing" Policy
            </h1>

            <div className="doc-quote">
              "If we don't know what you uploaded, we can't sell it to
              advertisers. It's laziness, but secure laziness."
            </div>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>
              1. What we collect
            </h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              Basically, nothing useful. We collect:
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
              <li>
                Encrypted blobs that look like{" "}
                <code style={{ color: "#c084fc" }}>h8&@^#jsd9</code> to us.
              </li>
              <li>A timestamp (so we know when to delete your stuff).</li>
              <li>
                Your IP address temporarily (so you don't DDoS us, please
                don't).
              </li>
            </ul>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>2. Cookies</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              We prefer chocolate chip, but on this site? No tracking cookies.
              No analytics stalking you. We honestly don't care where you go
              after you leave.
            </p>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>
              3. Government Requests
            </h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              If the authorities ask for your data, we will hand them a pile of
              encrypted nonsense. We do not have the keys. You have the keys.
              Don't lose the keys.
            </p>

            <h3 style={{ color: "#fff", marginTop: "32px" }}>4. Changes</h3>
            <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
              We might change this policy if we get better lawyers or if we
              decide to become evil (unlikely, too much paperwork).
            </p>

            <div
              style={{
                marginTop: "60px",
                padding: "20px",
                border: "1px solid #27272a",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <ShieldCheck
                size={32}
                color="#22c55e"
                style={{ marginBottom: "10px" }}
              />
              <p style={{ color: "#fff" }}>
                TL;DR: We respect your privacy because we have no idea who you
                are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
