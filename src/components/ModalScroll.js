import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
//previewURL
function ModalScroll(props) {
  const handleClick = () => {
    props.close({ modal: false, product: "" });
  };
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${
            process.env.REACT_APP_PIXABAY_TOKEN
          }&q=${props.infosModal.conteudo
            .toLowerCase()
            .replaceAll(" ", "+")}&image_type=photo`
        );
        response.data.hits.length > 0
          ? setImages(response.data.hits.map((e) => e.previewURL))
          : setImages(["Imagem não encontrada"]);

        //console.log(props.infosModal.conteudo.toLowerCase().replaceAll(" ", "+"));
      } catch (err) {
        console.error(err);
      }
    }
    fetchImages();
  }, [props.infosModal.conteudo]);

  return (
    <Modal
      show={props.show}
      onHide={handleClick}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.infosModal.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {images.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={props.infosModal.conteudo + " " + idx}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <button
          variant="secondary"
          onClick={handleClick}
          className="btn btn-lg btn-dark m-3 login"
        >
          Ok!
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalScroll;
