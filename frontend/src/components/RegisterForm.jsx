import { useContext, useState } from "react";
import { AppContext } from "../Context";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function RegisterForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { url } = useContext(AppContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handlePasswordConfirm(e) {
    setPasswordConfirm(e.target.value);
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await Axios.post(`${url}/users/register`, {
        userName,
        password,
        passwordConfirm,
      });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/");
    } catch (error) {
      console.log(error);

      // setErrorMessage(error.response.data.error);
      // setShowError(true);
    }
  }
  return (
    <form method="post" onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Username "
        className="form-control my-1"
        onChange={handleUserName}
      />
      <input
        type="text"
        placeholder="Password"
        className="form-control my-1"
        onChange={handlePassword}
      />
      <input
        type="text"
        placeholder="Confirm Password"
        className="form-control my-1"
        onChange={handlePasswordConfirm}
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
  );
}

export default RegisterForm;
