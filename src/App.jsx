import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import Encryption from "./pages/Encryption";
import DownloadPage from "./pages/Download";
import Features from "./pages/Features";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// --- UNCOMMENT THIS LINE ---
import Documentation from "./pages/Documentation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encryption" element={<Encryption />} />
        <Route path="/d/:fileId" element={<DownloadPage />} />

        <Route path="/features" element={<Features />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* --- UNCOMMENT THIS ROUTE --- */}
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;
