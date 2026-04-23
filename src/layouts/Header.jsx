import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      navigate("/login", { state: { message: "You have been logged out" } });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { path: "/medications", label: "Medications", icon: "💊" },
    { path: "/prescriptions", label: "Prescriptions", icon: "📋" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const getUserInitials = () => {
    if (!currentUser) return "";
    return currentUser.displayName
      ? currentUser.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
      : currentUser.email?.slice(0, 2).toUpperCase() || "U";
  };

  return (
    // ✅ Code 1 के अनुसार: shadow-sm और transition-colors
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          className="flex items-center space-x-2 cursor-pointer"
          to={currentUser ? "/medications" : "/"}
        >
          <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            MediTrack
          </span>
        </Link>


        {currentUser && (
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${isActive(path)
                    ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <span>{icon}</span>
                <span>{label}</span>

                {isActive(path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>
        )}


        <div className="flex items-center space-x-3">

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {darkMode ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {currentUser ? (
            <div className="flex items-center space-x-3">
              {/* User Avatar (Desktop only) */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">{getUserInitials()}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
            >
              Sign In
            </button>
          )}

          {/* Hamburger (Only Mobile) */}
          {currentUser && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          )}
        </div>
      </div>


      {currentUser && isMobileMenuOpen && (
        <div className="md:hidden border-t dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex flex-col">
            {navLinks.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-6 py-4 border-l-4 transition-colors
                  ${isActive(path)
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border-indigo-600"
                    : "text-gray-500 dark:text-gray-400 border-transparent"
                  }`}
              >
                <span className="text-xl">{icon}</span>
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;