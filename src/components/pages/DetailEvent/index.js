import React, { useEffect, useState } from "react";
import { getApi } from "../../../utils/fetch";
import Layout from "../../Layout";
import { Link } from "react-router-dom";
import TableStartUp from "./Table/TableStartUp";
import TableInvestor from "./Table/TableInves";

import "./detail.css";
export default function DetailEvent(props) {
  const TableRender = props.match.path === "/detail/:id";
  const id = props.match.params.id;
  const [events, setEvents] = useState(false);
  useEffect(() => {
    getApi(`event/${id}`).then((res) => {
      if (res.error) {
        return (window.location.href = "/");
      }
      setEvents(res);
    });
  }, []);

  return (
    <Layout
      title={!events ? "" : events.event.nama_event}
      eventId={id}
      arrowB={true}
    >
      <div className="DetailEvent">
        <div className="d-flex AddStrInvs justify-content-between align-items-center">
          <div className="Tabs">
            <Link
              className={TableRender ? "active" : ""}
              to={!events ? `/` : `/detail/${events.event._id}`}
            >
              Start Up
            </Link>
            <Link
              className={!TableRender ? "active" : ""}
              to={!events ? `/` : `/detail/${events.event._id}/investor`}
            >
              Investor
            </Link>
          </div>
          {TableRender ? (
            <Link to={!events ? "/" : `/${events.event._id}/startup`}>
              <button style={{ width: 160 + "px" }}>Tambah StartUp</button>
            </Link>
          ) : (
            <Link to={!events ? "/" : `/${events.event._id}/investor`}>
              <button style={{ width: 160 + "px" }}>Tambah investor</button>
            </Link>
          )}
        </div>
        <div className="WrapperTable">
          {TableRender ? (
            <TableStartUp eventId={id} />
          ) : (
            <TableInvestor eventId={id} />
          )}
        </div>
      </div>
    </Layout>
  );
}
