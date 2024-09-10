// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./components/SignUpForm";
import AllPosts from "./pages/AllPosts";
import "./styles/App.css";
import LoginForm from "./components/LoginForm";
import BlogPostCard from "./components/BlogPostCard";
import BlogPost from "./pages/BlogPost";
import AboutPage from "./pages/About";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { name, postId } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [expirationDate, setExpirationDate] = useState(
    localStorage.getItem("expiration date")
  );
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const checkIfLoggedIn = () => {
    if (!token && isLoggedIn === true) {
      setIsLoggedIn(false);
    } else if (token && isLoggedIn === false) {
      setIsLoggedIn(true);
    }
  };

  const logOutIfAfterExpiration = () => {
    const now = new Date().getTime();

    if (expirationDate && now - expirationDate > 1 * 1000 * 60 * 60 * 24) {
      localStorage.removeItem("token");
      localStorage.removeItem("first name");
      localStorage.removeItem("expiration date");
    }

    return;
  };

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("first name");
    localStorage.removeItem("user");
    checkIfLoggedIn();
    navigate("/home");
  };

  logOutIfAfterExpiration();

  checkIfLoggedIn();

  return (
    <>
      {name === "posts" && postId ? (
        <BlogPost postId={postId} />
      ) : name === "home" || !name ? (
        <Home
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          checkIfLoggedIn={checkIfLoggedIn}
        />
      ) : name === "posts" ? (
        <AllPosts />
      ) : name === "sign-up" ? (
        <SignUpForm />
      ) : name === "login" ? (
        <LoginForm
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          checkIfLoggedIn={checkIfLoggedIn}
          setExpirationDate={setExpirationDate}
        />
      ) : name === "logout" ? (
        <div>
          <h2>Are you sure you would like to sign out?</h2>
          <Link to="/home">Home</Link>
          {isLoggedIn ? <button onClick={logOut}>Logout</button> : ""}
        </div>
      ) : name === "about" ? (
        <AboutPage />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
