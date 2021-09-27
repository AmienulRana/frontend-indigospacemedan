import React, { useState, useEffect } from "react";
import "./layout.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { deleteToken } from "../../utils/storage";
import Logo from "../../assets/img/logo.png";
import LogoMerah from "../../assets/img/logoMerah.png";
import { useHistory } from "react-router-dom";

function Layout(props) {
  const { arrowB = false, children, dbutton, eventId } = props;
  let { title } = props;
  const { pathname } = window.location;
  const isActive = pathname === "/";
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();
  let tempTitle = title.split("");
  if (window.innerWidth < 768) {
    if (title.length > 16) {
      tempTitle.splice(16, title.length - 16);
      title = tempTitle.join("") + "...";
    }
  }
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }, []);
  const showSidebar = () => setSidebar(!false);
  const hideSidebar = () => setSidebar(!true);
  const Logout = () => {
    deleteToken();
    history.push("/login");
  };

  return (
    <div className="Wrapper">
      <div className="Navbar align-items-center">
        {arrowB ? (
          <FaArrowLeft
            className="ArrowBack"
            style={{ display: arrowB ? "block" : "none" }}
            onClick={() => history.goBack()}
          />
        ) : (
          <div className="MenuToggle" onClick={showSidebar}>
            <span />
            <span />
          </div>
        )}
        <Link to="/">
          <img
            src={LogoMerah}
            alt="logo indigo merah"
            className={sidebar ? "ImgLogoMerah Hide" : "ImgLogoMerah"}
          />
        </Link>
      </div>
      <div className={sidebar ? "Sidebar Active" : "Sidebar"}>
        <div className="d-flex justify-content-between alig-items-center">
          <img src={Logo} alt="logo indigo putih" className="ImgLogo" />
          <FaTimes className="CloseButton" onClick={hideSidebar} />
        </div>
        <div className={isActive ? "Active" : ""}>
          <Link to="/">
            <h4>EVENT</h4>
          </Link>
        </div>
        <div className="WrapperLogout">
          <FaSignOutAlt className="Logout" onClick={Logout} />
        </div>
      </div>
      <div className="Content">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col xs={dbutton && "none" ? "8" : "8"} md="6" className="d-flex">
              <h2 className="Title">
                {" "}
                <FaArrowLeft
                  className="ArrowBack"
                  style={{ display: arrowB ? "block" : "none" }}
                  onClick={() => history.goBack()}
                />
                {title}
              </h2>
            </Col>
            <Col xs="4">
              <button
                className="CreateEvent"
                style={{ display: !isActive ? "none" : "block" }}
              >
                <Link to="/add-event">Buat Event</Link>
              </button>
              <button
                className="ScanEvent"
                style={{ display: !isActive ? "none" : "block" }}
              >
                <Link to={`/scan`}>Scan Qr Code</Link>
              </button>
            </Col>
          </Row>
          {children}
        </Container>
      </div>
    </div>
  );
}

export default Layout;
