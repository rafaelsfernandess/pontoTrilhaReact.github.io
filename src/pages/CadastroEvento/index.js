import React from 'react'
import { Form, Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header/Header';
import { InputMask } from '@react-input/mask';

function CadastroEvento() {

  const handleCadastroEvento = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <Header />
      <div className='container'>
        <div className='row'>
          <div className="col-12">
            <h1 className="text-center mt-5">Criar evento</h1>
          </div>
          <div className="col-12 mt-5">
            <form class="row g-3">

              <h2 className='fs-4 text'>Local do evento</h2>
              <div class="col-12">
                <label for="nome-local" class="col-form-label">Nome do local</label>
                <input type="text" class="form-control" id="nome-local" placeholder="Ex.: Fazenda das Flores" />
              </div>
              <div class="col-6">
                <label for="cep" class="col-form-label">CEP</label>
                <InputMask class="form-control" placeholder="CEP" mask="_____-___" replacement={{ _: /\d/ }} />
              </div>
              <div class="col-6">
                <label for="numero" class="col-form-label">Numero</label>
                <input type="number" class="form-control" id="numero" placeholder="Nº" />
              </div>
              <div class="col-12">
                <label for="rua" class="col-form-label">Rua</label>
                <input type="text" class="form-control" id="rua" placeholder="Rua, Avenida, Alameda..." />
              </div>
              <div class="col-12">
                <label for="bairro" class="col-form-label">Bairro</label>
                <input type="text" class="form-control" id="bairro" placeholder="Bairro Exemplo" />
              </div>
              <div class="col-12">
                <label for="cidade" class="col-form-label">Cidade</label>
                <input type="text" class="form-control" id="cidade" placeholder="Cidade Exemplo" />
              </div>
              <div class="col-12">
                <label for="estado" class="col-form-label">Estado</label>
                <input type="text" class="form-control" id="estado" placeholder="Estado" />
              </div>
              
              <div class="col-12">
                <label for="COMPLEMENTO" class="col-form-label">Complemento</label>
                <input type="text" class="form-control" id="COMPLEMENTO" placeholder="Complemento" />
              </div>

              <h2 className='fs-4 text mt-5'>Sobre o evento</h2>
              <div class="col-12">
                <label for="nome" class="col-form-label">Nome do evento</label>
                <input type="text" class="form-control" id="nome" placeholder="Nome do evento" />
              </div>
              <div class="col-12">
                <label for="descricao" class="col-form-label">Descrição</label>
                <textarea rows="5" type="text" class="form-control" id="descricao" placeholder="Descrição" />
              </div>

              <h2 className='fs-4 text mt-5'>Data e horário</h2>
              <div class="col-6">
                <label for="dia-inicio" class="col-form-label">Dia de início</label>
                <input type="date" class="form-control" id="dia-inicio" />
              </div>
              <div class="col-6">
                <label for="dia-inicio" class="col-form-label">Horário de inicio</label>
                <input type="time" class="form-control" id="dia-inicio" />
              </div>
              <div class="col-6">
                <label for="dia-termino" class="col-form-label">Dia de Término</label>
                <input type="date" class="form-control" id="dia-termino" />
              </div>
              <div class="col-6">
                <label for="horario-termino" class="col-form-label">Horário de término</label>
                <input type="time" class="form-control" id="horario-termino" />
              </div>

              <h2 className='fs-4 text mt-5'>Ingresso</h2>
              <div class="col-6">
                <label for="valor-ingresso" class="col-form-label">Valor do ingresso</label>
                <input type="text" class="form-control" id="valor-ingresso" placeholder="R$" />
              </div>
              
              <h2 className='fs-4 text mt-5'>Divulgação</h2>
              <div class="col-12">
                <label for="mapa" class="col-form-label">Mapa</label>
                <select class="form-select" aria-label="Selecione o mapa">
                  <option selected>Selecione o mapa</option>
                  <option value="1">Mapa 1</option>
                </select>
              </div>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEvento