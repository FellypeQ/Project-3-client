import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";
import { Container } from "react-bootstrap";

import ModalMsg from "../../components/ModalMsg";

function Signup(props) {
  const [state, setState] = useState({ name: "", password: "", email: "" });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [show, setShow] = useState(false);
  const [msgSgnup, setMsgSignup] = useState(
    <div class="d-flex justify-content-around">
      Por favor aguarde{" "}
      <div class="spinner-border text-success " role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
  const [pswMsg, setPswMsg] = useState("");

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setShow(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await api.post("/signup", state);
      setErrors({ name: "", password: "", email: "" });
      setMsgSignup("Usuário criado com sucesso");
      props.history.push("/auth/login");
    } catch (err) {
      setShow(false);
      console.error(err);
      setPswMsg(err.response.data.errors.password);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <Container>
      <div className="">
        <form className="mt-2 container   w-50 midpage" onSubmit={handleSubmit}>
          <h1 className="text-center  px-4 ">Registrar-se!</h1>

          <div className="text-center form-group">
            <input
              className="form-control login inputcolor text-center"
              placeholder="Name "
              type="text"
              name="name"
              id="signupFormName"
              value={state.name}
              error={errors.name}
              onChange={handleChange}
            />
          </div>

          <div className="text-center form-group">
            <input
              placeholder="E-maill"
              className="form-control login inputcolor text-center"
              type="email"
              name="email"
              id="signupFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
            />
          </div>

          <div className="text-center form-group">
            <input
              placeholder="Password"
              className="form-control login inputcolor text-center"
              type="password"
              name="password"
              id="signupFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
            />
          </div>
          {pswMsg.length > 0 ? (
            <div className="bghistory3 bg-warning text-center pt-2 mb-4">
              <p>{pswMsg}</p>
            </div>
          ) : (
            <></>
          )}

          <div className="text-center form-group ">
            <button className="btn btn-dark login  " type="submit">
              Registrar-se!
            </button>
          </div>
          <div className="text-center form-group mb-5">
            <Link className="btn btn-dark login " to="/auth/login">
              Já tem uma conta? Clique aqui para conectar-se.
            </Link>
          </div>
          <div className=" mb-4">.</div>
        </form>
      </div>
      <ModalMsg
        infosModal={{
          titulo: "Criação de usuário",
          conteudo: msgSgnup,
          //redirecionamento: "/auth/login",
          login: true,
        }}
        show={show}
        close={setShow}
      />
    </Container>
  );
}

export default Signup;
