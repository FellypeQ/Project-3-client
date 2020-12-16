import React from "react";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

function ModalMsg(props) {
  let history = useHistory();

  const handleClick = () => {
    props.close(false);
    history.push(props.infosModal.redirecionamento);
  };
  return (
    <Modal
      show={props.show}
      onHide={handleClick}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.infosModal.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.infosModal.conteudo}</Modal.Body>
      <Modal.Footer>
        <button variant="secondary" onClick={handleClick}>
          Ok!
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMsg;
