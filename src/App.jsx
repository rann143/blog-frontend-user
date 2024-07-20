// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { name } = useParams();

  return (
    <>
      <Home />
    </>
  );
}

export default App;
