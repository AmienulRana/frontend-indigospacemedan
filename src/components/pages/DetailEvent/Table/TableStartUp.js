import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./table.css";
import { getApi } from "../../../../utils/fetch";
import Loading from "../../../elements/Loading";
export default function TableStartUp(props) {
  const { eventId } = props;
  const [startups, setStartups] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getApi(`${eventId}/startup`).then((res) => {
      setStartups(res.startup);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className="HeaderTable">
        <p>no</p>
        <p>Nama StartUp</p>
        <p>Keterangan</p>
        <p>Action</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        startups.map((startup, id) => {
          return (
            <div className="DataTable" key={id}>
              <p>{id + 1}</p>
              <p>{startup.nama_startup}</p>
              <p>{startup.keterangan}</p>
              <p>
                <Link to={`/startup/${startup._id}`}>
                  <button>Detail</button>
                </Link>
              </p>
            </div>
          );
        })
      )}
    </>
  );
}
