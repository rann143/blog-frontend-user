import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/App.css";

function SignUpForm() {
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
        "https://blogapi-production-c1ac.up.railway.app/blog/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add this header
          },
          body: JSON.stringify(dataToSubmit),
          mode: "cors",
        }
      );
      const resJson = await res.json();
      if (res.status === 200) {
        setFormData({});
        setMessage("Success! Return Home to Login");
      } else {
        setMessage(resJson.error || "Some error occured");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occured while submitting the form");
    }
  };

  return (
    <div className="form-page">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className="form-display">
        <div className="form-input">
          <label htmlFor="first-name-input">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first-name-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="last-name-input">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last-name-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="email-input">Email</label>
          <input
            type="email"
            name="email"
            id="email-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="username-input">Username</label>
          <input
            type="text"
            name="username"
            id="username-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="password-input">Password</label>
          <input
            type="password"
            name="password"
            id="password-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-input">
          <label htmlFor="confirm_password-input">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password-input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <p>{message ? message : ""}</p>
      <Link to="/home">Return Home</Link>
    </div>
  );
}

export default SignUpForm;
