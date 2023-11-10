import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ModalTermos, ModalPoliticaPrivacidade, ModalAlterarSenha } from '../../components/Modal/Modal';

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [showPoliticaModal, setShowPoliticaModal] = useState(false);
    const [showAlterarSenhaModal, setShowAlterarSenhaModal] = useState(false);

    const usuarios =
        [{ 'email': 'rafael@rafael', 'senha': 123 },
        { 'email': 'will@will', 'senha': 123 }]

    const handleSubmit = (e) => {
        e.preventDefault()
        const found = usuarios.find((usuario) => usuario.email === email)
        console.log(found.email === email && found.senha === senha)
    }

    function handleShowModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <Container fluid>

            <Row className={"login"}>

                <Col sm="12" md="7" lg="5" className={"header-text"}>
                    <div className={"header-logo"}>
                        <div className={"blur"}>
                            <Row>
                                <Col sm="12">

                                    <div className={"logo"}>
                                        <img src="../logo-preto.png" alt="Logo ponto trilha" className="img-fluid orange-filter " />
                                    </div>

                                    <div>
                                        <h1 className={"title"}>
                                            Bem-vindo ao <span className={"ponto-trilha"}>Ponto Trilha</span>
                                        </h1>
                                    </div>

                                </Col>
                                <Col sm="12" className="d-flex justify-content-center">

                                    <div className={"text-login"}>
                                        <p>Seja bem-vindo ao Ponto Trilha! Descubra
                                            emocionantes aventuras ao ar livre, participe ou crie eventos, faça
                                            parte de uma comunidade apaixonada pela natureza.</p>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>

                <Col sm="12" md="5" lg="7" className="d-flex align-items-center justify-content-center" >
                    <form onSubmit={handleSubmit} className="form-login">

                        <Col >

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">E-mail:</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                    aria-describedby="email" placeholder="exemplo@exemplo" onChange={(text) => { setEmail(text.target.value) }} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha:</label>
                                <input type="password" className="form-control" id="password" aria-describedby="password" onChange={(text) => { setSenha(text.target.value) }} />
                            </div>

                            <div className="mb-5">
                                <Link className="forgot-password" onClick={() => setShowAlterarSenhaModal(true)}>Esqueceu
                                    sua senha?</Link>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </div>
                            <Link to="/inicio">TELA PRINCIPAL</Link>
                        </Col>

                        <Col className="mt-3">

                            <Col className="d-grid mb-3">
                                <Link type="button" to="/cadastro-usuario" className="btn btn-dark" >Cadastrar-se</Link>
                            </Col>

                            <Row className="mt-5 terms">

                                <Col>
                                    <Link onClick={() => handleShowModal()}>Termos de serviço</Link>
                                </Col>

                                <Col className="text-end">
                                    <Link onClick={() => setShowPoliticaModal(true)}>Política de privacidade</Link>
                                </Col>

                            </Row>

                        </Col>
                    </form>
                </Col>
            </Row>

            <ModalTermos showModal={showModal} onClose={handleCloseModal} />
            <ModalPoliticaPrivacidade showModal={showPoliticaModal} onClose={() => setShowPoliticaModal(false)} />
            <ModalAlterarSenha showModal={showAlterarSenhaModal} onClose={() => setShowAlterarSenhaModal(false)} />

        </Container>
    )
}

export default LoginScreen