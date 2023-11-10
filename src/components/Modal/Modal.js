import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import T from '../../assets/T.png'

import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ModalTermos = ({ showModal, onClose }) => {
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Termos de serviço</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Conteúdo da Termos de serviço */}
                <p>Aqui está o conteúdo da Termos de serviço.</p>
            </Modal.Body>
        </Modal>
    );
};

export const ModalPoliticaPrivacidade = ({ showModal, onClose }) => {
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Política de Privacidade</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Conteúdo da Política de Privacidade */}
                <p>Aqui está o conteúdo da Política de Privacidade.</p>
            </Modal.Body>
        </Modal>
    );
};



export const ModalAlterarSenha = ({ showModal, onClose }) => {

    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    // Função para lidar com o envio do email de confirmação
    const handleEnviarEmail = () => {
        alert(`Enviando email de confirmação para: ${email}`);
        setEmail('');
        onClose();
    };

    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Alterar Senha</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Digite seu e-mail para enviarmos a confirmação para alteração de senha</p>
                <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        placeholder="exemplo@exemplo"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleEnviarEmail}>
                    Enviar Email
                </button>
            </Modal.Footer>
        </Modal>
    );
};


export const ModalConfirmacaoEmail = ({ showModal, onClose }) => {
    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>

                    <img src={T} alt="Logo ponto trilha" className="img-fluid orange-filter " />
                    Confirme seu email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='text-justify'>Enviamos um e-mail para você com instruções de validação. Por favor, localize-o em sua caixa de entrada e clique no link de validação. Se não encontrar na caixa de entrada, verifique a pasta de spam.</p>
            </Modal.Body>
            <Modal.Footer>
                <Link to="/login" className="btn btn-primary" data-bs-dismiss="modal">Entendido, voltar para tela de login</Link>
            </Modal.Footer>
        </Modal>
    );
};


