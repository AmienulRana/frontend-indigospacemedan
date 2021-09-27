import React, { useState, useEffect } from "react";
import Card from "../../elements/Card";
import { Row, Col } from "reactstrap";
import Layout from "../../Layout";
import { getApi } from "../../../utils/fetch";
import EventNotFound from "./eventNotFound";
import Loading from "../../elements/Loading";
import "./home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getApi("event")
      .then(async (res) => {
        await setEvents(res.events);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout title="Daftar Event">
      <Row
        className={[
          "WrapperCard",
          events.length > 2 ? "justify-content-between" : "",
        ].join(" ")}
      >
        {isLoading ? (
          <Loading />
        ) : events.length < 1 ? (
          <EventNotFound />
        ) : (
          events.map((event, id) => {
            return (
              <Col
                xs="12"
                md="4"
                xl="3"
                className="ColCard"
                key={id}
                style={{ marginLeft: events.length < 3 ? "15px" : "0" }}
              >
                <Card
                  id={event._id}
                  nama={event.nama_event}
                  jadwal={event.jadwal_event}
                  lokasi={event.lokasi_event}
                  setEvents={setEvents}
                />
              </Col>
            );
          })
        )}
      </Row>
    </Layout>
  );
}
// {
//   /*getToken={getToken}*/
// }
//
// {
//   /*axios={axios}*/
// }
