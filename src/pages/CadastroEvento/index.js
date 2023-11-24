import React, { useEffect, useState } from 'react'
import { Form, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

import Header from '../../components/Header/Header';
import { InputMask } from '@react-input/mask';
import { InputNumberFormat } from '@react-input/number-format';
import { apiCep } from '../../service/apiCep';
import { CSSProperties } from "react";

import { faPlus } from '@fortawesome/free-solid-svg-icons'


import Footer from '../../components/Footer';

function CadastroEvento() {
  const [nomeDoLocal, setNomeDoLocal] = useState('')
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')
  const [complemento, setComplemento] = useState('')
  const [nomeDoEvento, setNomeDoEvento] = useState('')
  const [descricao, setDescricao] = useState('')
  const [diaInicio, setDiaInicio] = useState('')
  const [horarioInicio, setHorarioInicio] = useState('')
  const [diaTermino, setDiaTermino] = useState('')
  const [horarioTermino, setHorarioTermino] = useState('')
  const [valorIngresso, setValorIngresso] = useState('')


  const handleCadastroEvento = (e) => {
    e.preventDefault()
  }

  const checkCep = async (e) => {

    const cep = e.target.value.replace(/\D/g, '')
    apiCep(cep).then(response => {

      setRua(response.data.logradouro)
      setBairro(response.data.bairro)
      setCidade(response.data.localidade)
      setEstado(response.data.uf)
    }).catch(e => {


      console.log(e)
    })
  }




  return (
    <div>
      <Header />

      <div className='container'>
        <div className='row'>
          <div className="col-12 border-bottom pb-3 mt-5">
            <h1 className="display-6">Criar Evento</h1>
          </div>
          <div className="col-12 mt-5">
            <form className="row g-3 ">

              <h2 className='fs-4 text '>Local do evento</h2>
              <div className="col-12 form-floating">
                <input type="text" className="form-control" id="nome-local" placeholder="Nome do local" onChange={(text) => setNomeDoLocal(text.target.value)} />
                <label htmlFor="nome-local" className="event-label">Nome do local</label>
              </div>
              <div className="form-floating col-6">
                <InputMask className="form-control" placeholder="CEP" id="cep" mask="_____-___" replacement={{ _: /\d/ }} onBlur={checkCep} />
                <label htmlFor="cep" className="event-label">CEP</label>
              </div>
              <div className="form-floating col-6">
                <input type="number" className="form-control" value={numero} id="numero" placeholder="Nº" onChange={(text) => setNumero(text.target.value)} />
                <label htmlFor="numero" className="event-label">Numero</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={rua} id="rua" placeholder="Rua, Avenida, Alameda..." onChange={(text) => setRua(text.target.value)} />
                <label htmlFor="rua" className="event-label">Rua</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={bairro} id="bairro" placeholder="Bairro Exemplo" onChange={(text) => setBairro(text.target.value)} />
                <label htmlFor="bairro" className="event-label">Bairro</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={cidade} id="cidade" placeholder="Cidade Exemplo" onChange={(text) => setCidade(text.target.value)} />
                <label htmlFor="cidade" className="event-label">Cidade</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={estado} id="estado" placeholder="Estado" onChange={(text) => setEstado(text.target.value)} />
                <label htmlFor="estado" className="event-label">Estado</label>
              </div>

              <div className="form-floating col-12">
                <input type="text" className="form-control" value={complemento} id="complemento" placeholder="Complemento" onChange={(text) => setComplemento(text.target.value)} />
                <label htmlFor="complemento" className="event-label">Complemento</label>
              </div>

              <h2 className='fs-4 text mt-5'>Sobre o evento</h2>
              <div className="form-floating col-12">
                <input type="text" className="form-control" id="nome" placeholder="Nome do evento" onChange={(text) => setNomeDoEvento(text.target.value)} />
                <label htmlFor="nome" className="event-label">Nome do evento</label>
              </div>
              <div className="form-floating col-12">
                <textarea rows="5" type="text" className="form-control" id="descricao" placeholder="Descrição" onChange={(text) => setDescricao(text.target.value)} />
                <label htmlFor="descricao" className="event-label">Descrição</label>
              </div>

              <h2 className='fs-4 text mt-5'>Data e horário</h2>
              <div className="col-6 col-md-3">
                <label htmlFor="dia-inicio" className="col-form-label">Dia de início</label>
                <input type="date" className="form-control" id="dia-inicio" onChange={(text) => setDiaInicio(text.target.value)} />
              </div>
              <div className="col-6 col-md-3">
                <label htmlFor="dia-inicio" className="col-form-label">Horário de inicio</label>
                <input type="time" className="form-control" id="dia-inicio" onChange={(text) => setHorarioInicio(text.target.value)} />

              </div>
              <span className='col-12'></span>
              <div className="col-6 col-md-3">
                <label htmlFor="dia-termino" className="col-form-label">Dia de Término</label>
                <input type="date" className="form-control" id="dia-termino" onChange={(text) => setDiaTermino(text.target.value)} />
              </div>
              <div className="col-6 col-md-3">
                <label htmlFor="horario-termino" className="col-form-label">Horário de término</label>
                <input type="time" className="form-control" id="horario-termino" onChange={(text) => setHorarioTermino(text.target.value)} />
              </div>

              <h2 className='fs-4 text mt-5'>Ingresso</h2>
              <div className="form-floating col-6">
                <InputNumberFormat
                  className="form-control"
                  placeholder='R$'
                  id='valor-ingresso'
                  locales="pt-BR"
                  format="currency"
                  currency="BRL"
                  onChange={(text) => setValorIngresso(text.target.value)} // "123.456,78 €"
                />
                <label htmlFor="valor-ingresso" className="event-label">Valor do ingresso</label>
              </div>

              <h2 className='fs-4 text mt-5'>Divulgação</h2>


              <div className="col-12">
                <input type="file" id='arquivo' name='arquivo' className='d-none' />
                <label htmlFor="arquivo" className="btn add-map"><FontAwesomeIcon icon={faPlus} className='map-ico'/></label>
              </div>

              <div className="form-floating col-6">
                <InputMask
                  className="form-control"
                  placeholder="CEP"
                  id="latitude"
                  mask="__.______"
                  replacement={{ _: /\d/ }}
                  onBlur={checkCep} />
                <label htmlFor="latitude" className="event-label">Latitude</label>
              </div>

              <div className="form-floating col-6">
                <InputMask
                  className="form-control"
                  placeholder="CEP"
                  id="longitude"
                  mask="__.______"
                  replacement={{ _: /\d/ }}
                  onBlur={checkCep} />
                <label htmlFor="longitude" className="event-label">Longitude</label>
              </div>

              <div className="col-12 mt-5 d-flex justify-content-end">
                <button className='btn btn-primary btn-lg'>Salvar Evento</button>
              </div>


            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default CadastroEvento