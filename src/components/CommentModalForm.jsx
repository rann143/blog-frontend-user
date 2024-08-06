import { useState, useEffect } from "react";

function CommentModalForm({ postId, setModalOpen }) {
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
        `https://blogapi-production-c1ac.up.railway.app/blog/posts/${postId}/write-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add this header
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(dataToSubmit),
          mode: "cors",
        }
      );
      const resJson = await res.json();
      if (res.status === 200) {
        setFormData({});
        setMessage("Success! Comment Posted");
        setModalOpen(false);
      } else {
        setMessage(resJson.error || "Some error occured");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occured while submitting the form: " + err.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={closeModal}>X</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-text-input">New Comment:</label>
        <textarea
          name="text"
          id="comment-text-input"
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default CommentModalForm;
