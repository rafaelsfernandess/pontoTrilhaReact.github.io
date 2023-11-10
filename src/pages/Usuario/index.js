import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header/Header';

import Foto from "../../assets/pessoa.jfif"

function Usuario() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-12 col-lg-8 col-xl-8 col-xxl-6">
            <div className="col-12">
              <div className="img-usuario">
                <img src={Foto} alt="Foto do usuário" />
              </div>
            </div>
            <div className="col-12">
              <div className="informacoes-usuario">
                <div className="info">
                  <h2 className="nome-usuario" id="nome-usuario">
                    Rafael Silva Fernandes
                  </h2>
                  <p className="email-usuario" id="email-usuario">
                    rafael@rafael.com
                  </p>
                </div>
                <div className="botoes">
                  <Link className="btn btn-warning" to="/editar-conta">
                    <i className="fa fa-edit"></i> Editar conta
                  </Link>
                  <Link className="btn btn-light">Alterar Senha</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuario