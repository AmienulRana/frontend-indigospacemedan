import React, { useEffect, useState, useRef } from "react";
import Layout from "../../Layout/";
import "./style.css";
import { Row, Col } from "reactstrap";
import Loading from "../../elements/Loading";
import { FaEllipsisV } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { deleteInvestor, detailInvestor } from '../../../action/investor';
export default function DetailStartUp(props) {
  const [investor, setInvestor] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const componentRef = useRef();
  let history = useHistory();
  const { id } = props.match.params;

  useEffect(async () => {
    const response = await detailInvestor(id);
    if(response && !response.error){
      setInvestor(response.investor);
    }else if(response.investor === null){
      return history.push("/");
    }
    setLoading(!true);
  }, []);

  const handleDelete = (id) => {
    deleteInvestor(id).then((res) => {
      history.push(`/detail/${investor._id_event}/investor`);
    });
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Layout arrowB={true} title="Detail Investor">
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
                    Nama Investor <span>:</span>
                  </p>
                  <p className="ml-20">{investor.nama_investor}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Daerah <span>:</span>
                  </p>
                  <p className="ml-20">{investor.daerah}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Sector Usaha <span>:</span>
                  </p>
                  <p className="ml-20">{investor.sector_usaha}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Perusahaan <span>:</span>
                  </p>
                  <p className="ml-20">{investor.perusahaan}</p>
                </div>
                <div className="d-flex detail">
                  <p className="width">
                    Keterangan <span>:</span>
                  </p>
                  <p className="ml-20">{investor.keterangan}</p>
                </div>
              </Col>
              <Col md="4">
                <div>
                  <img
                    src={investor.imgQrCode}
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
          <p>Nama: {investor.nama_investor}</p>
          <img src={investor.imgQrCode} className="ImgQrCode" alt="qr code" />
        </div>
      </div>
    </>
  );
}
