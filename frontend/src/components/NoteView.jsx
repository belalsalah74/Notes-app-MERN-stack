import Axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { AppContext } from "../Context";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

function NoteView() {
  const { url, token } = useContext(AppContext);
  const location = useLocation();
  const note = location.state;

  const navigate = useNavigate();

  const [body, setBody] = useState(note.body);
  const [btnDisabled, setBtnDisabled] = useState(true);

  function handleBody(e) {
    e.target.value !== body && setBtnDisabled(false);
    setBody(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${url}/notes`,
        {
          body,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e) {
    try {
      const response = await Axios.delete(`${url}/notes/${note._id}`);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Link className="reset-link btn btn-back" to="/">
        <FontAwesomeIcon icon={faAnglesLeft} /> Back
      </Link>
      <form method="post" onSubmit={handleSubmit}>
        <textarea
          value={body}
          autoFocus
          className="form-control w-100 my-3  bg-transparent body-input"
          placeholder="What is on your mind"
          onChange={handleBody}
        ></textarea>
        <button
          className="btn btn-secondary mx-1"
          type="submit"
          disabled={btnDisabled}
        >
          submit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </>
  );
}

export default NoteView;
