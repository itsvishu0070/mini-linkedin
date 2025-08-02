// client/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State to control mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track if the screen is mobile-sized (for responsive inline styles)
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 768
  );

  // Close menu when navigating or on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  // Update isMobileScreen state on window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobileScreen(newIsMobile);
      if (!newIsMobile && isMenuOpen) {
        // If resized to desktop and menu is open, close it
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]); // Depend on isMenuOpen to correctly close menu when resizing from mobile to desktop

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Inline Styles for Navbar ---
  const navbarStyles = {
    background: "#2c3e50", // var(--navbar-bg)
    padding: isMobileScreen ? "1rem 1rem" : "15px 30px", // var(--spacing-sm) var(--spacing-lg)
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)", // var(--shadow-navbar)
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    minHeight: "60px",
  };

  const brandStyles = {
    color: "#ffffff", // var(--navbar-brand-color)
    textDecoration: "none",
    fontFamily: "'Poppins', sans-serif", // var(--font-family-heading)
    fontSize: isMobileScreen ? "1.6rem" : "1.8rem",
    fontWeight: "700",
    transition: "color 0.2s ease-out", // var(--transition-fast)
    flexShrink: 0,
  };

  // Styles for the navigation links container (navbar-links)
  const linkContainerBaseStyles = {
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease-in-out", // var(--transition-medium)
    position: isMobileScreen ? "absolute" : "static", // Positioning for mobile slide-down
    top: "100%", // Below the navbar
    left: 0,
    width: isMobileScreen ? "100%" : "auto",
    background: isMobileScreen ? "#2c3e50" : "none", // var(--navbar-bg) for mobile menu
    flexDirection: isMobileScreen ? "column" : "row",
    boxShadow: isMobileScreen ? "0 5px 15px rgba(0,0,0,0.1)" : "none", // var(--shadow-md)
    overflow: "hidden", // Hide overflowing content when closed
    zIndex: 999, // Below hamburger button
  };

  const linkContainerMobileOpenStyles = {
    maxHeight: isMenuOpen ? "300px" : "0", // Control opening/closing
    opacity: isMenuOpen ? "1" : "0",
    visibility: isMenuOpen ? "visible" : "hidden",
    padding: isMobileScreen && isMenuOpen ? "1rem 0" : "0", // Add padding only when open on mobile
    borderBottomLeftRadius: isMobileScreen ? "8px" : "0", // Rounded corners for dropdown
    borderBottomRightRadius: isMobileScreen ? "8px" : "0",
  };

  const linkContainerDesktopStyles = {
    gap: "1.5rem", // var(--spacing-md)
  };

  const linkContainerCombinedStyles = {
    ...linkContainerBaseStyles,
    ...(isMobileScreen
      ? linkContainerMobileOpenStyles
      : linkContainerDesktopStyles),
  };

  // Styles for individual nav links
  const navLinkBaseStyles = {
    color: "#ecf0f1", // var(--navbar-text)
    textDecoration: "none",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
    borderRadius: "8px", // var(--border-radius-sm)
    transition: "all 0.2s ease-out", // var(--transition-fast)
    whiteSpace: "nowrap",
    // Hover effects are trickier with pure inline, need JS for this.
    // For simplicity, we'll keep it simple or rely on `:hover` from global CSS if possible (but trying to avoid)
  };

  const navLinkResponsiveStyles = {
    fontSize: isMobileScreen ? "1rem" : "1.05rem",
    padding: isMobileScreen ? "0.8rem 0.5rem" : "0.5rem 0.75rem", // var(--spacing-sm) var(--spacing-xs)
    width: isMobileScreen ? "100%" : "auto",
    textAlign: "center",
    backgroundColor: isMobileScreen ? "rgba(255,255,255,0.05)" : "transparent",
    borderBottom: isMobileScreen ? "1px solid rgba(255,255,255,0.05)" : "none", // Subtle separator
  };

  const navLinkCombinedStyles = {
    ...navLinkBaseStyles,
    ...navLinkResponsiveStyles,
  };

  // Styles for Logout Button
  const navButtonBaseStyles = {
    ...navLinkCombinedStyles, // Inherit base link styles
    background: "#dc3545", // var(--danger-color)
    color: "white", // var(--text-light)
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    minWidth: "120px",
    boxShadow: "0 2px 4px rgba(220, 53, 69, 0.25)", // var(--shadow-sm)
    transition: "all 0.3s ease-in-out", // var(--transition-medium)
    marginLeft: isMobileScreen ? "0" : "1rem", // var(--spacing-sm) for desktop
    // Hover effect needs to be set with onMouseOver/onMouseOut or by CSS.
  };

  // Styles for Hamburger Icon
  const hamburgerMenuStyles = {
    display: isMobileScreen ? "block" : "none", // Show/hide based on screen size
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem", // var(--spacing-xs)
    position: "relative",
    zIndex: 1001,
  };

  const hamburgerLineStyles = {
    display: "block",
    width: "25px",
    height: "3px",
    backgroundColor: "#ecf0f1", // var(--navbar-text)
    margin: "5px 0",
    transition: "all 0.2s ease-out", // var(--transition-fast)
  };

  const getHamburgerLineTransform = (lineIndex) => {
    if (isMenuOpen) {
      if (lineIndex === 1)
        return { transform: "translateY(8px) rotate(45deg)" };
      if (lineIndex === 2) return { opacity: 0 };
      if (lineIndex === 3)
        return { transform: "translateY(-8px) rotate(-45deg)" };
    }
    return {}; // No transform when menu is closed
  };

  return (
    <nav style={navbarStyles}>
      <Link to="/" style={brandStyles}>
        Mini LinkedIn
      </Link>

      {/* Hamburger Icon for Mobile */}
      <button
        style={hamburgerMenuStyles}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span
          style={{ ...hamburgerLineStyles, ...getHamburgerLineTransform(1) }}
        ></span>
        <span
          style={{ ...hamburgerLineStyles, ...getHamburgerLineTransform(2) }}
        ></span>
        <span
          style={{ ...hamburgerLineStyles, ...getHamburgerLineTransform(3) }}
        ></span>
      </button>

      {/* Navigation links container */}
      <div style={linkContainerCombinedStyles}>
        {user ? (
          <>
            <Link
              to="/"
              style={navLinkCombinedStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={`/profile/${user._id}`}
              style={navLinkCombinedStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              style={{
                ...navButtonBaseStyles,
                ...(isMobileScreen
                  ? { marginBottom: "0", borderBottom: "none" }
                  : {}), // Last child specific style
                // Manual hover effects for button
                backgroundColor: "#dc3545",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#bb2d3b")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={navLinkCombinedStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={navLinkCombinedStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
