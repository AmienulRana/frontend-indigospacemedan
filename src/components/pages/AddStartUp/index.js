import React, { useState, useEffect } from "react";
import "./style.css";
import Layout from "../../Layout";
import { addApi } from "../../../utils/fetch";
export default function AddStartUp(props) {
  const { eventId } = props.match.params;
  const [startup, setStartup] = useState({
    nama_startup: "",
    founder: "",
    bidang: "",
    lokasi: "",
  });
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addApi(`${eventId}/startup`, {
      nama_startup: startup.nama_startup,
      founder: startup.founder,
      bidang: startup.bidang,
      lokasi: startup.lokasi,
    }).then((res) => {
      if (!res.error) {
        setMessage(res.message);
        setStartup({
          nama_startup: "",
          founder: "",
          bidang: "",
          lokasi: "",
        });
        return false;
      }
    });
  };
  useEffect(() => {
    setTimeout(() => setMessage(""), 3000);
  }, [message]);

  return (
    <Layout
      arrowB={true}
      title="Tambah start up"
      dbutton="none"
      dbuttonS="none"
    >
      <div className="WrapperAddEvent">
        <form onSubmit={handleSubmit} method="post">
          <p className="message">{message}</p>
          <div className="inputAddEvent">
            <label htmlFor="namaStartup">Nama Start Up</label>
            <input
              type="text"
              name="nama_startup"
              required
              value={startup.nama_startup}
              onChange={(e) =>
                setStartup({ ...startup, nama_startup: e.target.value })
              }
              placeholder="nama start up"
            />
          </div>
          <div className="inputAddEvent">
            <label htmlFor="founder">Founder</label>
            <input
              type="text"
              name="founder"
              required
              value={startup.founder}
              placeholder="Founder"
              onChange={(e) =>
                setStartup({ ...startup, founder: e.target.value })
              }
            />
          </div>
          <div className="inputAddEvent">
            <label htmlFor="bidang">Bidang Start Up</label>
            <input
              type="text"
              name="bidang"
              required
              value={startup.bidang}
              onChange={(e) =>
                setStartup({ ...startup, bidang: e.target.value })
              }
              placeholder="bidang start up"
            />
          </div>
          <div className="inputAddEvent">
            <label htmlFor="lokasi">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              required
              value={startup.lokasi}
              onChange={(e) =>
                setStartup({ ...startup, lokasi: e.target.value })
              }
              placeholder="lokasi startup"
            />
          </div>
          <button type="submit">Tambah Start up</button>
        </form>
      </div>
    </Layout>
  );
}
