import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../service/api';

function VerificacaoPagamento() {
  const { id, quantity, userName } = useParams()
  const accessToken = localStorage.getItem('accessToken')

  const [eventsData, setEventsData] = useState([])

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${accessToken}`,
  };
  const data = {
    username: userName,
    eventId: id,
    quantity
  };

  console.log(data)

  function comprar() {
    api.post('/api/ticket/v1', data, { headers })
      .then(response => {
        console.log(response)
      })
      .catch(e => console.log(e))

  }

  useEffect(() => {
    api.get('/api/event/v1/' + id, { headers })

      .then(response => {
        setEventsData(response.data)

      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  console.log(eventsData)
  return (
    <div>
      <Header />
      <div >
        <h1 className='text-center fs-2'>Revisão do pedido</h1>
      </div>
      <div className="container">
        <ul>
          <li>{eventsData.eventName}</li>
          <li>{eventsData.startDate} - {eventsData.startDateTime}</li>
          <li>{eventsData.locationName}</li>
          <li>Ingressos {eventsData.ticketTitle}: </li>
          <li>Valor do ingresso unitario: R$ {eventsData.tickePrice}</li>
          <li>Quantidade solicitada:{quantity}</li>
          <li>Valor total da compra: R$ {quantity * eventsData.tickePrice}</li>
        </ul>
        <button onClick={comprar} className='btn btn-success'>Confirmar pedido</button>
      </div>
      <Footer />
    </div>

  );
}

export default VerificacaoPagamento