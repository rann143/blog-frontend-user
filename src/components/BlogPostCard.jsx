import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  border: solid black 1px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.300)
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 20px;
  padding: 10px;
`;

function BlogPostCard({ thisPost }) {
  const post = { ...thisPost };
  const timestamp = DateTime.fromISO(post.timestamp).toLocaleString(
    DateTime.DATE_MED
  );
  const wordsArray = post.text.split(" ");
  const firstWords = wordsArray.slice(0, 3).join(" ") + "...";
  return (
    <Card>
      <p>
        {timestamp}, {post.author.first_name} {post.author.last_name}
      </p>
      <div>
        <h3>
          <Link to={"/posts/" + post._id}>{post.title}</Link>
        </h3>
        <p>{firstWords}</p>
      </div>
    </Card>
  );
}

export default BlogPostCard;
