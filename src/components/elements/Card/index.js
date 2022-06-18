import React, { useState } from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaEllipsisV } from "react-icons/fa";
import { deleteEvent } from "../../../action/event";
export const handleDelete = async (id, setEvents) => {
  const response = await deleteEvent(id);
  if(response && !response.error){
    setEvents(response.events);
  }
  // deleteApi(`event/${id}`).then((res) => setEvents(res.events));
};

export default function Card({ nama, id, jadwal, lokasi, setEvents }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="Card" key={id}>
        <div className="Menu">
          <FaEllipsisV onClick={() => setOpen(!isOpen ? true : false)} />
          {isOpen && (
            <div className="Delete" onClick={() => handleDelete(id, setEvents)}>
              Hapus
            </div>
          )}
        </div>
        <Link to={`/detail/${id}`} className="LinkDetail">
          <div className="NamaEvent">
            <p>{nama}</p>
          </div>
          <div className="LocationEvent">
            <div className="Date">
              <div className="WrapperIcon">
                <FaCalendarAlt />
              </div>
              <span>{jadwal}</span>
            </div>
            <div className="Location justify-content-end">
              <div className="d-flex align-items-center">
                <div className="WrapperIcon">
                  <FaMapMarkerAlt />
                </div>
                <span>{lokasi}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
