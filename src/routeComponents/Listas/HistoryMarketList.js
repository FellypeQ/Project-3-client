import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Card } from "react-bootstrap";
import { ReactComponent as CameraSvg } from "../../assets/camera-icon.svg";

import api from "../../apis/api";

import ModalScroll from "../../components/ModalScroll";
import ModalMsg from "../../components/ModalMsg";

function HistoryMarketList(props) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState({ modal: false, product: "" });
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE}/listas-criadas`
        );
        setLists([...response.data]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchLists();
  }, []);

  const handleClick = (event) => {
    setShow({ modal: true, product: event.currentTarget.name });
  };

  function handleCheck(event) {
    let tempLists = [...lists];
    tempLists[event.currentTarget.id.split(",")[0]].Lista[
      event.currentTarget.id.split(",")[1]
    ][`${event.currentTarget.id.split(",")[2]}`][
      event.currentTarget.id.split(",")[3]
    ].comprado = !tempLists[event.currentTarget.id.split(",")[0]].Lista[
      event.currentTarget.id.split(",")[1]
    ][`${event.currentTarget.id.split(",")[2]}`][
      event.currentTarget.id.split(",")[3]
    ].comprado;
    setLists(tempLists);
  }

  async function handleSaveItensPegos(event) {
    const listTodataBase = {
      IdUser: "",
      Lista: lists[event.currentTarget.name.split(",")[1]].Lista,
    };
    try {
      await api.patch(
        `${process.env.REACT_APP_API_BASE}/lista/${
          event.currentTarget.name.split(",")[0]
        }`,
        listTodataBase
      );
      setShowSave(true);
    } catch (err) {
      console.error(err);
    }
  }

  function renderAccordion() {
    if (loading === false) {
      return (
        <Accordion defaultActiveKey={`${lists.length - 1}`}>
          {lists
            .map((list, idx) => {
              return (
                <Card className="bghistory3" key={idx}>
                  <Card.Header className="bghistory2">
                    <Accordion.Toggle
                      className="linkcolor "
                      as={Button}
                      variant="link"
                      eventKey={`${idx}`}
                    >
                      Lista {`${idx + 1}`}
                    </Accordion.Toggle>
                    <Link to={`/menus/delete/${list._id}`}>
                      <button className="float-right mx-3 btn login  custom-btn">
                        Deletar Lista
                      </button>
                    </Link>
                    <Link to={`/menus/${list._id}`}>
                      <button className="float-right mx-3 btn login btn-warning ">
                        Editar Lista
                      </button>
                    </Link>
                    <button
                      onClick={handleSaveItensPegos}
                      className="float-right mx-3 btn login btn-dark"
                      name={[list._id, idx]}
                    >
                      Salvar itens pegos
                    </button>
                  </Card.Header>
                  <Accordion.Collapse eventKey={`${idx}`}>
                    <Card.Body className="bghistory1">
                      <ul className="p-0">
                        {list.Lista.map((categories, idxC) => (
                          <div
                            className="text-center my-3"
                            key={list._id + idxC}
                          >
                            <p className="font-weight-bold text-primary">
                              {Object.keys(categories)[0]}
                            </p>
                            <ul className="ListaDeProdutosPorCategoriaNasSalvas">
                              {Object.values(categories)[0].map(
                                (products, idxP) => (
                                  <li
                                    key={list._id + idxP}
                                    className="text-primary produtoNaListaSalva"
                                  >
                                    <div>
                                      <input
                                        type="checkbox"
                                        className="mr-3 checkboxCustom"
                                        onChange={handleCheck}
                                        id={[
                                          idx,
                                          idxC,
                                          Object.keys(categories)[0],
                                          idxP,
                                        ]}
                                        checked={
                                          products.comprado ? true : false
                                        }
                                      />
                                    </div>
                                    <div
                                      className={`nomeDetalheListaSalva ${
                                        products.comprado ? "line-through" : ""
                                      }`}
                                    >
                                      {products.produto}
                                      {` - ${products.detalhes}`}
                                    </div>
                                    <Link
                                      onClick={handleClick}
                                      name={products.produto}
                                      to="#0"
                                    >
                                      <CameraSvg className="svg-css mx-4" />
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ))}
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })
            .reverse()}
        </Accordion>
      );
    }
  }

  return (
    <div>
      {renderAccordion()}
      <ModalScroll
        infosModal={{
          titulo: "Imagens relacionadas ao produto",
          conteudo: show.product,
        }}
        show={show.modal}
        close={setShow}
      />
      <ModalMsg
        infosModal={{
          titulo: "Atualização de itens pegos",
          conteudo: "Alterações salvas",
        }}
        show={showSave}
        close={setShowSave}
      />
    </div>
  );
}

export default HistoryMarketList;
