// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import postService from "../api/postService";
import PostCard from "../components/Post/PostCard"; // Assuming PostCard is here. Will style this next if needed.

function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [submittingPost, setSubmittingPost] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoadingPosts(true);
    setError("");
    try {
      const data = await postService.getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmittingPost(true);

    if (!newPostText.trim()) {
      setError("Post cannot be empty.");
      setSubmittingPost(false);
      return;
    }

    try {
      const createdPost = await postService.createPost({ text: newPostText });
      setPosts([createdPost, ...posts]); // Add new post to top of list
      setNewPostText(""); // Clear input
      setError(""); // Clear error
    } catch (err) {
      console.error("Failed to create post:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setSubmittingPost(false);
    }
  };

  return (
    <div className="container fade-in">
      <h2>Community Feed</h2>

      {user && (
        <div className="post-create-card card mb-md">
          {" "}
          {/* New classes for card styling */}
          <h3>Create New Post</h3>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleNewPostSubmit}>
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What's on your mind?"
              rows="4"
              maxLength="500"
              required
              className="text-input" /* Added class for textarea */
            ></textarea>
            <button
              type="submit"
              disabled={submittingPost}
              className="btn-primary"
            >
              {submittingPost ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      )}

      <h3>Recent Posts</h3>
      {loadingPosts ? (
        <p className="text-center">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-secondary">
          No posts yet. Be the first to post!
        </p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
