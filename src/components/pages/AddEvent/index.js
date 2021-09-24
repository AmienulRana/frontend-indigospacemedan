import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import axios from "axios";
import "./addevent.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { getToken } from "../../../utils/storage";
export default function AddEvent() {
  const [event, setEvent] = useState({
    nama_event: "",
    jadwal_event: "",
    lokasi_event: "",
  });
  const [message, setMessage] = useState(null);
  const handleEvent = (e) => {
    e.preventDefault();
    return axios({
      method: "post",
      url: "https://api-indigospacemedan.herokuapp.com/event",
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      data: {
        nama_event: event.nama_event,
        jadwal_event: event.jadwal_event,
        lokasi_event: event.lokasi_event,
      },
    }).then((res) => {
      setMessage(res.data.message);
      setEvent({
        nama_event: "",
        jadwal_event: "",
        lokasi_event: "",
      });
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, [message]);
  return (
    <Layout arrowB={true} title="Tambah Event" dbutton="none" dbuttonS="none">
      <div className="WrapperInput">
        {message !== null ? <p className="success">{message}</p> : ""}
        <form onSubmit={handleEvent}>
          <input
            type="text"
            name="nama_event"
            value={event.nama_event}
            placeholder="Nama Event"
            required
            onChange={(e) => setEvent({ ...event, nama_event: e.target.value })}
          />
          <div className="HalfInput">
            <div>
              <FaCalendarAlt />
              <input
                type="text"
                nama="jadwal_event"
                placeholder="Jadwal Event"
                value={event.jadwal_event}
                required
                onChange={(e) =>
                  setEvent({ ...event, jadwal_event: e.target.value })
                }
              />
            </div>
            <div>
              <FaMapMarkerAlt />
              <input
                type="text"
                nama="lokasi_event"
                placeholder="Lokasi Event"
                required
                value={event.lokasi_event}
                onChange={(e) =>
                  setEvent({ ...event, lokasi_event: e.target.value })
                }
              />
            </div>
          </div>
          <button>Tambahkan Event</button>
        </form>
      </div>
    </Layout>
  );
}
