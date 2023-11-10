import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './styles.css'
import T from '../../assets/T.png'
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid >

        <img src={T} alt="" className='logo-img'/>
        <Navbar.Brand href="/inicio" className='col-2 col-lg-4 logo-header'>Ponto Trilha</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <div className="d-flex col-6 col-lg-4">
            <form role="search">
              <div className="input-teste">
                <button className="botao-pesquisa" type="button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <input className="pesquisa" type="search" placeholder="Search" aria-label="Search" />
              </div>
            </form>
          </div>
        <Navbar.Collapse id="navbarScroll">


          

          <Nav className=" navbar-collapse col-lg-4" style={{ maxHeight: '100px' }} navbarScroll>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 order-1 ul-nav bg-white">

              <li className="nav-item ">
                <Nav.Link className="nav-link" href="#action1">Ingressos</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link className="nav-link" href="#action1">Favoritos</Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link className="nav-link" href="/minha-conta">Conta</Nav.Link>
              </li>
            </ul>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar >
  );
}

export default Header