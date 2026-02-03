import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Admin from "./Pages/Admin";
import AdminLogin from "./Pages/AdminLogin";

export default function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  // ✅ Page title logic (Netlify-safe)
  useEffect(() => {
    const titles = {
      "/": "Student Project Hub | Home",
      "/projects": "Student Project Hub | Projects",
      "/dashboard": "Student Project Hub | Dashboard",
      "/admin-login": "Student Project Hub | Admin Login",
    };
    document.title = titles[location.pathname] || "Student Project Hub";
  }, [location.pathname]);

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Routes location={location}>
            {/* Home */}
            <Route
              path="/"
              element={
                role === "admin" ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                )
              }
            />

            {/* Projects */}
            <Route
              path="/projects"
              element={
                <PageWrapper>
                  <Projects />
                </PageWrapper>
              }
            />

            {/* ✅ Admin Dashboard */}
            <Route
              path="/dashboard"
              element={
                role === "admin" ? (
                  <PageWrapper>
                    <Admin />
                  </PageWrapper>
                ) : (
                  <Navigate to="/admin-login" replace />
                )
              }
            />

            {/* Admin Login */}
            <Route
              path="/admin-login"
              element={
                <PageWrapper>
                  <AdminLogin />
                </PageWrapper>
              }
            />

            {/* Optional: fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
