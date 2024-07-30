import { Link } from "react-router-dom";
import { useState } from "react";
import LogOutBtn from "./LogoutBtn";

function LoginForm({
  isLoggedIn,
  setIsLoggedIn,
  checkIfLoggedIn,
  setExpirationDate,
}) {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSubmit = {
      ...formData,
    };

    try {
      let res = await fetch(
        "https://blogapi-production-c1ac.up.railway.app/blog/login",
        {
          method: "POST",
          body: JSON.stringify(dataToSubmit),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resJson = await res.json();
      if (res.status === 200) {
        setFormData({});
        setMessage("Login Success");
        console.log(resJson);
        localStorage.removeItem("token");
        localStorage.removeItem("first name");
        localStorage.removeItem("expiration date");
        localStorage.setItem("token", resJson.token);
        localStorage.setItem("first name", resJson.user.first_name);
        localStorage.setItem("expiration date", new Date().getTime());
        setExpirationDate(localStorage.getItem("expiration date"));
      } else {
        setMessage(resJson.error || "Some error occured");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occured while submitting the form");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username-input">Username</label>
        <input
          type="text"
          name="username"
          id="username-input"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          name="password"
          id="password-input"
          onChange={handleInputChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>{message ? message : ""}</p>
      <Link to="/home">Return Home</Link>
    </div>
  );
}

export default LoginForm;
