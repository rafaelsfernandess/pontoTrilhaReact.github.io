import React, { useEffect, useRef, useState } from 'react'
import { Form, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.css';

import Header from '../../components/Header/Header';
import { InputMask } from '@react-input/mask';
import { InputNumberFormat } from '@react-input/number-format';
import { apiCep } from '../../service/apiCep';
import { CSSProperties } from "react";
import Lottie from 'lottie-react';
import api from '../../service/api';

import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Footer from '../../components/Footer';
import Loading from '../../components/Loading'
function CadastroEvento() {

  const dataHoje = new Date()
  const dataHoje2 = dataHoje.toLocaleDateString()
  // LOCAL DO EVENTO
  const [locationName, setLocationName] = useState('Local B');
  const [zipCode, setZipCode] = useState('88809-020');
  const [number, setNumber] = useState('123');
  const [street, setStreet] = useState('Rua B');
  const [neighborhood, setNeighborhood] = useState('Bairro B');
  const [city, setCity] = useState('Cidade B');
  const [state, setState] = useState('Estado B');
  const [complement, setComplement] = useState('Complemento B');
  const [isLoading, setIsLoading] = useState(false)
  // // SOBRE EVENTO
  const [eventName, setEventName] = useState('Evento B');
  const [description, setDescription] = useState('Descrição do Evento B');

  // // DATA E HORÁRIO
  const [startDate, setStartDate] = useState(dataHoje2);
  const [horarioInicioEvento, setHorarioInicioEvento] = useState(null)

  const [endDate, setEndDate] = useState(dataHoje2);
  const [horarioTerminoEvento, setHorarioTerminoEvento] = useState()

  // INGRESSO 
  const [ticketTitle, setTicketTitle] = useState('Ingresso B');
  const [quantity, setQuantity] = useState(100);
  const [tickePrice, setTickePrice] = useState(50.0);
  // let tickePricebd = parseFloat(tickePrice.replace('R$ ', '').replace(',', '.'));
  // console.log(tickePricebd)
  const [startOfSales, setStartOfSales] = useState(dataHoje2);
  const [horaInicioVendas, setHoraInicioVendas] = useState(null)
  const [endOfSales, setEndOfSales] = useState(dataHoje2);
  const [horaTerminoVendas, setHoraTerminoVendas] = useState(null)

  // Quantidade permitida por compra
  const [minPurchaseQuantity, setMinPurchaseQuantity] = useState(1);
  const [maxPurchaseQuantity, setMaxPurchaseQuantity] = useState(1);

  // DIVULGAÇÃO
  const [map_description, setMap_description] = useState('TESTE MAPA');
  const [latitude, setLatitude] = useState('1');
  const [longitude, setLongitude] = useState('2');
  const [file, setfile] = useState(null)

  // RESPONSABILIDADES
  const [responsabilities, setResponsabilities] = useState('1')
  const [eventStatus, setEventStatus] = useState(1);
  const [tickePriceStripe, setTickePriceStripe] = useState('12');

  const inputRef = useRef()

  // TOKEM
  const accessToken = localStorage.getItem('accessToken')


  async function createEvent(e) {
    e.preventDefault()
    setIsLoading(true)

    const contatenaStartDate = startDate.split('/').reverse().join('/') //+ ' ' + horarioInicioEvento;
    const contatenaEndDate = endDate.split('/').reverse().join('/')//+ ' ' + horarioInicioEvento;
    const contatenaStartSales = startOfSales.split('/').reverse().join('/') //+ ' ' + horarioInicioEvento;
    const contatenaEndSales = startOfSales.split('/').reverse().join('/') //+ ' ' + horarioInicioEvento;

    const inicioEvento = new Date(contatenaStartDate).toISOString()
    const fimEvento = new Date(contatenaEndDate).toISOString()
    const inicioVendaIngresso = new Date(contatenaStartSales).toISOString()
    const fimVendaIngresso = new Date(contatenaEndSales).toISOString()

    const data = {
      locationName,
      street,
      neighborhood,
      number,
      city,
      state,
      zipCode,
      complement,
      eventName,
      description,
      startDate: contatenaStartDate,
      endDate: contatenaEndDate,
      ticketTitle,
      quantity: 1,
      tickePrice: 1,
      tickePriceStripe,
      startOfSales: contatenaStartSales,
      endOfSales: contatenaEndSales,
      minPurchaseQuantity: 1,
      maxPurchaseQuantity: 1,
      eventStatus: 1,
      map_description,
      latitude: '1',
      longitude: '1',
      file,
    }
    console.log(data)
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`,
      //'Seu-Outro-Header': 'ValorDoOutroHeader',
    };


    try {
      const response = await api.post('/api/event/v1', data, { headers })
      setIsLoading(false)
      console.log(response.data)
      alert('Evento Cadastrado com sucesso!')

    } catch (error) {
      setIsLoading(false)
      alert('Erro durante a gravação do evento, tente novamente: ' + error)
    }



  }

  const checkCep = async (e) => {
    e.preventDefault()

    const cep = e.target.value.replace(/\D/g, '')
    apiCep(cep).then(response => {

      setStreet(response.data.logradouro)
      setNeighborhood(response.data.bairro)
      setCity(response.data.localidade)
      setState(response.data.uf)
    }).catch(e => {
      console.log(e)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setfile(e.dataTransfer.files[0])

  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }



  const handleDataInicioChange = (event) => {
    const input = event.target.value;
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
    if (input === '' || regex.test(input)) {
       setStartDate(input);
    }
  };

  const handleDataFimChange = (event) => {
    const input = event.target.value;
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (input === '' || regex.test(input)) {
      setEndDate(input);
    }
  };

  const handleDataInicioVendas = (event) => {
    const input = event.target.value;
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (input === '' || regex.test(input)) {
      setStartOfSales(input);
    }
  };

  const handleDataFimVendas = (event) => {
    const input = event.target.value;
    const regex = /^(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (input === '' || regex.test(input)) {
      setEndOfSales(input);
    }
  };





  return (
    <div>
      {isLoading &&
        (<div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          width: '100%'
        }}>
          <Lottie animationData={Loading}
            style={{
              width: '20%'
            }}

          />
        </div>)
      }


      <Header />
      <div className='container'>
        <div className='row'>
          <div className="col-12 border-bottom pb-3 mt-5">
            <h1 className="display-6">Criar Evento</h1>
          </div>
          <div className="col-12 mt-5">
            <form className="row g-3 " onSubmit={createEvent}>

              <h2 className='fs-4 text '>Local do evento</h2>
              <div className="col-12 form-floating">
                <input type="text" className="form-control" value={locationName} id="nome-local" placeholder="Nome do local" onChange={(text) => setLocationName(text.target.value)} />
                <label htmlFor="nome-local" className="event-label">Nome do local</label>
              </div>
              <div className="form-floating col-6">
                <InputMask className="form-control" placeholder="CEP" value={zipCode} id="cep" mask="_____-___" replacement={{ _: /\d/ }} onBlur={checkCep} onChange={(text) => setZipCode(text.target.value)} />
                <label htmlFor="cep" className="event-label">CEP</label>
              </div>
              <div className="form-floating col-6">
                <input type="number" min='0' className="form-control" value={number} id="numero" placeholder="Nº" onChange={(text) => setNumber(text.target.value)} />
                <label htmlFor="numero" className="event-label">Numero</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={street} id="rua" placeholder="Rua, Avenida, Alameda..." onChange={(text) => setStreet(text.target.value)} />
                <label htmlFor="rua" className="event-label">Rua</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={neighborhood} id="bairro" placeholder="Bairro Exemplo" onChange={(text) => setNeighborhood(text.target.value)} />
                <label htmlFor="bairro" className="event-label">Bairro</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={city} id="cidade" placeholder="Cidade Exemplo" onChange={(text) => setCity(text.target.value)} />
                <label htmlFor="cidade" className="event-label">Cidade</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={state} id="estado" placeholder="Estado" onChange={(text) => setState(text.target.value)} />
                <label htmlFor="estado" className="event-label">Estado</label>
              </div>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={complement} id="complemento" placeholder="Complemento" onChange={(text) => setComplement(text.target.value)} />
                <label htmlFor="complemento" className="event-label">Complemento</label>
              </div>
              <h2 className='fs-4 text mt-5'>Sobre o evento</h2>
              <div className="form-floating col-12">
                <input type="text" className="form-control" value={eventName} id="nome" placeholder="Nome do evento" onChange={(text) => setEventName(text.target.value)} />
                <label htmlFor="nome" className="event-label">Nome do evento</label>
              </div>
              <div className="form-floating col-12">
                <textarea rows="5" type="text" className="form-control" value={description} id="descricao" placeholder="Descrição" onChange={(text) => setDescription(text.target.value)} />
                <label htmlFor="descricao" className="event-label">Descrição</label>
              </div>


              <h2 className='fs-4 text mt-5'>Data e horário</h2>
              <div className="form-floating col-6 col-md-3">
                <InputMask
                  mask="dd/mm/aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  value={startDate}
                  onChange={handleDataInicioChange}
                  className="form-control"
                  id="dia-inicio"
                  showMask  // Certifique-se de que showMask esteja presente para exibir a máscara
                  separate  // O separate ajuda a separar os campos de dia, mês e ano
                />
                <label htmlFor="dia-inicio" className="event-label">Dia de início</label>
              </div>
              <div className="form-floating col-6 col-md-3">

                <input type="time" className="form-control" value={horarioInicioEvento} id="dia-inicio" onChange={(text) => setHorarioInicioEvento(text.target.value)} />
                <label htmlFor="dia-inicio" className="event-label">Horário de inicio</label>
              </div>
              <span className='col-12'></span>
              <div className="form-floating col-6 col-md-3">
                <InputMask
                  mask="dd/mm/aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  value={endDate}
                  onChange={handleDataFimChange}
                  className="form-control"
                  id="dia-termino"
                  showMask  // Certifique-se de que showMask esteja presente para exibir a máscara
                  separate  // O separate ajuda a separar os campos de dia, mês e ano
                />
                {/* <input type="date" className="form-control" value={endDate} id="dia-termino" onChange={(text) => setEndDate(text.target.value)} /> */}
                <label htmlFor="dia-termino" className="event-label">Dia de Término</label>
              </div>
              <div className="form-floating col-6 col-md-3">
                <input type="time" className="form-control" value={horarioTerminoEvento} id="horario-termino" onChange={(text) => setHorarioTerminoEvento(text.target.value)} />
                <label htmlFor="horario-termino" className="event-label">Horário de término</label>
              </div>


              <h2 className='fs-4 text mt-5'>Ingresso</h2>
              <div className="form-floating col-12 col-md-6">
                <input type="text" className="form-control" value={ticketTitle} id="titulo-ingresso" placeholder="Titulo Ingresso" onChange={(text) => setTicketTitle(text.target.value)} />
                <label htmlFor="titulo-ingresso" className="event-label">Titulo ingresso</label>
              </div>
              <div className="form-floating col-12 col-md-3">
                <input type="number" min="1" className="form-control" value={quantity} id="quantidade" placeholder="Quantidade" onChange={(text) => setQuantity(text.target.value)} />
                <label htmlFor="quantidade" className="event-label">Qtd. ingressos</label>
              </div>
              <div className="form-floating col-12 col-md-3">
                <InputNumberFormat
                  className="form-control"
                  placeholder='R$'
                  value={tickePrice}
                  id='valor-ingresso'
                  locales="pt-BR"
                  format="currency"
                  currency="BRL"
                  onChange={(text) => setTickePrice(text.target.value)} // "123.456,78 €"
                />


                <label htmlFor="valor-ingresso" className="event-label">Valor do ingresso</label>
              </div>
              <div className="form-floating col-12 col-md-6">
                <InputMask
                  mask="dd/mm/aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  value={startOfSales}
                  onChange={handleDataInicioVendas}
                  className="form-control"
                  id="data-inicio-ingresso"
                  showMask  // Certifique-se de que showMask esteja presente para exibir a máscara
                  separate  // O separate ajuda a separar os campos de dia, mês e ano
                />
                {/* <input type="date" min="0" className="form-control" value={startOfSales} id="data-inicio-ingresso" placeholder="Data inicio de vendas" onChange={(text) => setStartOfSales(text.target.value)} /> */}
                <label htmlFor="data-inicio-ingresso" className="event-label">Data inicio de vendas</label>
              </div>
              <div className="form-floating col-12 col-md-6">
                <input type="time" min="0" className="form-control" value={horaInicioVendas} id="horario-inicio-ingresso" placeholder="Hora inicio de vendas<" onChange={(text) => setHoraInicioVendas(text.target.value)} />
                <label htmlFor="horario-inicio-ingresso" className="event-label">Hora inicio de vendas</label>
              </div>
              <div className="form-floating col-12 col-md-6">
                <InputMask
                  mask="dd/mm/aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  value={endOfSales}
                  onChange={handleDataFimVendas}
                  className="form-control"
                  id="data-termino-ingresso"
                  showMask  // Certifique-se de que showMask esteja presente para exibir a máscara
                  separate  // O separate ajuda a separar os campos de dia, mês e ano
                />
                {/* <input type="date" min="0" className="form-control" value={endOfSales} id="data-termino-ingresso" placeholder="Data término de vendas" onChange={(text) => setEndOfSales(text.target.value)} /> */}
                <label htmlFor="data-termino-ingresso" className="event-label">Data término de vendas</label>
              </div>
              <div className="form-floating col-12 col-md-6">
                <input type="time" min="0" className="form-control" value={horaTerminoVendas} id="horario-termino-ingresso" placeholder="Hora término de vendas" onChange={(text) => setHoraTerminoVendas(text.target.value)} />
                <label htmlFor="horario-termino-ingresso" className="event-label">Hora término de vendas</label>
              </div>

              <h3 className='fs-6 text mt-5'>Quantidade permitida por compra</h3>
              <div className="form-floating col-6">
                <input type="number" min="1" className="form-control" value={minPurchaseQuantity} id="quantidade-minima" placeholder="Quantidade" onChange={(text) => setMinPurchaseQuantity(text.target.value)} />
                <label htmlFor="quantidade-minima" className="event-label">Quantidade Mínima</label>
              </div>
              <div className="form-floating col-6">
                <input type="number" min="1" className="form-control" value={maxPurchaseQuantity} id="quantidade-maxima" placeholder="Quantidade" onChange={(text) => setMaxPurchaseQuantity(text.target.value)} />
                <label htmlFor="quantidade-maxima" className="event-label">Quantidade máxima</label>
              </div>



              <h2 className='fs-4 text mt-5'>Divulgação</h2>
              {!file && (
                <div className="col-12" onDragOver={handleDragOver} onDrop={handleDrop}>
                  <input type="file" id='arquivo' name='arquivo' onChange={(e) => setfile(e.target.files[0])} className='d-none' ref={inputRef} />
                  <label className="btn add-map" onClick={() => inputRef.current.click()}><p>Arraste ou clique para adicionar seu mapa</p></label>
                </div>
              )}
              {file && (
                <div>
                  <ul>
                    <li key={1}>{file.name}</li>
                  </ul>
                  <div>
                    <button className='btn btn-warning' onClick={() => setfile(null)}>Cancelar</button>
                  </div>
                </div>


              )}



              <div className="form-floating col-6">
                <InputMask
                  className="form-control"
                  placeholder="CEP"
                  value={latitude}
                  id="latitude"
                  mask="__.______"
                  replacement={{ _: /\d/ }}
                  onChange={(text) => setLatitude(text.target.value)} />
                <label htmlFor="latitude" className="event-label">Latitude</label>
              </div>

              <div className="form-floating col-6">
                <InputMask
                  className="form-control"
                  placeholder="CEP"
                  value={longitude}
                  id="longitude"
                  mask="__.______"
                  replacement={{ _: /\d/ }}
                  onChange={(text) => setLongitude(text.target.value)} />
                <label htmlFor="longitude" className="event-label">Longitude</label>
              </div>

              <h2 className='fs-4 text mt-5'>Responsabilidades</h2>
              <div className="form-check col-12">
                <input className="form-check-input" type="checkbox" value={responsabilities} id="defaultCheck1" />
                <p>
                  Ao publicar este evento, estou de acordo com os Termos de uso, com as Diretrizes de Comunidade
                </p>
              </div>

              <div className="col-12 mt-5 d-flex justify-content-end mb-5">
                <button className='btn btn-primary btn-lg'>Salvar Evento</button>
              </div>
              {/* <input type="file" onChange={handleInput} /> */}

            </form>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default CadastroEvento