
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import userService from "../api/userService";
import postService from "../api/postService";
import PostCard from "../components/Post/PostCard";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth(); 
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError("");
      try {
        const profileData = await userService.getUserProfile(userId);
        setProfile(profileData);

        const userPosts = await postService.getUserPosts(userId);
        setPosts(userPosts);
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load profile. User might not exist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  
  const formatJoinDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  const isCurrentUserProfile = currentUser && currentUser._id === userId;

  if (loading) {
    return (
      <div className="container card text-center py-md">Loading profile...</div>
    );
  }

  if (error) {
    return <div className="container error-message fade-in">{error}</div>;
  }

  if (!profile) {
    return (
      <div className="container error-message fade-in">Profile not found.</div>
    );
  }


  return (
    <div className="container card fade-in">
      <div className="profile-header mb-md">
        <div className="profile-info-basic">
          {" "}
         
          <h2>{profile.name}'s Profile</h2>
          <p className="profile-email">{profile.email}</p>
        </div>

        <div className="profile-details mt-md">
          <p className="profile-bio">
            <strong>Bio:</strong> {profile.bio || "No bio provided."}
          </p>
          <p className="profile-join-date">
            Joined on: {formatJoinDate(profile.createdAt)}
          </p>
          {isCurrentUserProfile && (
            <p className="current-user-tag mt-md">(This is your profile)</p>
            
          )}
        </div>
      </div>

      <h3>Posts by {profile.name}</h3>
      {posts.length === 0 ? (
        <p className="text-center text-secondary mt-md">
          No posts by this user yet.
        </p>
      ) : (
        <div className="posts-list mt-md">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
