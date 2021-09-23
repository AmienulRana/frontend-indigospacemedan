import React, { useState, useEffect } from "react";
import "./style.css";
import Layout from "../../Layout";
import { addApi } from "../../../utils/fetch";
export default function AddInves(props) {
  const { eventId } = props.match.params;
  const [investor, setInvestor] = useState({
    nama_investor: "",
    daerah: "",
    sector_usaha: "",
    perusahaan: "",
  });
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addApi(`${eventId}/investor`, {
      nama_investor: investor.nama_investor,
      daerah: investor.daerah,
      sector_usaha: investor.sector_usaha,
      perusahaan: investor.perusahaan,
    }).then((res) => {
      if (!res.error) {
        setMessage(res.message);
        setInvestor({
          nama_investor: "",
          daerah: "",
          sector_usaha: "",
          perusahaan: "",
        });
        return false;
      }
    });
  };
  useEffect(() => {
    setTimeout(() => setMessage(""), 3000);
  }, [message]);

  return (
    <Layout title="Tambah Investor" dbutton="none" dbuttonS="none">
      <div className="WrapperAddEvent">
        <form onSubmit={handleSubmit} method="post">
          <p className="message">{message}</p>
          <div className="inputAddEvent">
            <label htmlFor="investor">Nama Investor</label>
            <input
              type="text"
              name="nama_investor"
              required
              value={investor.nama_investor}
              onChange={(e) =>
                setInvestor({ ...investor, nama_investor: e.target.value })
              }
              placeholder="nama start up"
            />
          </div>
          <div className="inputAddEvent">
            <label htmlFor="daerah">Daerah</label>
            <input
              type="text"
              name="daerah"
              required
              value={investor.daerah}
              placeholder="Daerah"
              onChange={(e) =>
                setInvestor({ ...investor, daerah: e.target.value })
              }
            />
          </div>
          <div className="inputAddEvent">
            <label htmlFor="secto usaha">Sector Usaha</label>
            <input
              type="text"
              name="sector usaha"
              required
              value={investor.sector_usaha}
              onChange={(e) =>
                setInvestor({ ...investor, sector_usaha: e.target.value })
              }
              placeholder="Sector Usaha"
            />
          </div>
          <div className="inputAddEvent">
            <label htmlFor="perusahaan">perusahaan</label>
            <input
              type="text"
              name="perusahaan"
              required
              value={investor.perusahaan}
              onChange={(e) =>
                setInvestor({ ...investor, perusahaan: e.target.value })
              }
              placeholder="Perusahaan"
            />
          </div>
          <button type="submit">Tambah Investor</button>
        </form>
      </div>
    </Layout>
  );
}
