import React, { useState, useEffect } from "react";
import "./style.css";
import Layout from "../../Layout";
import { useHistory } from "react-router-dom";
import { addStartup } from "../../../action/startup";

export default function AddStartUp(props) {
  const { eventId } = props.match.params;
  const [startup, setStartup] = useState({
    nama_startup: "",
    founder: "",
    bidang: "",
    lokasi: "",
  });
  const [message, setMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addStartup(eventId, startup);
    if(response && !response.error){
      history.goBack()
    }
  };
  useEffect(() => {
    setTimeout(() => setMessage(""), 3000);
  }, [message]);

  return (
    <Layout arrowB={true} title="Tambah start up">
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
          <button type="submit" className="mt-15">
            Tambah Start up
          </button>
        </form>
      </div>
    </Layout>
  );
}
