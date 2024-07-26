import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

function BlogPost() {
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
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const firstName = localStorage.getItem("first name");

  const postsArray = posts.map((post) => {
    const key = uuidv4();
    const timestamp = DateTime.fromISO(post.timestamp).toLocaleString(
      DateTime.DATE_MED
    );
    const wordsArray = post.text.split(" ");
    const firstWords = wordsArray.slice(0, 3).join(" ");
    return (
      <div key={key}>
        <p>
          {timestamp}, {post.author.first_name} {post.author.last_name}
        </p>
        <h3>{post.title}</h3>
        <p>{firstWords}...</p>
      </div>
    );
  });

  console.log(error);

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
    <div>
      <h1>Blog Posts</h1>
      <div>{postsArray}</div>
      <Link to="/home">Home</Link>
    </div>
  );
}

export default BlogPost;
