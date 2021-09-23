import React, { useState } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import { FaUser, FaLock } from "react-icons/fa";
import Logo from "../../../assets/img/logoMerah.png";
import "./login.css";
import { setToken, setExpireTime } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
export default function Login() {
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });
  const [messageError, setMessageError] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    return axios({
      method: "post",
      url: "https://api-indigospacemedan.herokuapp.com/login",
      data: {
        username: auth.username,
        password: auth.password,
      },
    })
      .then((res) => {
        if (res.data.error) {
          return setMessageError(res.data.message);
        }
        setToken(res.data.token);
        setExpireTime(259200);
        history.push("/");
      })
      .catch((err) => console.log(err));
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

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </Container>
  );
}
