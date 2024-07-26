import { Link } from "react-router-dom";
import LogOutBtn from "../components/LogoutBtn";

function Home({ isToken, setIsToken }) {
  console.log(isToken);
  return (
    <div>
      <h1>Welcome</h1>
      <p>I&apos;m super excited to have you here:</p>
      <Link to="/posts">Blog Posts</Link>
      <br />
      {!isToken ? (
        <>
          <Link to="/sign-up">Sign Up</Link> <br />
        </>
      ) : (
        ""
      )}
      {!isToken ? (
        <>
          <Link to="/login">Login</Link>
        </>
      ) : (
        ""
      )}
      <hr />
      <div>{isToken ? <LogOutBtn setIsToken={setIsToken} /> : ""}</div>
    </div>
  );
}

export default Home;
