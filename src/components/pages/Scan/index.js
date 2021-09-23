import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getToken } from "../../../utils/storage";
import Layout from "../../Layout";
import QrReader from "react-qr-reader";
import scanEffect from "../../../assets/audio/soundScanner.mp3";
import "./style.css";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default function Scan(props) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [playing, toggle] = useAudio(scanEffect);
  const { eventId } = props.match.params;
  const handleScan = (result) => {
    if (result !== null) {
      toggle();
      axios({
        method: "post",
        url: "https://api-indigospacemedan.herokuapp.com/scann/" + eventId,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        data: {
          _id: result,
        },
      }).then((res) => {
        if (res.data.error) {
          setError(true);
          setMessage(res.data.message);
        } else {
          setMessage(res.data.message);
          setError(false);
        }
      });
    }
  };
  const handleError = (err) => {
    console.log(err);
  };
  return (
    <Layout title="Scan Qr Code" dbutton="none" dbuttonS="none">
      <div className="wrapperPreview">
        <div className="Scanner">
          <QrReader
            delay={1500}
            onScan={handleScan}
            onError={handleError}
            style={{ width: 300 + "px" }}
            onLoad={{ mirrorVideo: false }}
            resolusi={700}
          />
        </div>
        {error ? (
          <div className="MessageError">
            <FaTimesCircle />
            <p>{message}</p>
          </div>
        ) : (
          ""
        )}

        {!error ? (
          <div className="Message">
            {error === false ? <FaCheckCircle /> : ""}
            <p>{message}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}
