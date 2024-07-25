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
          throw new Error("server error");
        }

        const json = response.json();

        return json;
      })
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(posts);

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

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <>
        <p>A network error was encountered</p>
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
