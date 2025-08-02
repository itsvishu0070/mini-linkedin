
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container" style={{ textAlign: "center", padding: "50px" }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
