import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.column}>
          <div style={styles.logo}>FileGhost</div>
          <p style={styles.copy}>© 2025 FileGhost Inc.</p>
        </div>

        <div style={styles.linksGroup}>
          <div style={styles.column}>
            <h5 style={styles.heading}>Product</h5>
            <a href="#" style={styles.link}>
              Encryption
            </a>
            <a href="#" style={styles.link}>
              Sharing
            </a>
            <a href="#" style={styles.link}>
              Pricing
            </a>
          </div>
          <div style={styles.column}>
            <h5 style={styles.heading}>Legal</h5>
            <a href="#" style={styles.link}>
              Privacy Policy
            </a>
            <a href="#" style={styles.link}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: "1px solid var(--accents-2)",
    padding: "50px 0",
    marginTop: "auto",
    backgroundColor: "#000",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: 700,
    fontSize: "20px",
    marginBottom: "10px",
  },
  copy: {
    color: "var(--accents-4)",
    fontSize: "14px",
  },
  linksGroup: {
    display: "flex",
    gap: "60px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  heading: {
    color: "var(--geist-foreground)",
    fontSize: "14px",
    marginBottom: "8px",
  },
  link: {
    color: "var(--accents-5)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "0.2s",
  },
};

export default Footer;
