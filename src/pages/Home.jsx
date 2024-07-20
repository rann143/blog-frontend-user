import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <p>I&apos;m super excited to have you here:</p>
      <Link to="/posts">Blog Posts</Link>
    </>
  );
}

export default Home;
