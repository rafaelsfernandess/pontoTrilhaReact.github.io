import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function VerificacaoPagamento() {


  return (
    <div>
      <Header />
      <div className="expand">
        <div className="container">
          <div>
            <h1 className='text-center fs-2 mt-5'>
              Quantidade de ingressos
            </h1>
          </div>
          <div className="row mt-5 mb-5">
            <div className="col-12 tickets-container">
              <ul className='tickets'>
                <div className="row">
                  <div className="col-6 info">
                    <li>Inteira</li>
                    <li>R$ 165,50</li>
                  </div>
                  <div className="col-6 quantity-container">
                    <div>
                      <button className='plus'>
                        {<FontAwesomeIcon icon={faSubtract} />}
                      </button>
                    </div>
                    <div>
                      <p className='quantity'>0</p>
                    </div>
                    <div>
                      <button className='subtract'>
                        {<FontAwesomeIcon icon={faPlus} />}
                      </button>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
          <div className="btn-comprar text-end">

            <button className='btn btn-success'>Comprar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default VerificacaoPagamento