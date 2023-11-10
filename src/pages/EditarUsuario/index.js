import React from 'react'

import './styles.css';

import Header from '../../components/Header/Header';

function EditarUsuario() {
  return (
    <div>
      <Header />
      <div className="container-lg">
        <div className="row pt-5">
          <div className="col-12 border-bottom pb-5">
            <h1 className="display-6">Minha Conta</h1>
          </div>
          <div className="col-12 col-lg-4">
            <div className="col-12 pt-3">
              <h2>Dados da conta</h2>
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input type="text" className="form-control" id="nome" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input type="password" className="form-control" id="senha" />
                </div>
                <div className="img-usuario">
                  <img src="../../assets/pessoa.jfif" alt="" />
                  <input type="file" className="d-none" id="foto" />
                  <label htmlFor="foto" className="btn btn-dark">Alterar imagem</label>
                </div>
              </form>
            </div>
          </div>

          <div className="col-12 col-lg-8 pt-3">
            <h2>Dados de Compra</h2>
            <form className="container-fluid">
              <div className="row">
                <div className="mb-3">
                  <label htmlFor="nome-cartao" className="form-label">Nome impresso no cartão</label>
                  <input type="text" className="form-control" id="nome-cartao" />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="cpf" className="form-label">CPF</label>
                  <input type="text" className="form-control" id="cpf" />
                </div>
                <div className="mb-3 col-6 col-md-3">
                  <label htmlFor="dt-nascimento" className="form-label">Data de nascimento</label>
                  <input type="date" className="form-control" id="dt-nascimento" />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="telefone" className="form-label">Telefone</label>
                  <input type="text" className="form-control" id="telefone" />
                </div>
                <div className="mb-3 col-6 col-md-3">
                  <label htmlFor="cep" className="form-label">CEP</label>
                  <input type="text" className="form-control" id="cep" />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="endereco" className="form-label">Endereço</label>
                  <input type="text" className="form-control" id="endereco" />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="bairro" className="form-label">Bairro</label>
                  <input type="text" className="form-control" id="bairro" />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="numero" className="form-label">Número</label>
                  <input type="text" className="form-control" id="numero" />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="complemento" className="form-label">Complemento</label>
                  <input type="text" className="form-control" id="complemento" />
                </div>
                <div className="mb-3 col-12 col-md-6">
                  <label htmlFor="cidade" className="form-label">Cidade</label>
                  <input type="text" className="form-control" id="cidade" />
                </div>
                <div className="mb-3 col-12">
                  <label htmlFor="estado" className="form-label">Estado</label>
                  <input type="text" className="form-control" id="estado" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarUsuario