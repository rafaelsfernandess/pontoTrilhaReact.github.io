import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../service/api'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import exemplo from '../../assets/banner.jpg'
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import GpxParser from 'gpxparser';
import { faCalendarDays, faCalendarCheck, faCalendarXmark } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import './styles.css';
import JSZip from 'jszip'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Evento() {

  const { id } = useParams()
  const [eventsData, setEventsData] = useState({})
  const [hourStartEvent, setHourStartEvent] = useState('')
  const [hourEndEvent, setHourEndEvent] = useState('')
  const [hourStartSale, setHourStartSale] = useState('')
  const [hourEndSale, setHourEndSale] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startOfSales, setStartOfSales] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endOfSales, setEndOfSales] = useState('')
  const [locationName, setLocationName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');
  const [idFile, setIdFile] = useState('');
  const [positions, setPositions] = useState([])
  const [elevacao, setElevacao] = useState([])
  const [distancia, setDistancia] = useState([])
  const [center, setCenter] = useState([])
  const [quantity, setQuantity] = useState(0)


  // TOKEM
  const accessToken = localStorage.getItem('accessToken')
  const userName = localStorage.getItem('username')


  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  useEffect(() => {
    api.get('/api/event/v1/' + id, { headers })

      .then(response => {
        setEventsData(response.data)

        let dia = response.data.startDate.split('T')
        dia = dia[0].split('-').reverse().join('/')

        setStartDate(response.data.startDate.split('-').reverse().join('/'))
        setStartOfSales(response.data.startOfSales.split('-').reverse().join('/'))
        setEndDate(response.data.endDate.split('-').reverse().join('/'))
        setEndOfSales(response.data.endOfSales.split('-').reverse().join('/'))

        setHourStartEvent(response.data.startDateTime)
        setHourEndEvent(response.data.endDateTime)
        setHourStartSale(response.data.startOfSalesTime)
        setHourEndSale(response.data.endOfSalesTime)
        setLocationName(response.data.locationName)
        setZipCode(response.data.zipCode)
        setNumber(response.data.number)
        setStreet(response.data.street)
        setNeighborhood(response.data.neighborhood)
        setCity(response.data.city)
        setState(response.data.state)
        setComplement(response.data.complement)
        setIdFile(response.data.map.idGoogle)

        // Coloque a lógica do segundo useEffect aqui
        api.get('/api/files/v1/content/' + response.data.map.idGoogle, { headers, responseType: 'text' })
          .then((fileResponse) => {
            const valueSplit = fileResponse.data.split('<?xml version="1.0" encoding="UTF-8"?>')
            var gpx = new GpxParser()
            gpx.parse(valueSplit[1])
            setPositions(gpx.tracks[0].points)
            // console.log(gpx.tracks[0].points.map((p) => [p.lat, p.lon]))

            const lat = gpx.tracks[0].points[0].lat
            const lon = gpx.tracks[0].points[0].lon
            setCenter([lat, lon])

          })

          .catch(error => console.log(error))
      })

      .catch(error => {
        console.log(error)
      })
  }, [])

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: distancia,

    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  function ticketQuantity(e) {
    e.preventDefault()
    console.log(quantity)

  }


  return (
    <div>

      <Header />
      <div style={{}}>

      </div>
      <div className="header" style={{ backgroundImage: `url(${exemplo})` }}>
        <div className='blur-event'>
          <div className="header-img" style={{ backgroundImage: `url(${exemplo})` }} >
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <section>
          <div className="row mt-3">

            <div className="col-12">
              <div className="row">
                <div className="col-12 col-sm-6 ">
                  <div className=" d-flex justify-content-start align-items-center">
                    <h1>{eventsData.eventName}</h1>
                  </div>
                </div>

                <div className="col-12 col-sm-6 d-flex align-items-center justify-content-center">

                </div>

                <div className="col-12 col-md-6">
                  <div className="col-12 col-md-12">
                    <p style={{ margin: 0 }}>Início do evento</p>
                    <p>{<FontAwesomeIcon icon={faCalendarCheck} />} {startDate} às {hourStartEvent}</p>
                  </div>
                  <div className="col-12 col-md-12">
                    <p style={{ margin: 0 }}>Término do evento</p>
                    <p>{<FontAwesomeIcon icon={faCalendarXmark} />} {endDate} às {hourEndEvent}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="col-12 col-md-12">
                    <p style={{ margin: 0 }}>Início venda dos ingressos</p>
                    <p>{<FontAwesomeIcon icon={faCalendarCheck} />} {startOfSales} às {hourStartSale}</p>
                  </div>
                  <div className="col-12 col-md-12">
                    <p style={{ margin: 0 }}>Término das vendas dos ingressos</p>
                    <p>{<FontAwesomeIcon icon={faCalendarXmark} />} {endOfSales} às {hourEndSale}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="col-12 col-md-12">
                    <p style={{ marginBottom: 0 }}>{<FontAwesomeIcon icon={faLocationDot} />} <b>{locationName}</b></p>
                    <p style={{ marginBottom: 0 }}>{street}</p>
                    <p style={{ marginBottom: 0 }}>{city}, {state}, {zipCode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex align-items-center justify-content-end">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">Comprar</h5>
                  <p>{eventsData.ticketTitle} - Valor R$ {eventsData.tickePrice}</p>
                  <p>Qtd. de ingresso por pessoa: {eventsData.maxPurchaseQuantity} </p>
                  <form onSubmit={ticketQuantity} className='text-center'>
                    <button type='button' onClick={() => setQuantity(quantity < eventsData.maxPurchaseQuantity ? quantity + 1 : quantity)} className='quantity-btn'>+</button>
                    <input type="text" value={quantity} className='quantity-input' readOnly />
                    <button type='button' onClick={() => setQuantity(quantity > 0 ? quantity - 1 : quantity)} className='quantity-btn'>-</button>
                    {quantity == 0 ?
                      <Link to={'#'} onClick={()=> alert('Quantidade de ingressos não permitida')} className="btn btn-secondary buy-ticket pt-4 pb-4 mt-2"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Comprar
                      </Link>
                      : <Link to={'/verificacao-pagamento/' + id + '/' + quantity + '/' + userName} className="btn btn-success buy-ticket pt-4 pb-4 mt-2"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Comprar
                      </Link>
                    }

                  </form>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className='bg-secondary-subtle p-2'>
                <h2 className='text-center'>Tempo</h2>
              </div>
            </div>

          </div>
        </section>
        <section className='mt-5 mb-5'>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className='text-center'>Percurso</h2>
                <MapContainer
                  center={[-28.677547054209175, -49.37630051653647]}
                  zoom={12}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  >
                  </TileLayer>
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}

                    positions={[
                      positions.map(p => [p.lat, p.lon])
                    ]}
                  />
                </MapContainer>
              </div>
              <div className="col-12 mt-4">
                <h3 className='text-center'>Niveis de elevação</h3>
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: 400 }}>
                  <Line options={options} data={data} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className='text-center'>Descrição</h2>
          <article>
            <p className='mt-3'>
              {eventsData.description}
            </p>
          </article>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Evento