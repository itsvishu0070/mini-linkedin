
import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
 
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      style={{
        border: "1px solid #e0e6eb",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#fefefe",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <Link
          to={`/profile/${post.user._id}`}
          style={{
            fontWeight: "bold",
            color: "#007bff",
            textDecoration: "none",
          }}
        >
          {post.user.name}
        </Link>
        <span style={{ fontSize: "0.85em", color: "#777", marginLeft: "10px" }}>
          @{post.user.email.split("@")[0]}
        </span>
        <span style={{ fontSize: "0.85em", color: "#999", float: "right" }}>
          {formatDate(post.createdAt)}
        </span>
      </div>
      <p style={{ margin: "0 0 10px", fontSize: "1.1em", lineHeight: "1.5" }}>
        {post.text}
      </p>
   
    </div>
  );
}

export default PostCard;
