import { Link } from "react-router-dom";
import LogOutBtn from "../components/LogoutBtn";
import { useState } from "react";

function Home({ isLoggedIn, setIsLoggedIn, checkIfLoggedIn }) {
  checkIfLoggedIn();

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("first name");
    localStorage.removeItem("user");
    checkIfLoggedIn();
  };

  return (
    <div>
      <h1>Welcome</h1>
      <p>I&apos;m super excited to have you here:</p>
      <Link to="/posts">Blog Posts</Link>
      <br />
      {!isLoggedIn ? (
        <>
          <Link to="/sign-up">Sign Up</Link> <br />
        </>
      ) : (
        ""
      )}
      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
        </>
      ) : (
        ""
      )}
      <hr />
      <div>{isLoggedIn ? <button onClick={logOut}>Logout</button> : ""}</div>
    </div>
  );
}

export default Home;
