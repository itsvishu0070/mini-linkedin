
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.innerWidth <= 768
  );

  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

 
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobileScreen(newIsMobile);
      if (!newIsMobile && isMenuOpen) {
        
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 
  const navbarStyles = {
    background: "#2c3e50", 
    padding: isMobileScreen ? "1rem 1rem" : "15px 30px", 
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.25)", 
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    minHeight: "60px",
  };

  const brandStyles = {
    color: "#ffffff", 
    textDecoration: "none",
    fontFamily: "'Poppins', sans-serif", 
    fontSize: isMobileScreen ? "1.6rem" : "1.8rem",
    fontWeight: "700",
    transition: "color 0.2s ease-out", 
    flexShrink: 0,
  };

  
  const linkContainerBaseStyles = {
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease-in-out", 
    position: isMobileScreen ? "absolute" : "static",
    top: "100%",
    left: 0,
    width: isMobileScreen ? "100%" : "auto",
    background: isMobileScreen ? "#2c3e50" : "none", 
    flexDirection: isMobileScreen ? "column" : "row",
    boxShadow: isMobileScreen ? "0 5px 15px rgba(0,0,0,0.1)" : "none", 
    overflow: "hidden", 
    zIndex: 999, 
  };

  const linkContainerMobileOpenStyles = {
    maxHeight: isMenuOpen ? "300px" : "0",
    opacity: isMenuOpen ? "1" : "0",
    visibility: isMenuOpen ? "visible" : "hidden",
    padding: isMobileScreen && isMenuOpen ? "1rem 0" : "0", 
    borderBottomLeftRadius: isMobileScreen ? "8px" : "0", 
    borderBottomRightRadius: isMobileScreen ? "8px" : "0",
  };

  const linkContainerDesktopStyles = {
    gap: "1.5rem", 
  };

  const linkContainerCombinedStyles = {
    ...linkContainerBaseStyles,
    ...(isMobileScreen
      ? linkContainerMobileOpenStyles
      : linkContainerDesktopStyles),
  };


  const navLinkBaseStyles = {
    color: "#ecf0f1", 
    textDecoration: "none",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "all 0.2s ease-out", 
    whiteSpace: "nowrap",
   
  };

  const navLinkResponsiveStyles = {
    fontSize: isMobileScreen ? "1rem" : "1.05rem",
    padding: isMobileScreen ? "0.8rem 0.5rem" : "0.5rem 0.75rem", 
    width: isMobileScreen ? "100%" : "auto",
    textAlign: "center",
    backgroundColor: isMobileScreen ? "rgba(255,255,255,0.05)" : "transparent",
    borderBottom: isMobileScreen ? "1px solid rgba(255,255,255,0.05)" : "none", 
  };

  const navLinkCombinedStyles = {
    ...navLinkBaseStyles,
    ...navLinkResponsiveStyles,
  };

  
  const navButtonBaseStyles = {
    ...navLinkCombinedStyles, 
    background: "#dc3545", 
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    minWidth: "120px",
    boxShadow: "0 2px 4px rgba(220, 53, 69, 0.25)", 
    transition: "all 0.3s ease-in-out", 
    marginLeft: isMobileScreen ? "0" : "1rem", 
  };


  const hamburgerMenuStyles = {
    display: isMobileScreen ? "block" : "none", 
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem", 
    position: "relative",
    zIndex: 1001,
  };

  const hamburgerLineStyles = {
    display: "block",
    width: "25px",
    height: "3px",
    backgroundColor: "#ecf0f1", 
    margin: "5px 0",
    transition: "all 0.2s ease-out", 
  };

  const getHamburgerLineTransform = (lineIndex) => {
    if (isMenuOpen) {
      if (lineIndex === 1)
        return { transform: "translateY(8px) rotate(45deg)" };
      if (lineIndex === 2) return { opacity: 0 };
      if (lineIndex === 3)
        return { transform: "translateY(-8px) rotate(-45deg)" };
    }
    return {}; 
  };

  return (
    <nav style={navbarStyles}>
      <Link to="/" style={brandStyles}>
        Mini LinkedIn
      </Link>

     
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
                  : {}), 
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
