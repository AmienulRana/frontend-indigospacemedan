import React from "react";
import question from "../../../assets/svg/question.svg";
import "./notFound.css";
export default function EventNotFound() {
  return (
    <div className="QuesitonSvg">
      <img src={question} alt="svg" className="ImgSvg" />
      <h4>Kamu Belum Mempunyai Event Apapun</h4>
    </div>
  );
}
