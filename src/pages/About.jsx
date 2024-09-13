import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledH1 = styled.h1`
  color: black;
`;

function AboutPage() {
  return (
    <div className="about-page">
      <nav>
        <NavLink to="/home" style={{ padding: "0 0.3rem 0 0.3rem" }}>
          Home
        </NavLink>
        <NavLink to="/posts" style={{ padding: "0 0.3rem 0 0.3rem" }}>
          Blog
        </NavLink>
      </nav>
      <StyledH1>About</StyledH1>
      <div>
        <p>Welcome to my website! My name is Dan. Here&apos;s a quick intro:</p>
        <p>
          This blog is a small passion project of mine to keep and share
          AI-generated blog posts using entertaining and funny prompts I come up
          with.
        </p>
        <p>
          I&apos;m a web developer based out of Massachusetts. I previously
          worked in tech sales before committing to a career change in web
          development! I have experience in using the following tools:
        </p>
        <ul>
          <li>Javascript</li>
          <li>NodeJS</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>PostgreSQL</li>
          <li>SQL</li>
          <li>Mongoose</li>
          <li>Prisma</li>
          <li>HTML</li>
          <li>CSS</li>
        </ul>{" "}
      </div>
    </div>
  );
}

export default AboutPage;
