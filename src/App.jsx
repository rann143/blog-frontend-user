// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./components/SignUpForm";
import BlogPost from "./pages/BlogPost";
import "./styles/App.css";
import LoginForm from "./components/LoginForm";
import LogOutBtn from "./components/LogoutBtn";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { name } = useParams();
  const [isToken, setIsToken] = useState(false);

  const token = localStorage.getItem("token");

  const firstName = localStorage.getItem("first name");

  return (
    <>
      <p>{firstName ? `Hi ${firstName}!` : ""}</p>

      {name === "home" ? (
        <Home token={token} />
      ) : name === "posts" ? (
        <BlogPost />
      ) : name === "sign-up" ? (
        <SignUpForm />
      ) : name === "login" ? (
        <LoginForm token={token} />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
