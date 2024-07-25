import { Link } from "react-router-dom";

function Home() {
  const firstName = localStorage.getItem("first name");

  return (
    <div>
      <p>{firstName ? `Hi ${firstName}!` : ""}</p>
      <h1>Welcome</h1>
      <p>I&apos;m super excited to have you here:</p>
      <Link to="/posts">Blog Posts</Link>
      <br />
      <Link to="/sign-up">Sign Up</Link> <br />
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
