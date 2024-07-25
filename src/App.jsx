// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./components/SignUpForm";
import BlogPost from "./pages/BlogPost";
import "./styles/App.css";
import LoginForm from "./components/LoginForm";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { name } = useParams();

  return (
    <>
      {name === "home" ? (
        <Home />
      ) : name === "posts" ? (
        <BlogPost />
      ) : name === "sign-up" ? (
        <SignUpForm />
      ) : name === "login" ? (
        <LoginForm />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;
