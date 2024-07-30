// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./components/SignUpForm";
import AllPosts from "./pages/AllPosts";
import "./styles/App.css";
import LoginForm from "./components/LoginForm";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { name } = useParams();

  const token = localStorage.getItem("token");

  const firstName = localStorage.getItem("first name");

  return (
    <>
      <p>{firstName ? `Hi ${firstName}!` : ""}</p>

      {name === "home" ? (
        <Home token={token} />
      ) : name === "posts" ? (
        <AllPosts />
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
