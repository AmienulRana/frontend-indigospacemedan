import React, { useEffect, useState, useCallback } from "react";
import { getApi } from "../../../utils/fetch";
import Layout from "../../Layout/";
import "./style.css";
import { Row, Col } from "reactstrap";
import Loading from "../../elements/Loading";
import { FaEllipsisV } from "react-icons/fa";
import { deleteApi } from "../../../utils/fetch";
import { useHistory } from "react-router-dom";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';

export default function DetailStartUp(props) {
  const [startup, setStartup] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  let history = useHistory();
  const { id } = props.match.params;
  useEffect(() => {
    getApi(`startup/${id}`).then((res) => {
      if (res.error) {
        return history.push("/");
      } else if (res.startup === null) {
        return history.push("/");
      }
      setStartup(res.startup);
      setLoading(!true);
    });
  }, []);
  const handleDelete = (id) => {
    deleteApi(`startup/${id}`).then((res) => {
      history.push(`/detail/${startup._id_event}`);
    });
  };

  const downloadQrCode = useCallback(async () => {
    const qrcode = document.querySelector('.ImgQrCode');    
    const canvas = await html2canvas(qrcode);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, `startup_${startup.nama_startup}`, 'image/png');
  }, [startup]);

  return (
    <>
      <Layout arrowB={true} title="Detail StartUp">
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
                    id="ImgQrCode"
                    alt="qr code"
                  />
                </div>
                <button onClick={downloadQrCode}>Print Qr Code</button>
              </Col>
            </Row>
          )}
        </div>
      </Layout>
    </>
  );
}
