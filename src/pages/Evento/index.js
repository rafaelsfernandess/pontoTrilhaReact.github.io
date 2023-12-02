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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,

);
function Evento() {

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
  }

  const { id } = useParams()
  const accessToken = localStorage.getItem('accessToken')
  const [eventsData, setEventsData] = useState({})
  const [hourStartEvent, setHourStartEvent] = useState('')
  const [hourEndEvent, setHourEndEvent] = useState('')
  const [hourStartSale, setHourStartSale] = useState('')
  const [hourEndSale, setHourEndSale] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startOfSales, setStartOfSales] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endOfSales, setEndOfSales] = useState('')

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    // 'Content-Type': 'multipart/form-data',
    //'Seu-Outro-Header': 'ValorDoOutroHeader',
  };

  useEffect(() => {
    api.get('/api/event/v1/' + id, { headers })
      .then(response => {
        console.log(response)
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
      })
      .catch(e => {
        console.log(e)
      })


  }, [])



  const OUR_GPX_CONTENT = `
  <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.topografix.com/GPX/gpx_style/0/2 http://www.topografix.com/GPX/gpx_style/0/2/gpx_style.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3" xmlns:gpx_style="http://www.topografix.com/GPX/gpx_style/0/2" version="1.1" creator="https://gpx.studio">
<metadata>
    <name>new</name>
    <author>
        <name>gpx.studio</name>
        <link href="https://gpx.studio"></link>
    </author>
</metadata>
<trk>
    <name>new</name>
    <type>Running</type>
    <trkseg>
    <trkpt lat="-28.681121177988523" lon="-49.37969923840038">
        <ele>39.6</ele>
    </trkpt>
    <trkpt lat="-28.680821675091128" lon="-49.37997234997873">
        <ele>37.8</ele>
    </trkpt>
    <trkpt lat="-28.68052217133727" lon="-49.38024546155708">
        <ele>37.2</ele>
    </trkpt>
    <trkpt lat="-28.680342468673853" lon="-49.380700647521">
        <ele>38.8</ele>
    </trkpt>
    <trkpt lat="-28.68016276570213" lon="-49.381155833484925">
        <ele>40.2</ele>
    </trkpt>
    <trkpt lat="-28.67953713072862" lon="-49.38213448330735">
        <ele>43.6</ele>
    </trkpt>
    <trkpt lat="-28.6789114920181" lon="-49.38311313312977">
        <ele>48.3</ele>
    </trkpt>
    <trkpt lat="-28.678405653732813" lon="-49.38362142412281">
        <ele>50.7</ele>
    </trkpt>
    <trkpt lat="-28.677899813004746" lon="-49.384129715115854">
        <ele>58.3</ele>
    </trkpt>
    <trkpt lat="-28.677786664086533" lon="-49.38425868447228">
        <ele>60.4</ele>
    </trkpt>
    <trkpt lat="-28.67767351504608" lon="-49.38438765382872">
        <ele>61.7</ele>
    </trkpt>
    <trkpt lat="-28.67761361256342" lon="-49.38482008049446">
        <ele>64.8</ele>
    </trkpt>
    <trkpt lat="-28.67755371004648" lon="-49.38525250716018">
        <ele>66.5</ele>
    </trkpt>
    <trkpt lat="-28.677480495812645" lon="-49.385616655931315">
        <ele>68.9</ele>
    </trkpt>
    <trkpt lat="-28.67740728152761" lon="-49.38598080470244">
        <ele>72.8</ele>
    </trkpt>
    <trkpt lat="-28.6773606905923" lon="-49.3860870147607">
        <ele>73.9</ele>
    </trkpt>
    <trkpt lat="-28.67731409963627" lon="-49.38619322481896">
        <ele>75.2</ele>
    </trkpt>
    <trkpt lat="-28.67701458585275" lon="-49.38621598411714">
        <ele>74.0</ele>
    </trkpt>
    <trkpt lat="-28.676715071212833" lon="-49.38623874341534">
        <ele>75.3</ele>
    </trkpt>
    <trkpt lat="-28.67642221162576" lon="-49.38624632984808">
        <ele>78.8</ele>
    </trkpt>
    <trkpt lat="-28.676129351219974" lon="-49.38625391628081">
        <ele>80.8</ele>
    </trkpt>
    <trkpt lat="-28.675636811418357" lon="-49.38642840423365">
        <ele>81.9</ele>
    </trkpt>
    <trkpt lat="-28.675144269300983" lon="-49.386602892186474">
        <ele>81.8</ele>
    </trkpt>
    <trkpt lat="-28.674964557411272" lon="-49.386800139437504">
        <ele>85.1</ele>
    </trkpt>
    <trkpt lat="-28.674784845213292" lon="-49.38699738668852">
        <ele>90.6</ele>
    </trkpt>
    <trkpt lat="-28.67457850860579" lon="-49.387209806805025">
        <ele>95.4</ele>
    </trkpt>
    <trkpt lat="-28.6743721715919" lon="-49.387422226921515">
        <ele>96.4</ele>
    </trkpt>
    <trkpt lat="-28.673659972970224" lon="-49.38820362949292">
        <ele>110.1</ele>
    </trkpt>
    <trkpt lat="-28.67294776950706" lon="-49.38898503206432">
        <ele>116.0</ele>
    </trkpt>
    <trkpt lat="-28.672854583649034" lon="-49.38832501241663">
        <ele>115.7</ele>
    </trkpt>
    <trkpt lat="-28.672761397708133" lon="-49.38766499276893">
        <ele>116.2</ele>
    </trkpt>
    <trkpt lat="-28.672761397708133" lon="-49.387187047506835">
        <ele>111.3</ele>
    </trkpt>
    <trkpt lat="-28.672761397708133" lon="-49.38670910224473">
        <ele>107.4</ele>
    </trkpt>
    <trkpt lat="-28.672761397708133" lon="-49.386367712771786">
        <ele>107.3</ele>
    </trkpt>
    <trkpt lat="-28.672761397708133" lon="-49.38602632329884">
        <ele>107.8</ele>
    </trkpt>
    <trkpt lat="-28.673047611405835" lon="-49.385495273007606">
        <ele>101.5</ele>
    </trkpt>
    <trkpt lat="-28.673333824321666" lon="-49.38496422271636">
        <ele>95.8</ele>
    </trkpt>
    <trkpt lat="-28.674175965541817" lon="-49.38413198142637">
        <ele>84.6</ele>
    </trkpt>
    <trkpt lat="-28.675018099992574" lon="-49.38329974013637">
        <ele>74.5</ele>
    </trkpt>
    <trkpt lat="-28.675860227673788" lon="-49.382467498846374">
        <ele>71.3</ele>
    </trkpt>
    <trkpt lat="-28.67670234858537" lon="-49.38163525755637">
        <ele>69.1</ele>
    </trkpt>
    <trkpt lat="-28.677544462727138" lon="-49.38080301626638">
        <ele>56.8</ele>
    </trkpt>
    <trkpt lat="-28.677939747887883" lon="-49.38041236307719">
        <ele>57.7</ele>
    </trkpt>
    <trkpt lat="-28.67843227686136" lon="-49.38007856003699">
        <ele>54.2</ele>
    </trkpt>
    <trkpt lat="-28.678924803518914" lon="-49.37974475699677">
        <ele>48.2</ele>
    </trkpt>
    <trkpt lat="-28.679430639297095" lon="-49.37913025594548">
        <ele>41.8</ele>
    </trkpt>
    <trkpt lat="-28.67993647263245" lon="-49.3785157548942">
        <ele>38.8</ele>
    </trkpt>
    <trkpt lat="-28.68010286464302" lon="-49.37840195840322">
        <ele>39.6</ele>
    </trkpt>
    <trkpt lat="-28.680269256389263" lon="-49.378288161912245">
        <ele>40.4</ele>
    </trkpt>
    <trkpt lat="-28.68040902525181" lon="-49.37848540916328">
        <ele>40.4</ele>
    </trkpt>
    <trkpt lat="-28.680548793927848" lon="-49.37868265641431">
        <ele>40.7</ele>
    </trkpt>
    <trkpt lat="-28.68078839693854" lon="-49.37904680518544">
        <ele>41.5</ele>
    </trkpt>
    <trkpt lat="-28.681027999401106" lon="-49.379410953956565">
        <ele>40.7</ele>
    </trkpt>
    <trkpt lat="-28.681074458566886" lon="-49.37953769496964">
        <ele>40.1</ele>
    </trkpt>
    <trkpt lat="-28.681120917712054" lon="-49.37966443598271">
        <ele>39.7</ele>
    </trkpt>
    </trkseg>
</trk>
</gpx>
`


  var gpx = new GpxParser()
  gpx.parse(OUR_GPX_CONTENT)
  const positions = gpx.tracks[0].points.map(p => [p.lat, p.lon])

  const valores = gpx.tracks[0].distance.cumul;
  const distancia = valores.map(numero => Math.round(numero));

  const [userData, setUserData] = useState({
    labels: distancia,

    datasets: [{
      label: [],
      data: gpx.tracks[0].points.map(p => p.ele),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      title: {
        display: true,
        text: 'Custom Chart Title',
        padding: {
          top: 10,
          bottom: 30
        }
      }
    },]
  })




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
                  <Link to={'verificacao-pagamento'} className="btn btn-success buy-ticket pt-4 pb-4" type="button"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Comprar
                  </Link>
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

              </div>
            </div>



            <div className="col-12 ">
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
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: 400 }}>
                  <Line options={options} data={userData} />

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