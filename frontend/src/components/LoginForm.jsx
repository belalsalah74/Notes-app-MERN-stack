import React from "react";
import { useState, useContext } from "react";
import Axios from "axios";
import { AppContext } from "../Context";
import { Navigate, useNavigate } from "react-router-dom";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { url, token } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(`${url}/users/login`, {
        userName,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setShowError(true);
    }
  }
  return (
    <>
      {token && <Navigate to="/" replace={true} />}
      <form method="post" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          className="form-control my-1"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="form-control my-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        {showError && (
          <p className="errors text-light mx-1 my-2 fw-bold">{errorMessage}</p>
        )}
        <button type="submit" className="btn btn-success mx-1 mt-3">
          Submit
        </button>
        <button type="reset" className="btn btn-secondary mt-3">
          Reset
        </button>
      </form>
    </>
  );
}

export default LoginForm;
