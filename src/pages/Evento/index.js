import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../service/api'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import exemplo from '../../assets/banner.jpg'
import "leaflet/dist/leaflet.css";
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';

import GpxParser from 'gpxparser';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './styles.css';

function Evento() {
  const { id } = useParams()
  const accessToken = localStorage.getItem('accessToken')
  const [eventsData, setEventsData] = useState({})
  const [hour, setHour] = useState('')
  const [data, setData] = useState('')

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    // 'Content-Type': 'multipart/form-data',
    //'Seu-Outro-Header': 'ValorDoOutroHeader',
  };

  useEffect(() => {
    api.get('/api/event/v1/' + id, { headers })
      .then(response => {
        setEventsData(response.data)

        let dia = response.data.startDate.split('T')
        dia = dia[0].split('-').reverse().join('/')
        setData(dia)

        let hora = response.data.startDate.split('T')
        hora = hora[1]
        setHour(hora)
      })
      .catch(e => {
        console.log(e)
      })


  }, [])




  const OUR_GPX_CONTENT = `
  <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" creator="Oregon 400t" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
  <metadata>
    <link href="http://www.garmin.com">
      <text>Garmin International</text>
    </link>
    <time>2009-10-17T22:58:43Z</time>
  </metadata>
  <trk>
    <name>Example GPX Document</name>
    <trkseg>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.46</ele>
        <time>2009-10-17T18:37:26Z</time>
      </trkpt>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.94</ele>
        <time>2009-10-17T18:37:31Z</time>
      </trkpt>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>6.87</ele>
        <time>2009-10-17T18:37:34Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>`
  var gpx = new GpxParser()
  gpx.parse(OUR_GPX_CONTENT)
  const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon])


  return (
    <div>
      <Header />
      <div className="header" style={{ backgroundImage: `url(${exemplo})` }}>
        <div className='blur-event'>
          <div className="header-img" style={{ backgroundImage: `url(${exemplo})` }} >
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <section>
          <div className="row">

            <div className="col-12">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="info mt-5">
                    <h1>{eventsData.eventName}</h1>
                    <p>{<FontAwesomeIcon icon={faCalendarDays} />} {data} às {hour}</p>
                    <p>{<FontAwesomeIcon icon={faLocationDot} />} {eventsData.city}, {eventsData.state}</p>
                  </div>
                </div>

                <div className="col-12 col-sm-6 d-flex align-items-center justify-content-center">
                  <button className="btn btn-success buy-ticket" type="button">Comprar</button>
                </div>
              </div>
            </div>

            <div className="col-12 ">
              <div className="row ">
                <div className="col-12 col-sm-6 ">
                  <div className="col-12 ">
                    <div className='bg-secondary-subtle p-2'>
                      <h2 className='text-center'>O que esperar</h2>

                    </div>

                    <div>
                      <ul className='text-center list-unstyled'>
                        <li>Aranha</li>
                        <li>Insetos</li>
                        <li>Aclives acentuados</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="col-12 ">
                    <div className='bg-secondary-subtle p-2'>
                      <h2 className='text-center'>Tempo</h2>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>
        </section>
        <section className='mt-5 mb-5'>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className='text-center'>Percurso</h2>
                <MapContainer center={positions[0]} zoom={13}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  >
                  </TileLayer>
                  <Polyline
                    pathOptions={{ fillColor: 'red', color: 'blue' }}
                    positions={positions}
                  />
                </MapContainer>
              </div>
              <div className="col-12 mt-4">
                <h3 className='text-center'>Niveis de elevação</h3>
                <div className="col-12 bg-secondary-subtle p-5">

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