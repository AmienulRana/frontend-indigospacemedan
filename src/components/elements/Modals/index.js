import React from "react";
import Modal from "react-awesome-modal";
import { useHistory } from "react-router-dom";
export default function Modals({
  href,
  visible,
  setVisible,
  closeModal,
  openModal,
}) {
  const history = useHistory();
  return (
    <section>
      <Modal
        visible={visible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => closeModal()}
      >
        <div>
          <h1>Title</h1>
          <p>Some Contents</p>
          <a href="/" onClick={() => closeModal()}>
            Oke
          </a>
        </div>
      </Modal>
    </section>
  );
}
