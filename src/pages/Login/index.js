import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import api from '../../service/api';

import { ModalTermos, ModalPoliticaPrivacidade, ModalAlterarSenha } from '../../components/Modal/Modal';

function LoginScreen() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showPoliticaModal, setShowPoliticaModal] = useState(false);
    const [showAlterarSenhaModal, setShowAlterarSenhaModal] = useState(false);

    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();

        const data = {
            userName,
            password,
        };

        try {
            const response = await api.post('auth/signin', data);

            localStorage.setItem('userName', userName);
            localStorage.setItem('accessToken', response.data.token);

            navigate('/inicio');

        } catch (error) {
            alert('Falha no login, tente novamente')
        }
    }

    const usuarios =
        [{ 'userName': 'rafael@rafael', 'password': 123 },
        { 'userName': 'will@will', 'password': 123 }]

    const handleSubmit = (e) => {
        e.preventDefault()
        const found = usuarios.find((usuario) => usuario.userName === userName)
        console.log(found.userName === userName && found.password === password)
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
                    <Col className="form-login">
                        <form onSubmit={login} >
                            <Col >
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">E-mail:</label>
                                    <input
                                        type="userName"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="userName"
                                        value={userName}
                                        placeholder="exemplo@exemplo" onChange={(text) => { setUserName(text.target.value) }} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        aria-describedby="password"
                                        value={password}
                                        onChange={(text) => { setPassword(text.target.value) }} />
                                </div>

                                <div className="mb-5">
                                    <Link className="forgot-password" onClick={() => setShowAlterarSenhaModal(true)}>Esqueceu
                                        sua senha?</Link>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Entrar</button>
                                </div>
                            </Col>
                        </form>
                        <Row className="mt-3">

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
                        </Row>
                    </Col>
                </Col>

            </Row>

            <ModalTermos showModal={showModal} onClose={handleCloseModal} />
            <ModalPoliticaPrivacidade showModal={showPoliticaModal} onClose={() => setShowPoliticaModal(false)} />
            <ModalAlterarSenha showModal={showAlterarSenhaModal} onClose={() => setShowAlterarSenhaModal(false)} />

        </Container>
    )
}

export default LoginScreen