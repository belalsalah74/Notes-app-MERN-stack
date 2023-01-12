import React from "react";
import { useState, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../Context";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function NoteForm(props) {
  const [showModal, setShowModal] = useState(false);
  const [body, setBody] = useState("");
  const { url, token } = useContext(AppContext);

  function handleBody(e) {
    setBody(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
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
    setShowModal(false);
    props.fetchNotes();
  }

  function handleModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }
  return (
    <>
      <button className="btn btn-add mb-3" onClick={handleModal}>
        <FontAwesomeIcon icon={faPlus} /> New
      </button>
      {showModal && (
        <Modal closeModal={closeModal}>
          <form method="post" onSubmit={handleSubmit}>
            <textarea
              className="form-control w-100 my-3  bg-transparent body-input"
              placeholder="What is on your mind"
              onChange={handleBody}
            ></textarea>
            <button type="submit" className="btn btn-secondary btn-small">
              Save
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default NoteForm;
