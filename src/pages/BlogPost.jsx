import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentModalForm from "../components/CommentModalForm";

function BlogPost({ postId }) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(
      `https://blogapi-production-c1ac.up.railway.app/blog/posts/${postId}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(`Server Error ${response.status}`);
        }

        const json = response.json();

        return json;
      })
      .then((json) => {
        setPost(json);
        setComments(json.comments);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
  };

  const commentsArray = [...comments];

  const commentsDisplay = commentsArray.map((comment, index) => {
    return (
      <p key={index}>
        {comment.text} - <strong>{comment.author.username}</strong>
      </p>
    );
  });

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <>
        <p>A network error was encountered: {error.message}</p>
        <Link to="/home">Home</Link>
      </>
    );

  if (modalOpen)
    return <CommentModalForm postId={postId} setModalOpen={setModalOpen} />;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <button type="button" onClick={openModal} style={{ margin: "10px" }}>
        Post Comment
      </button>
      <div>
        {" "}
        <strong>Comments:</strong> {commentsDisplay}
      </div>
      <Link to="/posts">Back</Link>
    </div>
  );
}

export default BlogPost;
