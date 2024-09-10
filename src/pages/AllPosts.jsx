import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import BlogPostCard from "../components/BlogPostCard";
import "../styles/blogpost.css";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: black;
`;

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blogapi-production-c1ac.up.railway.app/blog/posts", {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(`Server Error ${response.status}`);
        }

        const json = response.json();

        return json;
      })
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const postsArray = posts.map((post, index) => {
    return <BlogPostCard thisPost={post} key={index} />;
  });

  if (loading) return <p>Loading...</p>;
  if (error && error.message === "Server Error 401")
    return (
      <>
        <p>You must Login to view page</p>

        <Link to="/login">Login</Link>
        <br />
        <Link to="/sign-up">Sign Up</Link>
        <br />
        <Link to="/home">Home</Link>
      </>
    );
  if (error)
    return (
      <>
        <p>A network error was encountered: {error.message}</p>
        <Link to="/home">Home</Link>
      </>
    );

  return (
    <div className="all-posts-page">
      <nav className="blog-nav">
        <NavLink to="/home" className="blog-navlink">
          Home
        </NavLink>
        <NavLink to="/about" className="navlink">
          About
        </NavLink>
      </nav>

      <StyledH1>Blog Posts</StyledH1>
      <div className="posts-container">{postsArray}</div>
    </div>
  );
}

export default AllPosts;
