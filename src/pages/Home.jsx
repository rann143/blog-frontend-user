import { Link, NavLink } from "react-router-dom";
import "../styles/home.css";
import background from "../assets/alicharmant-oObLAZvXSPM-unsplash.jpg";
import LogOutBtn from "../components/LogoutBtn";
import { useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  width: 100%;
`;

const StyledH1 = styled.h1`
  color: black;
`;

function Home({ isLoggedIn, setIsLoggedIn, checkIfLoggedIn }) {
  checkIfLoggedIn();

  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("first name");
    localStorage.removeItem("user");
    checkIfLoggedIn();
  };

  const firstName = localStorage.getItem("first name");

  return (
    <div className="home-page">
      <Nav>
        <div className="link-container">
          <NavLink to="/home" className="navlink">
            Home
          </NavLink>
          <NavLink to="/about" className="navlink">
            About
          </NavLink>
          <NavLink to="/posts" className="navlink">
            Blog
          </NavLink>
        </div>

        <div className="link-container">
          {!isLoggedIn ? (
            <>
              <NavLink to="/sign-up" className="navlink">
                Sign Up
              </NavLink>{" "}
              <br />
            </>
          ) : (
            ""
          )}
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="navlink">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/logout" className="navlink">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </Nav>

      <div className="home-container">
        <div className="home-content">
          <p>{firstName ? `Hi ${firstName}!` : ""}</p>
          <StyledH1 style={{ width: "100%" }}>Welcome to my World!</StyledH1>
          <p className="quote-p">
            <q>
              Two things are infinite: the universe and human stupidity; and
              I&apos;m not sure about the universe.
            </q>
            <br />
            <span>- Albert Einstein</span>
          </p>
        </div>
      </div>
      <footer>
        <div className="photo-credit">
          Photo by{" "}
          <a href="https://unsplash.com/@alicharmant?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            alicharmant
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/a-person-standing-on-top-of-a-mountain-oObLAZvXSPM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
            Unsplash
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
