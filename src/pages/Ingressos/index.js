import React from 'react'
import exemplo from '../../assets/banner.jpg'
import './styles.css';
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';

function Ingressos() {

  return (
    <div>
      <Header />

      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="col-12 border-bottom pb-3 mb-5">
            <h1 className="display-6">Meus ingressos</h1>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {[...Array(12)].map((_, i) => (
              <div className="col" key={i}>
                <div className="card" >
                  <img src={exemplo} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{i}</h5>
                  </div>
                  <ul className="list-group list-group-flush ">
                    
                    <li className="list-group-item ">
                      
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item ">
                          {<FontAwesomeIcon icon={faClock} />}<span style={{ marginLeft: 10 }}>sex, 4 nov • 21:00</span>
                        </li>
                        <li className="list-group-item ">
                          {<FontAwesomeIcon icon={faLocationDot} />}<span style={{ marginLeft: 10 }}>Içara, SC</span>
                        </li>
                      </ul>

                    </li>

                    <li className="list-group-item">

                      <ul className="list-group list-group-flush">
                        <li className="list-group-item ">{<FontAwesomeIcon icon={faPrint} />}<span style={{ marginLeft: 10 }}>Imprimir ingresso</span></li>
                      </ul>

                    </li>
                  </ul>
                  <div className="card-body">
                    <a href="#" className="card-link">
                      Card link
                    </a>
                    <a href="#" className="card-link">
                      Another link
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );

}

export default Ingressos