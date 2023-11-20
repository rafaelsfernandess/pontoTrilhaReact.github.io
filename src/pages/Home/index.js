import React, { useEffect, useState } from 'react';

import './styles.css';
import Header from '../../components/Header/Header';
import { Button } from 'react-bootstrap';
import Footer from '../../components/Footer';

function Home() {
    const [ response, setResponse]= useState('')

 

  return (
    <div>
      <Header />
      <div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home