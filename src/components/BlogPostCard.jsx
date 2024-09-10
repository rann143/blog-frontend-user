import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/blogpost.css";

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  border: solid black 1px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

function BlogPostCard({ thisPost }) {
  const post = { ...thisPost };
  const timestamp = DateTime.fromISO(post.timestamp).toLocaleString(
    DateTime.DATE_MED
  );
  return (
    <Card>
      <div>
        <h3 style={{ textAlign: "center" }}>
          <Link to={"/posts/" + post._id} style={{ textDecoration: "none" }}>
            {post.title}
          </Link>
        </h3>
      </div>
      <p>{timestamp}</p>
      <p>
        {post.author.first_name} {post.author.last_name}
      </p>
    </Card>
  );
}

export default BlogPostCard;
