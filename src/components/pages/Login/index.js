import React, { useState } from "react";
import { Container } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../../../assets/img/logoMerah.png";
import "./login.css";
import { setToken, setExpireTime } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
import serviceLogin from "../../../action/login";
export default function Login() {
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });
  const [messageError, setMessageError] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await serviceLogin(auth);
    if(!response.error){
      setToken(response.token);
      setExpireTime(259200);
      return history.push("/");
    }else{setMessageError(response.message);}
  };
  return (
    <Container>
      <div className="WrapperLogin">
        <div className="ParentForm">
          <img src={Logo} alt="logo indigo space" />
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setAuth({ ...auth, username: e.target.value })}
              />
              <FaUser />
            </div>
            <div className="input">
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setAuth({ ...auth, password: e.target.value })}
              />
              <FaLock />
            </div>
            {messageError !== "" ? (
              <p className="FalseAuth">{"*" + messageError}</p>
            ) : (
              ""
            )}

            <button type="submit" className="mt-15">
              Login
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
