import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import axios from "axios";
import "./addevent.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { getToken } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
import { addEvent } from '../../../action/event';
export default function AddEvent() {
  const [event, setEvent] = useState({
    nama_event: "",
    jadwal_event: "",
    lokasi_event: "",
  });
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const handleEvent = async (e) => {
    e.preventDefault();
    const today = new Date();
    const jEvent = event.jadwal_event.split("-")[0];
    const yyyy = today.getFullYear();
    if (parseInt(jEvent) < yyyy) {
      return console.log("tidak bisa menambahkan event");
    } else {
      const response = await addEvent(event);
      if(response && !response.error){
        history.push('/')
      }
    }
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
                type="date"
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
          <button className="mt-15">Tambahkan Event</button>
        </form>
      </div>
    </Layout>
  );
}
