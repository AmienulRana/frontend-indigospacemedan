import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApi } from "../../../../utils/fetch";
import Loading from "../../../elements/Loading";
export default function TableInvestor(props) {
  const { eventId } = props;
  const [inves, setInves] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getApi(`${eventId}/investor`).then((res) => {
      setInves(res.investor);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className="HeaderTable">
        <p>no</p>
        <p>Nama Investor</p>
        <p>Keterangan</p>
        <p>Action</p>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        inves.map((investor, id) => {
          return (
            <div className="DataTable" key={id}>
              <p>{id + 1}</p>
              <p>{investor.nama_investor}</p>
              <p>{investor.keterangan}</p>
              <p>
                <Link to={`/investor/${investor._id}`}>
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
