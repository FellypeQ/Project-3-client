/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import api from "../../apis/api";

import ModalMsg from "../ModalMsg";

function SelectItens(props) {
  const [listaDND, setListaDND] = useState([
    { Despensa: [] },
    { Freezer: [] },
    { Geladeira: [] },
    { "Frutas e Hortaliças": [] },
    { Higiene: [] },
  ]);
  const [newList, setNewList] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setNewList(props.newList);
  }, [props.newList]);
  //função que retorna um objeto com a categoria e o produto selecionado
  function getCategory(product, list, categorySelected) {
    for (let i = 0; i < Object.keys(list).length; i++) {
      if (Object.values(list)[i].indexOf(product) >= 0)
        return { categoria: Object.keys(list)[i], produto: product };
    }
    return { categoria: categorySelected, produto: product };
  }
  //atualiza o state caso seja uma edição de lista
  useEffect(() => {
    setListaDND(props.edicaoList);
  }, [props.edicaoList]);
  //useeffect que atualiza os states dependendo de qual categoria é retornada na função acima
  useEffect(() => {
    let stateTemp = [...listaDND];
    for (let i = 0; i < stateTemp.length; i++) {
      for (let key in stateTemp[i]) {
        if (
          props.atual.length > 0 &&
          key ===
            getCategory(props.atual, props.original, props.newCategory)
              .categoria
        ) {
          stateTemp[i][key].push({
            produto: getCategory(props.atual, props.original, props.newCategory)
              .produto,
            detalhes: "",
            comprado: false,
          });
        }
      }
    }
    setListaDND(stateTemp);
  }, [props.atual]);
  //altera a quantidade e detalhes no state
  function handleChange(event) {
    let handleTemp = [...listaDND];
    for (let i = 0; i < handleTemp.length; i++) {
      for (let key in handleTemp[i]) {
        if (key === event.currentTarget.id) {
          for (let ii = 0; ii < handleTemp[i][key].length; ii++) {
            if (handleTemp[i][key][ii].produto === event.currentTarget.name) {
              handleTemp[i][key][ii].detalhes = event.currentTarget.value;
            }
          }
        }
      }
    }
    setListaDND(handleTemp);
  }
  //funções responsáveis por aparecer e esconder o modal
  const handleShow = () => setShow(true);

  //salva a lista no banco de dados com o id do usuário
  async function handleNew(event) {
    const listTodataBase = {
      IdUser: "",
      Lista: listaDND,
    };
    try {
      await api.post(`${process.env.REACT_APP_API_BASE}/lista`, listTodataBase);
      handleShow();
    } catch (err) {
      console.error(err);
    }
  }
  //salva a lista no banco de dados com o id do usuário
  async function handleEdit(event) {
    const listTodataBase = {
      IdUser: "",
      Lista: listaDND,
    };
    try {
      await api.patch(
        `${process.env.REACT_APP_API_BASE}/lista/${props.idLista}`,
        listTodataBase
      );
      handleShow();
    } catch (err) {
      console.error(err);
    }
  }

  function handleDelete(event) {
    let tempList = [...listaDND];
    tempList[event.currentTarget.id.split(",")[0]][
      `${event.currentTarget.name}`
    ].splice(event.currentTarget.id.split(",")[1], 1);
    setListaDND(tempList);
  }
  //o return está com ternário porque no return não aceita if, mas eles olham de o state está prrenchido, e caso esteja rederiza uma tabela com o conteudo do seu respectivo state
  return (
    <React.Fragment>
      <ul className="bghistory3 bghistory2 ulCustom">
        {listaDND.map((element, idxA) =>
          Object.values(element)[0].length > 0 ? (
            <div className="categoriesCustom">
              {Object.values(element).toString().length > 0 ? (
                <h3 className="mb-3">{Object.keys(element)}</h3>
              ) : (
                <></>
              )}

              {Object.values(element)[0].length > 0 ? (
                Object.values(element)[0].map((product, idx) => (
                  <li className="mb-2 d-flex  productCustom" key={idx}>
                    <div>{product.produto}</div>
                    <input
                      type="text"
                      placeholder="Quantidade e Detalhes"
                      onChange={handleChange}
                      value={product.detalhes}
                      name={product.produto}
                      id={Object.keys(element)}
                      className="mx-3 inputbar"
                    />
                    <button
                      onClick={handleDelete}
                      id={[idxA, idx]}
                      name={Object.keys(element)}
                      className="custom-btn"
                    >
                      Exluir
                    </button>
                  </li>
                ))
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )
        )}
      </ul>
      <div className="d-flex justify-content-center ">
        {newList ? (
          <button className="btn btn-lg btn-dark m-3 login" onClick={handleNew}>
            Criar Lista
          </button>
        ) : (
          <button
            className="btn btn-lg btn-dark m-3 login"
            onClick={handleEdit}
          >
            Alterar Lista
          </button>
        )}
      </div>
      {show ? (
        <ModalMsg infosModal={props.infosModal} show={show} close={setShow} />
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default SelectItens;
