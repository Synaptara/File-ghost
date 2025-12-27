import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Ghost,
  Flame,
  ShieldAlert,
  Zap,
  EyeOff,
  Skull,
  Lock,
  ArrowLeft,
} from "lucide-react";
import "../styles/global.css";

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="full-screen-wrapper">
      <div className="bg-grid-pattern"></div>

      <div className="main-frame" style={{ overflowY: "auto" }}>
        <nav className="navbar">
          <div className="nav-content">
            <div className="nav-left">
              <div className="logo-icon">
                <div className="logo-dot"></div>
              </div>
              <span className="nav-brand">FileGhost</span>
            </div>
            <div className="nav-right">
              <button className="btn-secondary" onClick={() => navigate("/")}>
                <ArrowLeft size={16} /> Back
              </button>
            </div>
          </div>
        </nav>

        <div className="content-scroll">
          <div
            className="hero-section"
            style={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center", // Vertically center content
              padding: "60px 20px", // Add padding for mobile
            }}
          >
            <h1 className="hero-title">
              Our <span className="text-gradient">Superpowers</span>
            </h1>
            <p className="hero-sub" style={{ maxWidth: "600px" }}>
              We protect your files like a dragon protects gold, except we don't
              breathe fire... usually.
            </p>

            <div
              className="cards-grid"
              style={{
                maxWidth: "1000px",
                width: "100%", // Ensure it fits within smaller screens
                marginTop: "40px",
                paddingBottom: "40px", // Extra space at bottom
              }}
            >
              {/* Feature 1 */}
              <div
                className="ui-card"
                style={{ height: "auto", padding: "24px" }}
              >
                <div
                  className="expired-icon-box"
                  style={{
                    margin: "0 auto 16px",
                    background: "rgba(192, 132, 252, 0.1)",
                  }}
                >
                  <Ghost size={32} color="#c084fc" />
                </div>
                <h3
                  style={{
                    color: "#fff",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Ghost Mode
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "1.6",
                  }}
                >
                  Your files don't just "delete." They are exorcised from our
                  servers. We couldn't recover them even if you paid us in
                  pizza.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                className="ui-card"
                style={{ height: "auto", padding: "24px" }}
              >
                <div
                  className="expired-icon-box"
                  style={{
                    margin: "0 auto 16px",
                    background: "rgba(239, 68, 68, 0.1)",
                  }}
                >
                  <Flame size={32} color="#ef4444" />
                </div>
                <h3
                  style={{
                    color: "#fff",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Burn on Read
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "1.6",
                  }}
                >
                  Like a spy movie message, but without the explosion. One
                  download and *poof*—it's gone forever.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                className="ui-card"
                style={{ height: "auto", padding: "24px" }}
              >
                <div
                  className="expired-icon-box"
                  style={{
                    margin: "0 auto 16px",
                    background: "rgba(34, 197, 94, 0.1)",
                  }}
                >
                  <EyeOff size={32} color="#22c55e" />
                </div>
                <h3
                  style={{
                    color: "#fff",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Zero Knowledge
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "1.6",
                  }}
                >
                  We are digitally oblivious. Encryption happens in *your*
                  browser. To us, your file looks like gibberish soup.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                className="ui-card"
                style={{ height: "auto", padding: "24px" }}
              >
                <div
                  className="expired-icon-box"
                  style={{
                    margin: "0 auto 16px",
                    background: "rgba(234, 179, 8, 0.1)",
                  }}
                >
                  <Skull size={32} color="#eab308" />
                </div>
                <h3
                  style={{
                    color: "#fff",
                    marginBottom: "8px",
                    textAlign: "center",
                  }}
                >
                  Manual Incineration
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "1.6",
                  }}
                >
                  Changed your mind? Click the trash button and we instantly
                  vaporize the file. Very satisfying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
