import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // "admin" or null

  const handleLogout = () => {
    localStorage.removeItem("role");
    setOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition-all duration-200
     ${
       isActive
         ? "text-indigo-400 after:w-full"
         : "text-gray-200 hover:text-indigo-400"
     }
     after:absolute after:left-0 after:-bottom-1 after:h-[2px]
     after:bg-indigo-400 after:w-0 after:transition-all after:duration-300
     hover:after:w-full`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-indigo-400 cursor-pointer"
        >
          Student Project Hub
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>

          {role === "admin" && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}

          {role === "admin" ? (
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-lg
              bg-indigo-500 text-white font-semibold
              transition-all duration-200
              hover:bg-indigo-600 hover:-translate-y-[1px] hover:shadow-lg"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/admin-login"
              className="ml-4 px-4 py-2 rounded-lg
              bg-indigo-500 text-white font-semibold
              transition-all duration-200
              hover:bg-indigo-600 hover:-translate-y-[1px] hover:shadow-lg"
            >
              Admin Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-indigo-400"
        >
          <motion.span
            initial={false}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? "✕" : "☰"}
          </motion.span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/projects" className={linkClass}>
                Projects
              </NavLink>

              {role === "admin" && (
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/dashboard"
                  className={linkClass}
                >
                  Dashboard
                </NavLink>
              )}

              {role === "admin" ? (
                <button
                  onClick={handleLogout}
                  className="mt-2 px-4 py-2 rounded-lg
                  bg-indigo-500 text-white font-semibold
                  hover:bg-indigo-600"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  onClick={() => setOpen(false)}
                  to="/admin-login"
                  className="mt-2 px-4 py-2 rounded-lg
                  bg-indigo-500 text-white font-semibold
                  hover:bg-indigo-600"
                >
                  Admin Login
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
