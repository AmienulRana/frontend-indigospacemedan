import React, { useEffect, useState, useRef } from "react";
import { getApi } from "../../../utils/fetch";
import Layout from "../../Layout/";
import "./style.css";
import { Row, Col } from "reactstrap";
import Loading from "../../elements/Loading";
import { FaEllipsisV } from "react-icons/fa";
import { deleteApi } from "../../../utils/fetch";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function DetailStartUp(props) {
  const [startup, setStartup] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const componentRef = useRef();
  let history = useHistory();
  const { id } = props.match.params;
  useEffect(() => {
    getApi(`startup/${id}`).then((res) => {
      setStartup(res.startup);
      setLoading(!true);
    });
  }, []);
  const handleDelete = (id) => {
    deleteApi(`startup/${id}`).then((res) => {
      history.push(`/detail/${startup._id_event}`);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Layout title="Detail StartUp" dbutton="none" dbuttonS="none">
        <div className="WrapperDetailStartup">
          {isLoading ? (
            <Loading />
          ) : (
            <Row>
              <Col md="7" xs="11">
                <div className="DeleteUser">
                  <FaEllipsisV
                    onClick={() => setOpen(!isOpen ? true : false)}
                  />
                  {isOpen && (
                    <div className="Delete" onClick={() => handleDelete(id)}>
                      Hapus
                    </div>
                  )}
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Nama Startup <span>:</span>
                  </p>
                  <p className="ml-20">{startup.nama_startup}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Nama Founder <span>:</span>
                  </p>
                  <p className="ml-20">{startup.founder}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Bidang Startup <span>:</span>
                  </p>
                  <p className="ml-20">{startup.bidang}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Lokasi <span>:</span>
                  </p>
                  <p className="ml-20">{startup.lokasi}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Keterangan <span>:</span>
                  </p>
                  <p className="ml-20">{startup.keterangan}</p>
                </div>
              </Col>
              <Col md="4">
                <div>
                  <img
                    src={startup.imgQrCode}
                    className="ImgQrCode"
                    alt="qr code"
                  />
                </div>
                <button onClick={handlePrint}>Print Qr Code</button>
              </Col>
            </Row>
          )}
        </div>
      </Layout>
      <div className="WrapperPrintQr" ref={componentRef}>
        <div>
          <p>Nama: {startup.nama_startup}</p>
          <img src={startup.imgQrCode} className="ImgQrCode" alt="qr code" />
        </div>
      </div>
    </>
  );
}
