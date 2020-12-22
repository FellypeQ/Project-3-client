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
      onHide={props.infosModal.login ? false : handleClick}
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
        {props.infosModal.login ? (
          <></>
        ) : (
          <button
            variant="secondary"
            onClick={handleClick}
            className="btn btn-lg btn-dark m-3 login"
          >
            Ok!
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalMsg;
