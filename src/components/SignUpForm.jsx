import { Link } from "react-router-dom";
import { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first-name-input">First Name</label>
        <input
          type="text"
          name="first_name"
          id="first-name-input"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="last-name-input">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="last-name-input"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email-input">Email</label>
        <input
          type="email"
          name="email"
          id="email-input"
          onChange={handleInputChange}
          required
        />

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

        <label htmlFor="confirm_password-input">Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password-input"
          onChange={handleInputChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      <p>{message ? message : ""}</p>
      <Link to="/home">Return Home</Link>
    </div>
  );
}

export default SignUpForm;
